/**
 * Heu Admin API – Cloudflare Worker
 * JWT-authenticated admin backend
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

const FIREBASE_PROJECT_ID = "theheuheu-auth";
const FIREBASE_ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const FIREBASE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

let cachedCerts = null;
let certsFetchedAt = 0;
let certsExpiresAt = 0;

// Base64url helpers keep JWT parsing reliable across all Firebase tokens.
const base64UrlToString = (input) => {
  let normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4;
  if (padding) {
    normalized += "=".repeat(4 - padding);
  }
  return atob(normalized);
};

const base64UrlToBytes = (input) => {
  const binary = base64UrlToString(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

// ─────────────────────────────
// Firebase cert handling
// ─────────────────────────────
async function getFirebaseCerts() {
  const ONE_HOUR = 60 * 60 * 1000;

  if (cachedCerts && Date.now() < certsExpiresAt) {
    return cachedCerts;
  }

  let res;
  // Fetch certs with graceful degradation and honor Google's cache hints.
  try {
    res = await fetch(FIREBASE_CERTS_URL);
  } catch (error) {
    if (cachedCerts) {
      return cachedCerts;
    }
    throw error;
  }

  if (!res.ok) {
    if (cachedCerts) {
      return cachedCerts;
    }
    throw new Error("Unable to fetch Firebase certs");
  }

  cachedCerts = await res.json();
  certsFetchedAt = Date.now();

  const cacheControl = res.headers.get("Cache-Control") || "";
  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
  const maxAgeMs = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) * 1000 : ONE_HOUR;
  certsExpiresAt = certsFetchedAt + maxAgeMs;

  return cachedCerts;
}

function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----.*-----/g, "").replace(/\s/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function verifyFirebaseJWT(token) {
  const [headerB64, payloadB64, signatureB64] = token.split(".");
  if (!signatureB64) throw new Error("Invalid JWT format");

  const header = JSON.parse(base64UrlToString(headerB64));
  if (header.alg !== "RS256") throw new Error("Unsupported algorithm");
  const payload = JSON.parse(base64UrlToString(payloadB64));

  const certs = await getFirebaseCerts();
  const cert = certs[header.kid];
  if (!cert) throw new Error("Invalid token key ID");

  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64UrlToBytes(signatureB64);

  const key = await crypto.subtle.importKey(
    "spki",
    pemToArrayBuffer(cert),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    signature,
    data
  );

  if (!valid) throw new Error("Invalid signature");
  if (payload.iss !== FIREBASE_ISSUER) throw new Error("Invalid issuer");
  if (payload.aud !== FIREBASE_PROJECT_ID) throw new Error("Invalid audience");
  // Enforce temporal validity to prevent replaying old Firebase tokens.
  if (!payload.exp || payload.exp * 1000 <= Date.now()) throw new Error("Token expired");

  return payload;
}

// ─────────────────────────────
// Worker entry
// ─────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ✅ CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // ✅ Public health check
    if (request.method === "GET" && url.pathname === "/") {
      return new Response("Heu Admin API is alive", {
        headers: corsHeaders,
      });
    }

    // 🔐 Auth required beyond this point
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    let user;
    try {
      const token = authHeader.replace("Bearer ", "");
      user = await verifyFirebaseJWT(token);
    } catch (err) {
      return new Response("Invalid token", {
        status: 401,
        headers: corsHeaders,
      });
    }

    // 🔒 Admin allowlist
    const ALLOWED_ADMINS = ["admin@theheuheu.com"];
    if (!ALLOWED_ADMINS.includes(user.email)) {
      return new Response("Forbidden", {
        status: 403,
        headers: corsHeaders,
      });
    }

    // 🧪 Moderation endpoint
    if (request.method === "POST" && url.pathname === "/moderate") {
      const jokeId = crypto.randomUUID();

      await env.DB.prepare(
        "INSERT INTO jokes (id, text) VALUES (?, ?)"
      )
        .bind(jokeId, "Approved joke")
        .run();

      return new Response(
        JSON.stringify({ success: true, jokeId }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
};
