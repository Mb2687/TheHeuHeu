import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔑 Your Firebase config (public by design)
const firebaseConfig = {
  apiKey: "AIzaSyA1s1YIsgKVxL-SErjj4AobZ-klsM2w288",
  authDomain: "theheuheu-auth.firebaseapp.com",
  projectId: "theheuheu-auth",
  storageBucket: "theheuheu-auth.firebasestorage.app",
  messagingSenderId: "1020567073458",
  appId: "1:1020567073458:web:bac83e7eb10ee969334fab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Admin login
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Surface auth errors so admins know why login failed.
    await signInWithEmailAndPassword(auth, email, password);
    alert("Admin authenticated");
  } catch (error) {
    alert(error.message || "Failed to authenticate");
  }
};

// 🧠 Send moderation action
window.sendModeration = async (jokeId, action) => {
  try {
    // Guard against null user before attempting any admin action.
    if (!auth.currentUser) {
      alert("Please log in again before performing admin actions.");
      return;
    }

    // Force-refresh the JWT to avoid stale or revoked tokens.
    const token = await auth.currentUser.getIdToken(true);

    const res = await fetch(
      "https://heu-admin-api.michael-bonafede87.workers.dev/moderate",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ jokeId, action })
      }
    );

    if (!res.ok) {
      // Bubble up Worker responses so admins know why the call failed.
      if (res.status === 401) alert("Not authenticated");
      else if (res.status === 403) alert("Not authorized");
      else {
        const errorBody = await res.text();
        throw new Error(errorBody || `Server error ${res.status}`);
      }
      return;
    }

    const data = await res.json();
    alert("Action recorded");

  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to submit moderation");
  }
};


onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("authStatus");

  if (user) {
    status.textContent = `Logged in as ${user.email}`;
    document.body.classList.add("authenticated");
  } else {
    status.textContent = "Not logged in";
    document.body.classList.remove("authenticated");
  }
});
