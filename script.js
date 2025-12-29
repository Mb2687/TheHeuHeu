(() => {
  const setStatus = (element, message) => {
    if (element) {
      element.textContent = message;
    }
  };

  const initImageToPdf = () => {
    const fileInput = document.querySelector("#image-input");
    const convertButton = document.querySelector("#convert-button");
    const downloadButton = document.querySelector("#download-button");
    const statusText = document.querySelector("#status-text");

    if (!fileInput || !convertButton || !downloadButton || !statusText) {
      return;
    }

    const resetDownload = () => {
      downloadButton.classList.add("secondary");
      downloadButton.style.display = "none";
      downloadButton.removeAttribute("href");
    };

    resetDownload();
    setStatus(statusText, "Select one or more images to begin.");

    fileInput.addEventListener("change", () => {
      resetDownload();
      if (fileInput.files.length > 0) {
        setStatus(statusText, `${fileInput.files.length} image(s) ready.`);
      } else {
        setStatus(statusText, "Select one or more images to begin.");
      }
    });

    // Load an image file into an Image object for sizing and PDF placement.
    const loadImage = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load image."));
        img.src = reader.result;
      };

      reader.onerror = () => reject(new Error("Unable to read file."));
      reader.readAsDataURL(file);
    });

    // Fit the image to the page while preserving aspect ratio.
    const addImageToPdf = (pdf, img, isFirstPage) => {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      if (!isFirstPage) {
        pdf.addPage();
      }

      const format = img.src.includes("image/png") ? "PNG" : "JPEG";
      pdf.addImage(img, format, x, y, width, height);
    };

    convertButton.addEventListener("click", async () => {
      const files = Array.from(fileInput.files || []);

      if (files.length === 0) {
        setStatus(statusText, "Please select at least one image.");
        return;
      }

      convertButton.disabled = true;
      fileInput.disabled = true;
      setStatus(statusText, "Converting...");

      try {
        const { jsPDF } = window.jspdf || {};
        if (!jsPDF) {
          throw new Error("PDF library failed to load.");
        }

        // Build a single PDF with each image on its own page.
        const pdf = new jsPDF({ unit: "pt", format: "a4" });

        for (let i = 0; i < files.length; i += 1) {
          const img = await loadImage(files[i]);
          addImageToPdf(pdf, img, i === 0);
        }

        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);
        downloadButton.href = url;
        downloadButton.download = "images.pdf";
        downloadButton.style.display = "inline-block";

        setStatus(statusText, "Done. Your PDF is downloading.");

        downloadButton.click();
      } catch (error) {
        setStatus(statusText, error.message || "Conversion failed. Please try again.");
      } finally {
        convertButton.disabled = false;
        fileInput.disabled = false;
      }
    });
  };

  const initPdfToImages = () => {
    const fileInput = document.querySelector("#pdf-input");
    const convertButton = document.querySelector("#pdf-convert-button");
    const statusText = document.querySelector("#pdf-status");
    const output = document.querySelector("#pdf-output");

    if (!fileInput || !convertButton || !statusText || !output) {
      return;
    }

    setStatus(statusText, "Select a PDF to begin.");

    convertButton.addEventListener("click", async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) {
        setStatus(statusText, "Please select a PDF file.");
        return;
      }

      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) {
        setStatus(statusText, "PDF library failed to load.");
        return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      convertButton.disabled = true;
      fileInput.disabled = true;
      output.innerHTML = "";
      setStatus(statusText, "Converting...");

      try {
        const data = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data }).promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          const dataUrl = canvas.toDataURL("image/png");
          const item = document.createElement("div");
          item.className = "output-item";
          item.innerHTML = `
            <span>Page ${pageNum}</span>
            <a class="button-link secondary" download="page-${pageNum}.png" href="${dataUrl}">Download PNG</a>
          `;
          output.appendChild(item);
        }

        setStatus(statusText, "Done. Download your images below.");
      } catch (error) {
        setStatus(statusText, error.message || "Conversion failed. Please try again.");
      } finally {
        convertButton.disabled = false;
        fileInput.disabled = false;
      }
    });
  };

  const initImageCompressor = () => {
    const fileInput = document.querySelector("#compress-input");
    const compressButton = document.querySelector("#compress-button");
    const statusText = document.querySelector("#compress-status");
    const output = document.querySelector("#compress-output");
    const qualityInput = document.querySelector("#compress-quality");
    const qualityValue = document.querySelector("#compress-quality-value");

    if (!fileInput || !compressButton || !statusText || !output || !qualityInput || !qualityValue) {
      return;
    }

    const updateQualityLabel = () => {
      qualityValue.textContent = `${qualityInput.value}%`;
    };

    updateQualityLabel();
    setStatus(statusText, "Select one or more images to begin.");

    qualityInput.addEventListener("input", updateQualityLabel);

    const loadImage = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load image."));
        img.src = reader.result;
      };

      reader.onerror = () => reject(new Error("Unable to read file."));
      reader.readAsDataURL(file);
    });

    compressButton.addEventListener("click", async () => {
      const files = Array.from(fileInput.files || []);
      if (files.length === 0) {
        setStatus(statusText, "Please select at least one image.");
        return;
      }

      const quality = Number(qualityInput.value) / 100;
      compressButton.disabled = true;
      fileInput.disabled = true;
      output.innerHTML = "";
      setStatus(statusText, "Compressing...");

      try {
        for (let i = 0; i < files.length; i += 1) {
          const file = files[i];
          const img = await loadImage(file);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);

          const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
          if (!blob) {
            throw new Error("Unable to compress image.");
          }

          const url = URL.createObjectURL(blob);
          const item = document.createElement("div");
          item.className = "output-item";
          item.innerHTML = `
            <span>${file.name}</span>
            <a class="button-link secondary" download="compressed-${file.name.replace(/\\s+/g, "-")}" href="${url}">Download JPG</a>
          `;
          output.appendChild(item);
        }

        setStatus(statusText, "Done. Download your compressed images below.");
      } catch (error) {
        setStatus(statusText, error.message || "Compression failed. Please try again.");
      } finally {
        compressButton.disabled = false;
        fileInput.disabled = false;
      }
    });
  };

  const initPdfSplitter = () => {
    const fileInput = document.querySelector("#split-input");
    const splitButton = document.querySelector("#split-button");
    const statusText = document.querySelector("#split-status");
    const output = document.querySelector("#split-output");

    if (!fileInput || !splitButton || !statusText || !output) {
      return;
    }

    setStatus(statusText, "Select a PDF to begin.");

    splitButton.addEventListener("click", async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) {
        setStatus(statusText, "Please select a PDF file.");
        return;
      }

      const pdfLib = window.PDFLib;
      if (!pdfLib) {
        setStatus(statusText, "PDF library failed to load.");
        return;
      }

      splitButton.disabled = true;
      fileInput.disabled = true;
      output.innerHTML = "";
      setStatus(statusText, "Splitting...");

      try {
        const data = await file.arrayBuffer();
        const sourcePdf = await pdfLib.PDFDocument.load(data);
        const totalPages = sourcePdf.getPageCount();

        for (let i = 0; i < totalPages; i += 1) {
          const newPdf = await pdfLib.PDFDocument.create();
          const [page] = await newPdf.copyPages(sourcePdf, [i]);
          newPdf.addPage(page);
          const bytes = await newPdf.save();
          const blob = new Blob([bytes], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const item = document.createElement("div");
          item.className = "output-item";
          item.innerHTML = `
            <span>Page ${i + 1}</span>
            <a class="button-link secondary" download="page-${i + 1}.pdf" href="${url}">Download PDF</a>
          `;
          output.appendChild(item);
        }

        setStatus(statusText, "Done. Download your pages below.");
      } catch (error) {
        setStatus(statusText, error.message || "Split failed. Please try again.");
      } finally {
        splitButton.disabled = false;
        fileInput.disabled = false;
      }
    });
  };

  const initHeicConverter = () => {
    const fileInput = document.querySelector("#heic-input");
    const convertButton = document.querySelector("#heic-button");
    const statusText = document.querySelector("#heic-status");
    const output = document.querySelector("#heic-output");
    const formatSelect = document.querySelector("#heic-format");

    if (!fileInput || !convertButton || !statusText || !output || !formatSelect) {
      return;
    }

    setStatus(statusText, "Select one or more HEIC files to begin.");

    convertButton.addEventListener("click", async () => {
      const files = Array.from(fileInput.files || []);
      if (files.length === 0) {
        setStatus(statusText, "Please select at least one HEIC file.");
        return;
      }

      if (!window.heic2any) {
        setStatus(statusText, "HEIC library failed to load.");
        return;
      }

      convertButton.disabled = true;
      fileInput.disabled = true;
      output.innerHTML = "";
      setStatus(statusText, "Converting...");

      try {
        const mimeType = formatSelect.value;
        const extensionMap = {
          "image/png": "png",
          "image/webp": "webp",
          "image/jpeg": "jpg",
        };
        const extension = extensionMap[mimeType] || "jpg";

        for (let i = 0; i < files.length; i += 1) {
          const file = files[i];
          const converted = await window.heic2any({
            blob: file,
            toType: mimeType,
            quality: 0.9,
          });

          const blob = Array.isArray(converted) ? converted[0] : converted;
          const url = URL.createObjectURL(blob);
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const item = document.createElement("div");
          item.className = "output-item";
          item.innerHTML = `
            <span>${file.name}</span>
            <a class="button-link secondary" download="${baseName}.${extension}" href="${url}">Download ${extension.toUpperCase()}</a>
          `;
          output.appendChild(item);
        }

        setStatus(statusText, "Done. Download your converted files below.");
      } catch (error) {
        setStatus(statusText, error.message || "Conversion failed. Please try again.");
      } finally {
        convertButton.disabled = false;
        fileInput.disabled = false;
      }
    });
  };

  initImageToPdf();
  initPdfToImages();
  initImageCompressor();
  initPdfSplitter();
  initHeicConverter();
  const initUtf8Tool = () => {
    const list = document.querySelector("#utf-list");
    const statusText = document.querySelector("#utf-status");
    const selectedLabel = document.querySelector("#utf-selected");
    const selectedCode = document.querySelector("#utf-selected-code");
    const copyButton = document.querySelector("#utf-copy-button");
    const scopeSelect = document.querySelector("#utf-scope");

    if (!list || !statusText || !selectedLabel || !selectedCode || !copyButton || !scopeSelect) {
      return;
    }

    const normalizeItems = (items) => items.map((item) => {
      const hex = item.hex || item.char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
      return {
        ...item,
        hex,
        keywords: item.keywords || [],
      };
    });

    const makeSimpleList = (chars, label, keyword) => normalizeItems(
      chars.map((char) => ({
        char,
        name: `${label} symbol`,
        keywords: keyword ? [keyword] : [],
      })),
    );

    const mathCharacters = normalizeItems([
      { char: "+", name: "Plus", keywords: ["add"] },
      { char: "−", name: "Minus", keywords: ["subtract"] },
      { char: "±", name: "Plus-Minus", keywords: ["plus minus"] },
      { char: "∓", name: "Minus-Plus", keywords: ["minus plus"] },
      { char: "×", name: "Multiplication", keywords: ["multiply"] },
      { char: "÷", name: "Division", keywords: ["divide"] },
      { char: "=", name: "Equals", keywords: ["equal"] },
      { char: "≠", name: "Not Equal", keywords: ["not equal"] },
      { char: "≈", name: "Approximately Equal", keywords: ["approx"] },
      { char: "≃", name: "Asymptotically Equal", keywords: ["approx"] },
      { char: "≅", name: "Congruent To", keywords: ["equal"] },
      { char: "≤", name: "Less Than or Equal", keywords: ["inequality"] },
      { char: "≥", name: "Greater Than or Equal", keywords: ["inequality"] },
      { char: "<", name: "Less Than", keywords: ["inequality"] },
      { char: ">", name: "Greater Than", keywords: ["inequality"] },
      { char: "≪", name: "Much Less Than", keywords: ["inequality"] },
      { char: "≫", name: "Much Greater Than", keywords: ["inequality"] },
      { char: "≡", name: "Identical To", keywords: ["equal"] },
      { char: "≜", name: "Equal To By Definition", keywords: ["equal"] },
      { char: "≝", name: "Equal To By Definition", keywords: ["equal"] },
      { char: "≔", name: "Colon Equals", keywords: ["equal"] },
      { char: "∝", name: "Proportional To", keywords: ["ratio"] },
      { char: "∞", name: "Infinity", keywords: ["limit"] },
      { char: "√", name: "Square Root", keywords: ["root"] },
      { char: "∛", name: "Cube Root", keywords: ["root"] },
      { char: "∜", name: "Fourth Root", keywords: ["root"] },
      { char: "∫", name: "Integral", keywords: ["integral"] },
      { char: "∮", name: "Contour Integral", keywords: ["integral"] },
      { char: "∑", name: "Summation", keywords: ["sum"] },
      { char: "∏", name: "Product", keywords: ["product"] },
      { char: "∂", name: "Partial Derivative", keywords: ["derivative"] },
      { char: "∇", name: "Nabla", keywords: ["gradient"] },
      { char: "Δ", name: "Delta", keywords: ["change"] },
      { char: "∈", name: "Element Of", keywords: ["set"] },
      { char: "∉", name: "Not Element Of", keywords: ["set"] },
      { char: "∋", name: "Contains As Member", keywords: ["set"] },
      { char: "∅", name: "Empty Set", keywords: ["set"] },
      { char: "∧", name: "Logical And", keywords: ["logic"] },
      { char: "∨", name: "Logical Or", keywords: ["logic"] },
      { char: "¬", name: "Not", keywords: ["logic"] },
      { char: "⇒", name: "Implies", keywords: ["logic"] },
      { char: "⇔", name: "If and Only If", keywords: ["logic"] },
      { char: "∀", name: "For All", keywords: ["logic"] },
      { char: "∃", name: "There Exists", keywords: ["logic"] },
      { char: "∄", name: "Does Not Exist", keywords: ["logic"] },
      { char: "∠", name: "Angle", keywords: ["geometry"] },
      { char: "∟", name: "Right Angle", keywords: ["geometry"] },
      { char: "⊥", name: "Perpendicular", keywords: ["geometry"] },
      { char: "∥", name: "Parallel", keywords: ["geometry"] },
      { char: "∪", name: "Union", keywords: ["set"] },
      { char: "∩", name: "Intersection", keywords: ["set"] },
      { char: "⊂", name: "Proper Subset", keywords: ["set"] },
      { char: "⊆", name: "Subset", keywords: ["set"] },
      { char: "⊃", name: "Proper Superset", keywords: ["set"] },
      { char: "⊇", name: "Superset", keywords: ["set"] },
      { char: "⊄", name: "Not Subset", keywords: ["set"] },
      { char: "⊅", name: "Not Superset", keywords: ["set"] },
      { char: "∴", name: "Therefore", keywords: ["logic"] },
      { char: "∵", name: "Because", keywords: ["logic"] },
      { char: "∶", name: "Ratio", keywords: ["ratio"] },
      { char: "∷", name: "Proportion", keywords: ["ratio"] },
      { char: "⊕", name: "Direct Sum", keywords: ["sum"] },
      { char: "⊗", name: "Tensor Product", keywords: ["product"] },
      { char: "⊙", name: "Circled Dot", keywords: ["product"] },
      { char: "⊘", name: "Circled Slash", keywords: ["division"] },
      { char: "⊖", name: "Circled Minus", keywords: ["subtract"] },
      { char: "⊞", name: "Squared Plus", keywords: ["add"] },
      { char: "⊟", name: "Squared Minus", keywords: ["subtract"] },
      { char: "⊠", name: "Squared Times", keywords: ["multiply"] },
      { char: "⊡", name: "Squared Dot", keywords: ["product"] },
      { char: "⊢", name: "Right Tack", keywords: ["logic"] },
      { char: "⊣", name: "Left Tack", keywords: ["logic"] },
      { char: "⊨", name: "Models", keywords: ["logic"] },
      { char: "⊩", name: "Forces", keywords: ["logic"] },
    ]);

    const currencyCharacters = normalizeItems([
      { char: "$", name: "Dollar", keywords: ["currency"] },
      { char: "¢", name: "Cent", keywords: ["currency"] },
      { char: "£", name: "Pound", keywords: ["currency"] },
      { char: "¥", name: "Yen/Yuan", keywords: ["currency"] },
      { char: "¤", name: "Currency Sign", keywords: ["currency"] },
      { char: "€", name: "Euro", keywords: ["currency"] },
      { char: "₠", name: "Euro-Currency", keywords: ["currency"] },
      { char: "₡", name: "Colon", keywords: ["currency"] },
      { char: "₢", name: "Cruzeiro", keywords: ["currency"] },
      { char: "₣", name: "Franc", keywords: ["currency"] },
      { char: "₤", name: "Lira", keywords: ["currency"] },
      { char: "₥", name: "Mill", keywords: ["currency"] },
      { char: "₦", name: "Naira", keywords: ["currency"] },
      { char: "₧", name: "Peseta", keywords: ["currency"] },
      { char: "₨", name: "Rupee", keywords: ["currency"] },
      { char: "₩", name: "Won", keywords: ["currency"] },
      { char: "₪", name: "Sheqel", keywords: ["currency"] },
      { char: "₫", name: "Dong", keywords: ["currency"] },
      { char: "₭", name: "Kip", keywords: ["currency"] },
      { char: "₮", name: "Tugrik", keywords: ["currency"] },
      { char: "₯", name: "Drachma", keywords: ["currency"] },
      { char: "₰", name: "German Penny", keywords: ["currency"] },
      { char: "₱", name: "Peso", keywords: ["currency"] },
      { char: "₲", name: "Guarani", keywords: ["currency"] },
      { char: "₳", name: "Austral", keywords: ["currency"] },
      { char: "₴", name: "Hryvnia", keywords: ["currency"] },
      { char: "₵", name: "Cedi", keywords: ["currency"] },
      { char: "₶", name: "Livre Tournois", keywords: ["currency"] },
      { char: "₷", name: "Spesmilo", keywords: ["currency"] },
      { char: "₸", name: "Tenge", keywords: ["currency"] },
      { char: "₹", name: "Indian Rupee", keywords: ["currency"] },
      { char: "₺", name: "Turkish Lira", keywords: ["currency"] },
      { char: "₻", name: "Nordic Mark", keywords: ["currency"] },
      { char: "₼", name: "Manat", keywords: ["currency"] },
      { char: "₽", name: "Ruble", keywords: ["currency"] },
      { char: "₾", name: "Lari", keywords: ["currency"] },
      { char: "₿", name: "Bitcoin", keywords: ["currency"] },
      { char: "฿", name: "Baht", keywords: ["currency"] },
      { char: "৳", name: "Taka", keywords: ["currency"] },
      { char: "৲", name: "Bengali Rupee", keywords: ["currency"] },
      { char: "៛", name: "Riel", keywords: ["currency"] },
      { char: "₨", name: "Rupee Sign", keywords: ["currency"] },
      { char: "₦", name: "Naira Sign", keywords: ["currency"] },
      { char: "₵", name: "Ghana Cedi", keywords: ["currency"] },
      { char: "₧", name: "Peseta Sign", keywords: ["currency"] },
      { char: "₡", name: "Colon Sign", keywords: ["currency"] },
      { char: "₤", name: "Lira Sign", keywords: ["currency"] },
      { char: "₭", name: "Kip Sign", keywords: ["currency"] },
      { char: "₮", name: "Tugrik Sign", keywords: ["currency"] },
      { char: "₰", name: "Pfennig", keywords: ["currency"] },
      { char: "₯", name: "Drachma Sign", keywords: ["currency"] },
    ]);

    const languageCharacters = normalizeItems([
      { char: "á", name: "a with acute", keywords: ["latin"] },
      { char: "à", name: "a with grave", keywords: ["latin"] },
      { char: "â", name: "a with circumflex", keywords: ["latin"] },
      { char: "ä", name: "a with diaeresis", keywords: ["latin"] },
      { char: "ã", name: "a with tilde", keywords: ["latin"] },
      { char: "å", name: "a with ring", keywords: ["latin"] },
      { char: "ā", name: "a with macron", keywords: ["latin"] },
      { char: "ă", name: "a with breve", keywords: ["latin"] },
      { char: "ą", name: "a with ogonek", keywords: ["latin"] },
      { char: "æ", name: "ae ligature", keywords: ["latin"] },
      { char: "ç", name: "c with cedilla", keywords: ["latin"] },
      { char: "ć", name: "c with acute", keywords: ["latin"] },
      { char: "č", name: "c with caron", keywords: ["latin"] },
      { char: "ď", name: "d with caron", keywords: ["latin"] },
      { char: "đ", name: "d with stroke", keywords: ["latin"] },
      { char: "é", name: "e with acute", keywords: ["latin"] },
      { char: "è", name: "e with grave", keywords: ["latin"] },
      { char: "ê", name: "e with circumflex", keywords: ["latin"] },
      { char: "ë", name: "e with diaeresis", keywords: ["latin"] },
      { char: "ē", name: "e with macron", keywords: ["latin"] },
      { char: "ė", name: "e with dot", keywords: ["latin"] },
      { char: "ę", name: "e with ogonek", keywords: ["latin"] },
      { char: "ě", name: "e with caron", keywords: ["latin"] },
      { char: "í", name: "i with acute", keywords: ["latin"] },
      { char: "ì", name: "i with grave", keywords: ["latin"] },
      { char: "î", name: "i with circumflex", keywords: ["latin"] },
      { char: "ï", name: "i with diaeresis", keywords: ["latin"] },
      { char: "ī", name: "i with macron", keywords: ["latin"] },
      { char: "į", name: "i with ogonek", keywords: ["latin"] },
      { char: "ı", name: "dotless i", keywords: ["latin"] },
      { char: "ł", name: "l with stroke", keywords: ["latin"] },
      { char: "ñ", name: "n with tilde", keywords: ["latin"] },
      { char: "ń", name: "n with acute", keywords: ["latin"] },
      { char: "ň", name: "n with caron", keywords: ["latin"] },
      { char: "ó", name: "o with acute", keywords: ["latin"] },
      { char: "ò", name: "o with grave", keywords: ["latin"] },
      { char: "ô", name: "o with circumflex", keywords: ["latin"] },
      { char: "ö", name: "o with diaeresis", keywords: ["latin"] },
      { char: "õ", name: "o with tilde", keywords: ["latin"] },
      { char: "ø", name: "o with stroke", keywords: ["latin"] },
      { char: "ō", name: "o with macron", keywords: ["latin"] },
      { char: "ő", name: "o with double acute", keywords: ["latin"] },
      { char: "œ", name: "oe ligature", keywords: ["latin"] },
      { char: "ŕ", name: "r with acute", keywords: ["latin"] },
      { char: "ř", name: "r with caron", keywords: ["latin"] },
      { char: "ś", name: "s with acute", keywords: ["latin"] },
      { char: "š", name: "s with caron", keywords: ["latin"] },
      { char: "ş", name: "s with cedilla", keywords: ["latin"] },
      { char: "ß", name: "sharp s", keywords: ["latin"] },
      { char: "ţ", name: "t with cedilla", keywords: ["latin"] },
      { char: "ť", name: "t with caron", keywords: ["latin"] },
      { char: "þ", name: "thorn", keywords: ["latin"] },
      { char: "ú", name: "u with acute", keywords: ["latin"] },
      { char: "ù", name: "u with grave", keywords: ["latin"] },
      { char: "û", name: "u with circumflex", keywords: ["latin"] },
      { char: "ü", name: "u with diaeresis", keywords: ["latin"] },
      { char: "ū", name: "u with macron", keywords: ["latin"] },
      { char: "ů", name: "u with ring", keywords: ["latin"] },
      { char: "ű", name: "u with double acute", keywords: ["latin"] },
      { char: "ų", name: "u with ogonek", keywords: ["latin"] },
      { char: "ý", name: "y with acute", keywords: ["latin"] },
      { char: "ÿ", name: "y with diaeresis", keywords: ["latin"] },
      { char: "ž", name: "z with caron", keywords: ["latin"] },
      { char: "ź", name: "z with acute", keywords: ["latin"] },
      { char: "ż", name: "z with dot", keywords: ["latin"] },
      { char: "ğ", name: "g with breve", keywords: ["latin"] },
    ]);

    const technicalCharacters = makeSimpleList([
      "⌂", "⌃", "⌄", "⌅", "⌆", "⌇", "⌈", "⌉", "⌊", "⌋",
      "⌌", "⌍", "⌎", "⌏", "⌐", "⌑", "⌒", "⌓", "⌔", "⌕",
      "⌖", "⌗", "⌘", "⌙", "⌚", "⌛", "⌜", "⌝", "⌞", "⌟",
      "⌠", "⌡", "⌢", "⌣", "⌤", "⌥", "⌦", "⌧", "⌨", "〈",
      "〉", "⌫", "⌬", "⌭", "⌮", "⌯", "⌰", "⌱", "⌲", "⌳",
      "⌴", "⌵", "⌶", "⌷", "⌸", "⌹", "⌺", "⌻", "⌼", "⌽",
      "⌾", "⌿", "⍀", "⍁", "⍂", "⍃", "⍄", "⍅", "⍆", "⍇",
      "⍈", "⍉", "⍊", "⍋", "⍌", "⍍", "⍎", "⍏", "⍐", "⍑",
    ], "Technical", "technical");

    const greekCharacters = normalizeItems([
      { char: "Α", name: "Alpha", keywords: ["greek"] },
      { char: "Β", name: "Beta", keywords: ["greek"] },
      { char: "Γ", name: "Gamma", keywords: ["greek"] },
      { char: "Δ", name: "Delta", keywords: ["greek"] },
      { char: "Ε", name: "Epsilon", keywords: ["greek"] },
      { char: "Ζ", name: "Zeta", keywords: ["greek"] },
      { char: "Η", name: "Eta", keywords: ["greek"] },
      { char: "Θ", name: "Theta", keywords: ["greek"] },
      { char: "Ι", name: "Iota", keywords: ["greek"] },
      { char: "Κ", name: "Kappa", keywords: ["greek"] },
      { char: "Λ", name: "Lambda", keywords: ["greek"] },
      { char: "Μ", name: "Mu", keywords: ["greek"] },
      { char: "Ν", name: "Nu", keywords: ["greek"] },
      { char: "Ξ", name: "Xi", keywords: ["greek"] },
      { char: "Ο", name: "Omicron", keywords: ["greek"] },
      { char: "Π", name: "Pi", keywords: ["greek"] },
      { char: "Ρ", name: "Rho", keywords: ["greek"] },
      { char: "Σ", name: "Sigma", keywords: ["greek"] },
      { char: "Τ", name: "Tau", keywords: ["greek"] },
      { char: "Υ", name: "Upsilon", keywords: ["greek"] },
      { char: "Φ", name: "Phi", keywords: ["greek"] },
      { char: "Χ", name: "Chi", keywords: ["greek"] },
      { char: "Ψ", name: "Psi", keywords: ["greek"] },
      { char: "Ω", name: "Omega", keywords: ["greek"] },
      { char: "α", name: "alpha", keywords: ["greek"] },
      { char: "β", name: "beta", keywords: ["greek"] },
      { char: "γ", name: "gamma", keywords: ["greek"] },
      { char: "δ", name: "delta", keywords: ["greek"] },
      { char: "ε", name: "epsilon", keywords: ["greek"] },
      { char: "ζ", name: "zeta", keywords: ["greek"] },
      { char: "η", name: "eta", keywords: ["greek"] },
      { char: "θ", name: "theta", keywords: ["greek"] },
      { char: "ι", name: "iota", keywords: ["greek"] },
      { char: "κ", name: "kappa", keywords: ["greek"] },
      { char: "λ", name: "lambda", keywords: ["greek"] },
      { char: "μ", name: "mu", keywords: ["greek"] },
      { char: "ν", name: "nu", keywords: ["greek"] },
      { char: "ξ", name: "xi", keywords: ["greek"] },
      { char: "ο", name: "omicron", keywords: ["greek"] },
      { char: "π", name: "pi", keywords: ["greek"] },
      { char: "ρ", name: "rho", keywords: ["greek"] },
      { char: "σ", name: "sigma", keywords: ["greek"] },
      { char: "ς", name: "final sigma", keywords: ["greek"] },
      { char: "τ", name: "tau", keywords: ["greek"] },
      { char: "υ", name: "upsilon", keywords: ["greek"] },
      { char: "φ", name: "phi", keywords: ["greek"] },
      { char: "χ", name: "chi", keywords: ["greek"] },
      { char: "ψ", name: "psi", keywords: ["greek"] },
      { char: "ω", name: "omega", keywords: ["greek"] },
      { char: "ϐ", name: "beta symbol", keywords: ["greek"] },
      { char: "ϑ", name: "theta symbol", keywords: ["greek"] },
      { char: "ϒ", name: "upsilon symbol", keywords: ["greek"] },
      { char: "ϕ", name: "phi symbol", keywords: ["greek"] },
      { char: "ϖ", name: "pi symbol", keywords: ["greek"] },
      { char: "ϵ", name: "epsilon symbol", keywords: ["greek"] },
      { char: "ϱ", name: "rho symbol", keywords: ["greek"] },
      { char: "ϰ", name: "kappa symbol", keywords: ["greek"] },
      { char: "ϲ", name: "lunate sigma", keywords: ["greek"] },
      { char: "Ϝ", name: "digamma", keywords: ["greek"] },
      { char: "ϝ", name: "digamma", keywords: ["greek"] },
      { char: "Ϙ", name: "koppa", keywords: ["greek"] },
      { char: "ϙ", name: "koppa", keywords: ["greek"] },
      { char: "Ϡ", name: "sampi", keywords: ["greek"] },
      { char: "ϡ", name: "sampi", keywords: ["greek"] },
      { char: "Ϛ", name: "stigma", keywords: ["greek"] },
      { char: "ϛ", name: "stigma", keywords: ["greek"] },
    ]);

    const characterSets = {
      math: mathCharacters,
      currency: currencyCharacters,
      language: languageCharacters,
      technical: technicalCharacters,
      greek: greekCharacters,
    };

    let selectedCharacter = null;

    const updateSelection = (item) => {
      selectedCharacter = item;
      selectedLabel.textContent = item ? `${item.char} ${item.name}` : "Select a character";
      selectedCode.textContent = item ? `U+${item.hex}` : "";
    };

    const fallbackCopy = (text) => {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "absolute";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();
      helper.setSelectionRange(0, helper.value.length);
      const succeeded = document.execCommand("copy");
      document.body.removeChild(helper);
      return succeeded;
    };

    const copyCharacter = async (item) => {
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(item.char);
          copied = true;
        } else {
          copied = fallbackCopy(item.char);
        }
      } catch (error) {
        copied = fallbackCopy(item.char);
      }

      if (copied) {
        setStatus(statusText, `${item.name} copied to clipboard.`);
        copyButton.classList.add("copied");
        copyButton.textContent = "Copied";
        if (copyButton._copiedTimer) {
          clearTimeout(copyButton._copiedTimer);
        }
        copyButton._copiedTimer = setTimeout(() => {
          copyButton.classList.remove("copied");
          copyButton.textContent = "Copy Selected";
        }, 1200);
      } else {
        setStatus(statusText, "Unable to copy. Select and copy manually.");
      }
    };

    let selectedCell = null;

    const renderList = (items) => {
      list.innerHTML = "";
      updateSelection(null);
      selectedCell = null;

      items.forEach((item) => {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "utf-cell";
        cell.setAttribute("aria-label", `${item.name}, U+${item.hex}`);
        cell.textContent = item.char;
        cell.addEventListener("click", () => {
          updateSelection(item);
          if (selectedCell) {
            selectedCell.classList.remove("selected");
          }
          cell.classList.add("selected");
          selectedCell = cell;
        });
        list.appendChild(cell);
      });
    };


    const renderScope = () => {
      const source = characterSets[scopeSelect.value] || mathCharacters;
      renderList(source);
      setStatus(statusText, `${source.length} characters ready.`);
    };

    copyButton.addEventListener("click", async () => {
      if (!selectedCharacter) {
        setStatus(statusText, "Select a character before copying.");
        return;
      }

      await copyCharacter(selectedCharacter);
    });

    updateSelection(null);
    renderScope();
    scopeSelect.addEventListener("change", () => {
      renderScope();
    });
  };

  initUtf8Tool();
})();
