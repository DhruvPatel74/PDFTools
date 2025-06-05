document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("pdf-sign-file");
    const canvas = document.getElementById("signature-pad");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const clearBtn = document.getElementById("clear-signature");
    const signButton = document.getElementById("pdf-sign-button");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");
    const pagePreviewContainer = document.getElementById("page-preview-container");
    const pageSelection = document.getElementById("page-selection");

    let drawing = false;
    let signatureDataUrl = null;
    let pdfPages = [];
    let selectedPages = new Set();

    // Initialize canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Signature drawing functions
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", stopDrawing);
    clearBtn.addEventListener("click", clearCanvas);

    function startDrawing(e) {
        drawing = true;
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function stopDrawing() {
        if (!drawing) return;
        drawing = false;
        ctx.closePath();
        
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        tempCtx.putImageData(imageData, 0, 0);
        
        signatureDataUrl = tempCanvas.toDataURL("image/png");
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getPosition(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        signatureDataUrl = null;
    }

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    // Handle PDF file selection
    fileInput.addEventListener("change", async (e) => {
        if (!e.target.files.length) return;
        
        loadingOverlay.classList.remove("d-none");
        try {
            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(e.target.files[0])).promise;
            pdfPages = [];
            pagePreviewContainer.innerHTML = "";
            selectedPages.clear();

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.5 });
                
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                canvas.dataset.pageNumber = i;
                canvas.classList.add("page-preview");
                
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const originalImage = new Image();
                originalImage.src = canvas.toDataURL();
                
                setupSignatureDrag(canvas, i, originalImage);
                
                pagePreviewContainer.appendChild(canvas);
                pdfPages.push({
                    number: i,
                    canvas: canvas,
                    signature: null,
                    originalImage: originalImage
                });

                const option = document.createElement("option");
                option.value = i;
                option.textContent = `Page ${i}`;
                pageSelection.appendChild(option);
            }
            
            pageSelection.style.display = "block";
        } catch (error) {
            console.error("PDF preview error:", error);
            alert("Error loading PDF: " + error.message);
        } finally {
            loadingOverlay.classList.add("d-none");
        }
    });

    // Setup drag-and-drop for signatures
    function setupSignatureDrag(canvas, pageNum, originalImage) {
        let signature = null;
        let isDragging = false;
        let offsetX, offsetY;

        canvas.addEventListener("click", (e) => {
            if (!signatureDataUrl) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (signature && isPointInSignature(x, y, signature)) {
                signature = null;
                redrawCanvas(canvas, originalImage);
                return;
            }
            
            if (!signature) {
                signature = {
                    img: new Image(),
                    x: x - 50,
                    y: y - 25,
                    width: 100,
                    height: 50
                };
                signature.img.src = signatureDataUrl;
                signature.img.onload = () => {
                    redrawCanvas(canvas, originalImage);
                };
            }
        });

        canvas.addEventListener("mousedown", (e) => {
            if (!signature) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (isPointInSignature(x, y, signature)) {
                isDragging = true;
                offsetX = x - signature.x;
                offsetY = y - signature.y;
            }
        });

        canvas.addEventListener("mousemove", (e) => {
            if (!isDragging || !signature) return;
            
            const rect = canvas.getBoundingClientRect();
            signature.x = e.clientX - rect.left - offsetX;
            signature.y = e.clientY - rect.top - offsetY;
            redrawCanvas(canvas, originalImage);
        });

        canvas.addEventListener("mouseup", () => {
            isDragging = false;
        });

        function isPointInSignature(x, y, sig) {
            return x >= sig.x && x <= sig.x + sig.width &&
                   y >= sig.y && y <= sig.y + sig.height;
        }

        function redrawCanvas(canvas, originalImg) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(originalImg, 0, 0);
            
            if (signature) {
                ctx.drawImage(
                    signature.img, 
                    signature.x, 
                    signature.y, 
                    signature.width, 
                    signature.height
                );
                
                const pageIndex = pdfPages.findIndex(p => p.number === pageNum);
                if (pageIndex !== -1) {
                    pdfPages[pageIndex].signature = {
                        x: signature.x,
                        y: signature.y,
                        width: signature.width,
                        height: signature.height,
                        dataUrl: signatureDataUrl
                    };
                }
            } else {
                const pageIndex = pdfPages.findIndex(p => p.number === pageNum);
                if (pageIndex !== -1) {
                    pdfPages[pageIndex].signature = null;
                }
            }
        }
    }

    // Handle sign button click
    signButton.addEventListener("click", async () => {
        if (!fileInput.files.length) {
            alert("Please select a PDF file.");
            return;
        }
        
        if (!signatureDataUrl) {
            alert("Please create a signature first.");
            return;
        }
        
        const pagesWithSignatures = pdfPages
            .filter(page => page.signature !== null)
            .map(page => ({
                page: page.number,
                signature: page.signature
            }));
        
        if (pagesWithSignatures.length === 0) {
            alert("Please add signature to at least one page.");
            return;
        }
        
        loadingOverlay.classList.remove("d-none");
        try {
            const formData = new FormData();
            formData.append("pdfFile", fileInput.files[0]);
            formData.append("signatureData", JSON.stringify({
                signature: signatureDataUrl,
                pages: pagesWithSignatures
            }));
            
            const response = await fetch("/api/pdfsign", {
                method: "POST",
                body: formData
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to sign PDF");
            }
            
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            
            // Set up download link
            downloadLink.href = downloadUrl;
            downloadLink.download = "signed_" + fileInput.files[0].name;
            downloadLink.style.display = "block";
            resultSection.style.display = "block";
            
            // Automatically trigger download if desired
            // downloadLink.click();
            
        } catch (error) {
            console.error("Error:", error);
            alert("Error signing PDF: " + error.message);
        } finally {
            loadingOverlay.classList.add("d-none");
        }
    });
});