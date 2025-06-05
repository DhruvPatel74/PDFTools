// toolsData.js
module.exports = {
  split: {
    title: "Split",
    description: "Extract pages from your PDF document.",
    formId: "split",
    fileInputId: "split-file",
    pageRangeId: "split-page-range",
    pageRangePlaceholder: "1-3, 5",
    buttonId: "split-button",
    buttonText: "Split PDF",

    steps: [
      "Click the Select a file button above.",
      "Choose the files you wish to split.",
      "Enter the page range you want to extract.",
      'Click on "Split files".',
      "Download the split PDF.",
    ],
    features: [
      {
        icon: "fa-cut text-primary",
        title: "Split PDFs into multiple files",
        description:
          "Easily split large PDF documents into smaller files with Adobe Acrobat online services. Select the pages youwant to extract, and split them in seconds without losing the original quality.",
      },
      {
        icon: "fa-layer-group text-danger",
        title: "Customize your splits",
        description:
          "Choose specific pages or ranges to split into separate PDFs. Organize and manage files effectively, tailoredto your personal or business needs.",
      },
      {
        icon: "fa-file-alt text-success",
        title: "Organise extracted pages",
        description:
          "Rearrange, delete, or rotate the pages before splitting. Ensure your extracted PDFs are perfectly customizedto meet your requirements.",
      },
      {
        icon: "fa-download text-info",
        title: "Download or share your split files",
        description:
          "Download your split PDF files instantly or sign in to save and share them securely. Your privacy isprotected, and files are deleted from the cloud after a certain period.",
      },
      {
        icon: "fa-globe text-danger",
        title: "Access on any web browser",
        description:
          "Use the PDF splitter tool on any device or browser, including Microsoft Edge, Google Chrome, and Safari. It works seamlessly across Windows, Mac, and Linux.",
      },
      {
        icon: "fa-shield-alt text-danger",
        title: "Trusted PDF splitter tool",
        description:
          "Adobe's trusted technology ensures secure and accurate splitting of your PDFs. Get high-quality results and keep your workflow smooth and efficient.",
      },
    ],
    pageRangeRequired: true,
  },
  merge: {
    title: "Merge",
    description: "Combine multiple PDF files into one.",
    formId: "merge",
    fileInputId: "merge-file",
    pageRangeId: "merge-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "merge-button",
    buttonText: "Merge PDF",
    steps: [
      'Click the "Select a file" button above.',
      "Choose the files you wish to merge.",
      "Rearrange the files if necessary.",
      'Click on "Merge files".',
      "Download the merged PDF.",
    ],
    features: [
      {
        icon: "fa-file-alt text-primary",
        title: "Combine PDFs into a single file",
        description:
          "Easily merge PDF files into a single document with Adobe Acrobat online services. Simply upload your files, merge them in seconds, and retain the original content, layout, and quality.",
      },
      {
        icon: "fa-layer-group text-danger",
        title: "Simplify with a combined PDF",
        description:
          "Merging multiple files into one PDF lets you store and review them more easily. You can also share files with others efficiently by emailing a link to a single, merged PDF file.",
      },
      {
        icon: "fa-file-alt text-danger",
        title: "Organise and manage PDFs",
        description:
          "Merging multiple files into one PDF lets you store and review them more easily. You can also share files with others efficiently by emailing a link to a single, merged PDF file.",
      },
      {
        icon: "fa-download text-info",
        title: "Download your file or share it",
        description:
          "Download your merged file immediately or by signing in, which also enables easy sharing with friends or colleagues. For your privacy, Adobe does not delete combined PDFs from cloud storage unless requested.",
      },
      {
        icon: "fa-globe text-warning",
        title: "Work in any web browser",
        description:
          "You can use our PDF merger online tool on any web browser, such as Microsoft Edge or Google Chrome. It also works on Mac, Windows, and Linux operating systems.",
      },
      {
        icon: "fa-shield-alt text-secondary",
        title: "Trusted PDF merger tool",
        description:
          "Adobe invented the PDF file format, making our PDF tools highly trusted. Use our free tools to combine PDFs your work moving from anywhere.",
      },
    ],
  },
  "compress-pdf": {
    title: "Compress PDF",
    description: "Reduce the file size of a PDF document.",
    formId: "compress-pdf",
    fileInputId: "compress-pdf-file",
    pageRangeId: "compress-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "compress-pdf-button",
    buttonText: "Compress PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file.",
      "Click on 'Compress PDF'.",
      "Download the compressed PDF.",
    ],
    features: [
      {
        icon: "fa-file-pdf text-primary",
        title: "Reduce file size",
        description:
          "Compress large PDFs to smaller sizes while preserving quality.",
      },
      {
        icon: "fa-tachometer-alt text-danger",
        title: "Faster downloads",
        description: "Smaller files are faster to download and share.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant download",
        description:
          "Download the compressed PDF file right after the process is complete.",
      },
      {
        icon: "fa-share text-success",
        title: "Share easily",
        description:
          "Easily share the compressed file with others through email or cloud storage.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Works across platforms",
        description: "Compress PDFs from any device or operating system.",
      },
      {
        icon: "fa-shield-alt text-secondary",
        title: "Secure and private",
        description:
          "All PDFs are processed with full privacy on secure cloud servers.",
      },
    ],
  },
  "rotate-pdf": {
    title: "Rotate PDF",
    description: "Rotate the pages of a PDF document.",
    formId: "rotate-pdf",
    fileInputId: "rotate-pdf-file",
    pageRangeId: "rotate-pdf-page-range",
    pageRangePlaceholder: "Select page range",
    buttonId: "rotate-pdf-button",
    buttonText: "Rotate PDF",
    rotationRequired: true,
    pageRangeRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your PDF file.",
      "Choose the pages you want to rotate.",
      "Select the rotation direction (90, 180, 270 degrees).",
      "Click on 'Rotate PDF'.",
      "Download the rotated PDF.",
    ],
    features: [
      {
        icon: "fa-sync-alt text-primary",
        title: "Rotate PDF pages",
        description: "Rotate PDF pages to the correct orientation with ease.",
      },
      {
        icon: "fa-undo text-danger",
        title: "Undo rotation",
        description: "If needed, undo the rotation and start over.",
      },
      {
        icon: "fa-download text-info",
        title: "Download rotated file",
        description: "Download your rotated PDF immediately after the process.",
      },
      {
        icon: "fa-share text-success",
        title: "Share with ease",
        description:
          "Share the rotated PDF with colleagues or friends through email or cloud services.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Works on all devices",
        description:
          "Use this tool on any device with a web browser, including Windows, Mac, and Linux.",
      },
      {
        icon: "fa-lock text-secondary",
        title: "Secure cloud processing",
        description: "Your PDFs are processed securely on cloud servers.",
      },
    ],
  },
  "protect-pdf": {
    title: "Protect PDF",
    description: "Password protect your PDF files.",
    formId: "protect-pdf",
    fileInputId: "protect-pdf-file",
    pageRangeId: "protect-pdf-page-range",
    passwordInput: "protect-password",
    confirmPasswordInput: "confirm-protect-password",
    pageRangePlaceholder: "N/A",
    buttonId: "protect-pdf-button",
    buttonText: "Protect PDF",
    pdfPasswordLockRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file.",
      "Enter the password you want to protect your PDF with.",
      "Click on 'Protect PDF'.",
      "Download the password-protected PDF.",
    ],
    features: [
      {
        icon: "fa-lock text-primary",
        title: "Password protection",
        description:
          "Add a password to your PDF file to prevent unauthorized access.",
      },
      {
        icon: "fa-check-circle text-danger",
        title: "Control access",
        description:
          "Ensure only authorized users can open and view your document.",
      },
      {
        icon: "fa-download text-info",
        title: "Download secured PDF",
        description:
          "Download the password-protected PDF file once it's ready.",
      },
      {
        icon: "fa-share text-success",
        title: "Secure sharing",
        description:
          "Share the protected PDF with others and provide them with the password.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Cross-platform support",
        description: "Use this tool from any device with internet access.",
      },
      {
        icon: "fa-cloud text-secondary",
        title: "Cloud-based security",
        description:
          "All processing happens securely in the cloud, ensuring your documents are safe.",
      },
    ],
  },
  "unlock-pdf": {
    title: "Unlock PDF",
    description: "Remove password protection from your PDF files.",
    formId: "unlock-pdf",
    fileInputId: "unlock-pdf-file",
    pageRangeId: "unlock-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "unlock-pdf-button",
    buttonText: "Unlock PDF",
    pdfPasswordUnlockRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the locked PDF file.",
      "Enter the password for the protected file.",
      "Click on 'Unlock PDF'.",
      "Download the unlocked PDF.",
    ],
    features: [
      {
        icon: "fa-lock-open text-primary",
        title: "Remove password protection",
        description:
          "Unlock a password-protected PDF file for easier access and sharing.",
      },
      {
        icon: "fa-edit text-danger",
        title: "Access all content",
        description:
          "Unlock the PDF to view and edit all the content without restrictions.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant download",
        description:
          "Download the unlocked PDF file once the process is complete.",
      },
      {
        icon: "fa-share text-success",
        title: "Easy sharing",
        description: "Share the unlocked PDF file without needing a password.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Works across devices",
        description: "Unlock PDFs on any device with internet access.",
      },
      {
        icon: "fa-shield-alt text-secondary",
        title: "Secure processing",
        description:
          "Processing happens securely on cloud servers to ensure privacy.",
      },
    ],
  },
  "edit-pdf": {
    title: "Edit PDF",
    description: "Edit text, images, and other content in a PDF document.",
    formId: "edit-pdf",
    fileInputId: "edit-pdf-file",
    pageRangeId: "edit-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "edit-pdf-button",
    buttonText: "Edit PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF you want to edit.",
      "Make the desired changes (text, images, etc.).",
      "Click on 'Edit PDF'.",
      "Download the edited PDF.",
    ],
    features: [
      {
        icon: "fa-pencil-alt text-primary",
        title: "Edit PDF content",
        description: "Make text and image edits directly in the PDF document.",
      },
      {
        icon: "fa-image text-danger",
        title: "Modify images",
        description: "Replace or edit images in your PDF document.",
      },
      {
        icon: "fa-save text-info",
        title: "Save your changes",
        description:
          "Download the edited PDF document after making your changes.",
      },
      {
        icon: "fa-share text-success",
        title: "Easily share",
        description: "Share your edited PDF through email or cloud storage.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Works on all devices",
        description: "Edit PDFs on any device or operating system.",
      },
      {
        icon: "fa-lock text-secondary",
        title: "Safe cloud editing",
        description:
          "Edit your PDFs securely in the cloud to maintain privacy.",
      },
    ],
  },
  "add-watermark-pdf": {
    title: "Add Watermark to PDF",
    description: "Add a custom watermark to your PDF document.",
    formId: "add-watermark-pdf",
    fileInputId: "watermark-pdf-file",
    pageRangeId: "add-watermark-pdf-page-range",
    pageRangePlaceholder: "Select page range",
    buttonId: "watermark-pdf-button",
    buttonText: "Add Watermark",
    watermarkRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file you want to watermark.",
      "Enter the text or upload an image for your watermark.",
      "Select the page range where you want the watermark to appear.",
      "Click on 'Add Watermark'.",
      "Download the PDF with the watermark.",
    ],
    features: [
      {
        icon: "fa-water text-primary",
        title: "Add text or image watermark",
        description:
          "Add custom text or an image watermark to your PDF document to protect it.",
      },
      {
        icon: "fa-file-text text-danger",
        title: "Protect your content",
        description:
          "A watermark helps prevent unauthorized use of your document by adding an overlay.",
      },
      {
        icon: "fa-download text-info",
        title: "Download watermarked PDF",
        description:
          "Download the PDF with your watermark immediately after adding it.",
      },
      {
        icon: "fa-share text-success",
        title: "Share securely",
        description:
          "Share the watermarked PDF securely with colleagues or clients.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Easy to use",
        description: "This tool works smoothly on any device or platform.",
      },
      {
        icon: "fa-lock text-secondary",
        title: "Secure cloud processing",
        description:
          "All changes are made securely in the cloud, ensuring the privacy of your document.",
      },
    ],
  },
  "remove-pages-pdf": {
    title: "Remove Pages from PDF",
    description: "Remove unwanted pages from your PDF file.",
    formId: "remove-pages-pdf",
    fileInputId: "remove-pages-pdf-file",
    pageRangeId: "remove-pages-pdf-page-range",
    pageRangePlaceholder: "Enter page numbers",
    buttonId: "remove-pages-pdf-button",
    buttonText: "Remove Pages",
    pageRangeRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file from which you want to remove pages.",
      "Enter the page numbers you want to delete.",
      "Click on 'Remove Pages'.",
      "Download the PDF with pages removed.",
    ],
    features: [
      {
        icon: "fa-trash text-primary",
        title: "Remove unwanted pages",
        description:
          "Easily delete specific pages from your PDF file without affecting the rest of the content.",
      },
      {
        icon: "fa-edit text-danger",
        title: "Efficient page selection",
        description:
          "Select exactly which pages you want to delete from your PDF.",
      },
      {
        icon: "fa-download text-info",
        title: "Download the modified PDF",
        description:
          "Get the PDF file with pages removed right after the operation.",
      },
      {
        icon: "fa-share text-success",
        title: "Share edited PDF",
        description:
          "Share the updated PDF easily with others via email or cloud storage.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Works on all devices",
        description:
          "You can remove pages from your PDF on any platform or device.",
      },
      {
        icon: "fa-lock text-secondary",
        title: "Secure cloud service",
        description: "All file modifications are done securely in the cloud.",
      },
    ],
  },
  "extract-pages-pdf": {
    title: "Extract Pages from PDF",
    description:
      "Extract selected pages from a PDF document and save them as a new file.",
    formId: "extract-pages-pdf",
    fileInputId: "extract-pages-pdf-file",
    pageRangeId: "extract-pages-pdf-page-range",
    pageRangePlaceholder: "Enter page range",
    buttonId: "extract-pages-pdf-button",
    buttonText: "Extract Pages",
    pageRangeRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file.",
      "Enter the page range or specific pages to extract.",
      "Click on 'Extract Pages'.",
      "Download the new PDF with the extracted pages.",
    ],
    features: [
      {
        icon: "fa-exchange-alt text-primary",
        title: "Extract specific pages",
        description:
          "Extract only the pages you need from a PDF to create a new document.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Create a new PDF",
        description: "Extract pages and save them as a separate PDF file.",
      },
      {
        icon: "fa-download text-info",
        title: "Download extracted pages",
        description: "Download the new PDF with the extracted pages instantly.",
      },
      {
        icon: "fa-share text-success",
        title: "Easily share",
        description:
          "Share the new PDF file with the extracted pages via email or cloud storage.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Cross-platform support",
        description:
          "Extract pages from PDFs on any device with internet access.",
      },
      {
        icon: "fa-lock text-secondary",
        title: "Secure extraction process",
        description: "All operations are done securely in the cloud.",
      },
    ],
    pageRangeRequired: true,
  },
  "organize-pdf": {
    title: "Organize PDF",
    description: "Rearrange, delete, or rotate pages in a PDF document.",
    formId: "organize-pdf",
    fileInputId: "organize-pdf-file",
    buttonId: "organize-pdf-button",
    buttonText: "Organize PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file you want to organize.",
      "Rearrange, delete, or rotate pages as needed.",
      "Click on 'Organize PDF'.",
      "Download the organized PDF.",
    ],
    features: [
      {
        icon: "fa-sort text-primary",
        title: "Rearrange pages",
        description:
          "Drag and drop pages to rearrange the order in your PDF document.",
      },
      {
        icon: "fa-trash text-danger",
        title: "Delete unwanted pages",
        description: "Delete any pages you no longer need from the document.",
      },
      {
        icon: "fa-sync-alt text-info",
        title: "Rotate pages",
        description:
          "Rotate pages to the correct orientation with just a click.",
      },
      {
        icon: "fa-download text-success",
        title: "Download organized PDF",
        description:
          "Download the edited PDF once the organization is complete.",
      },
      {
        icon: "fa-share text-warning",
        title: "Share easily",
        description:
          "Share the newly organized PDF file with others through email or cloud services.",
      },
      {
        icon: "fa-cogs text-secondary",
        title: "Works on any platform",
        description:
          "You can use this tool across all devices and operating systems.",
      },
    ],
  },
  "pdf-page-numbering": {
    title: "PDF Page Numbering",
    description: "Add or remove page numbers from PDFs.",
    formId: "pdf-page-numbering",
    fileInputId: "pdf-page-numbering-file",
    pageRangeId: "pdf-page-numbering-page-range",
    pageRangePlaceholder: "e.g., 1-5, 7, 10-12",
    buttonId: "pdf-page-numbering-button",
    buttonText: "Add Page Numbers",
    pageNumberPositionRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF file.",
      "Enter the page range if needed.",
      "Click on 'Add Page Numbers'.",
      "Download the updated PDF.",
    ],
    features: [
      {
        icon: "fa-sort-numeric-up text-success",
        title: "Automatic Page Numbering",
        description: "Easily add page numbers to your PDF documents.",
      },
      {
        icon: "fa-edit text-primary",
        title: "Customizable Format",
        description: "Choose number position, font size, and style.",
      },
      {
        icon: "fa-download text-info",
        title: "Download Numbered PDF",
        description: "Get the updated PDF with page numbers.",
      },
    ],
  },
  "pdf-sign": {
    title: "PDF Sign",
    description: "Add electronic or digital signatures to PDFs.",
    formId: "pdf-sign",
    fileInputId: "pdf-sign-file",
    buttonId: "pdf-sign-button",
    buttonText: "Sign PDF",
    signatureRequired: true,
    steps: [
      "Click the 'Select a file' button above.",
      "Upload the PDF that needs a signature.",
      "Sign electronically or upload a signature image.",
      "Click 'Sign PDF' to finalize.",
      "Download the signed PDF.",
    ],
    features: [
      {
        icon: "fa-signature text-warning",
        title: "E-Signature Support",
        description: "Sign PDFs using a digital or handwritten signature.",
      },
      {
        icon: "fa-file-signature text-primary",
        title: "Multiple Signature Options",
        description: "Upload a signature, draw, or type it.",
      },
      {
        icon: "fa-lock text-secondary",
        title: "Secure Signing",
        description: "Ensures document integrity and security.",
      },
    ],
  },
"pdf-ocr": {
  title: "PDF OCR",
  description: "Extract text from scanned or image-based PDF documents using OCR technology.",
  formId: "pdf-ocr",
  fileInputId: "pdf-ocr-file",
  buttonId: "pdf-ocr-button",
  buttonText: "Extract Text",
  redactRequired: false, // Not applicable for OCR
  steps: [
    "Click the 'Select a file' button above.",
    "Upload a scanned or image-based PDF file.",
    "Click 'Extract Text' to start the OCR process.",
    "Wait for the OCR to complete.",
    "View or copy the extracted text below.",
  ],
  features: [
    {
      icon: "fa-brain text-info",
      title: "Smart OCR Engine",
      description: "Recognizes and extracts text from scanned PDFs using AI.",
    },
    {
      icon: "fa-language text-success",
      title: "Multi-language Support",
      description: "Supports English and many other languages for recognition.",
    },
    {
      icon: "fa-file-lines text-primary",
      title: "Accurate Text Output",
      description: "Extracts clean, readable text from complex document layouts.",
    },
  ],
},


  "images-to-pdf": {
    title: "Images to PDF",
    description: "Convert images (JPG, PNG, SVG) to PDF format.",
    formId: "images-to-pdf",
    fileInputId: "images-to-pdf-file",
    pageRangeId: "images-to-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "images-to-pdf-button",
    buttonText: "Convert to PDF",
    type: "image-to-pdf",
    steps: [
      "Click the 'Select a file' button above.",
      "Choose the images you wish to convert.",
      "Rearrange the images if necessary.",
      "Click on 'Convert to PDF'.",
      "Download the converted PDF.",
    ],
    features: [
      {
        icon: "fa-image text-primary",
        title: "Convert various image formats",
        description:
          "Easily convert images like JPG, PNG, and SVG into high-quality PDFs.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Save space by converting to PDF",
        description:
          "Convert images to PDF to reduce file size and make documents easier to share.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Flexible customization options",
        description:
          "You can customize the PDF output, such as setting page orientation or size.",
      },
      {
        icon: "fa-download text-info",
        title: "Download instantly",
        description:
          "After conversion, your PDF file is available for immediate download.",
      },
      {
        icon: "fa-share text-success",
        title: "Easily share your PDFs",
        description:
          "Share your newly created PDF with anyone, via email or a cloud service.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Cross-platform compatibility",
        description:
          "Use our tool on any platform – Windows, Mac, or Linux – directly from your web browser.",
      },
    ],
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description: "Convert Word documents (DOC, DOCX) into PDF format.",
    formId: "word-to-pdf",
    fileInputId: "word-to-pdf-file",
    pageRangeId: "word-to-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "word-to-pdf-button",
    buttonText: "Convert to PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your Word document.",
      "Click on 'Convert to PDF'.",
      "Download the converted PDF.",
    ],
    features: [
      {
        icon: "fa-file-word text-primary",
        title: "Convert Word to PDF",
        description:
          "Quickly convert your DOC or DOCX documents into a reliable PDF format.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Keep original formatting",
        description:
          "Preserve the original layout, fonts, and styling of your Word document in the PDF.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Customization options",
        description:
          "Select page range, orientation, and more to control your PDF output.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant download",
        description:
          "Your converted PDF is ready to download immediately after conversion.",
      },
      {
        icon: "fa-share text-success",
        title: "Share PDF easily",
        description:
          "Once converted, you can share the PDF through email or cloud links.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Works across all platforms",
        description:
          "Access and use this tool on any operating system or web browser.",
      },
    ],
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint to PDF",
    description:
      "Convert PowerPoint presentations (PPT, PPTX) into PDF format.",
    formId: "powerpoint-to-pdf",
    fileInputId: "powerpoint-to-pdf-file",
    pageRangeId: "powerpoint-to-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "powerpoint-to-pdf-button",
    buttonText: "Convert to PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Choose your PowerPoint presentation.",
      "Click on 'Convert to PDF'.",
      "Download the converted PDF.",
    ],
    features: [
      {
        icon: "fa-file-powerpoint text-primary",
        title: "Convert PPT to PDF",
        description:
          "Convert your PowerPoint slides into a high-quality PDF format in seconds.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Retain slide layout",
        description:
          "The formatting, layout, and images of your slides are perfectly retained in the PDF.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Customize output",
        description:
          "Customize your PDF with page range selections and output format preferences.",
      },
      {
        icon: "fa-download text-info",
        title: "Quick download",
        description:
          "Get your PowerPoint slides as a PDF and download it instantly.",
      },
      {
        icon: "fa-share text-success",
        title: "Easily share your slides",
        description:
          "After conversion, share your presentation PDF with colleagues or clients.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Universal compatibility",
        description:
          "Works seamlessly across browsers, no matter the operating system you're using.",
      },
    ],
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description: "Convert Excel sheets (XLS, XLSX) to PDF format.",
    formId: "excel-to-pdf",
    fileInputId: "excel-to-pdf-file",
    pageRangeId: "excel-to-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "excel-to-pdf-button",
    buttonText: "Convert to PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your Excel file.",
      "Click on 'Convert to PDF'.",
      "Download the converted PDF.",
    ],
    features: [
      {
        icon: "fa-file-excel text-primary",
        title: "Convert Excel to PDF",
        description:
          "Turn your Excel spreadsheets into high-quality PDFs with just a click.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Preserve formatting",
        description:
          "The layout, columns, and formulas of your Excel sheet are preserved in the PDF.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Customize output options",
        description:
          "Choose page ranges or other customization options to adjust your PDF output.",
      },
      {
        icon: "fa-download text-info",
        title: "Download instantly",
        description:
          "Get the PDF file of your Excel sheet immediately after conversion.",
      },
      {
        icon: "fa-share text-success",
        title: "Easy sharing",
        description:
          "Share your converted Excel file as a PDF quickly with others.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Compatible with all devices",
        description:
          "Access this tool from any web browser and operating system.",
      },
    ],
  },
  "html-to-pdf": {
    title: "HTML to PDF",
    description: "Convert HTML files or web pages to PDF format.",
    formId: "html-to-pdf",
    fileInputId: "html-to-pdf-file",
    buttonId: "html-to-pdf-button",
    buttonText: "Convert to PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your HTML file or enter a webpage URL.",
      "Click on 'Convert to PDF'.",
      "Download the converted PDF.",
    ],
    features: [
      {
        icon: "fa-file-code text-primary",
        title: "Convert HTML to PDF",
        description:
          "Easily convert HTML files or entire web pages into high-quality PDFs.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Retain webpage layout",
        description:
          "Ensures the original HTML structure, including styles and formatting, is preserved in the PDF.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Custom PDF settings",
        description:
          "Adjust page size, orientation, margins, and other options before conversion.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant PDF download",
        description:
          "Download the converted PDF file instantly without delays.",
      },
      {
        icon: "fa-share text-success",
        title: "Easily share PDFs",
        description:
          "Once converted, share your PDF file with others via email or cloud storage.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Convert online webpages",
        description:
          "Enter a URL to generate a PDF of a webpage directly from the internet.",
      },
    ],
  },
  "text-to-pdf": {
    title: "Text to PDF",
    description: "Convert plain text files to PDF format.",
    formId: "text-to-pdf",
    fileInputId: "text-to-pdf-file",
    pageRangeId: "text-to-pdf-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "text-to-pdf-button",
    buttonText: "Convert to PDF",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your text file.",
      "Click on 'Convert to PDF'.",
      "Download the converted PDF.",
    ],
    features: [
      {
        icon: "fa-file-text text-primary",
        title: "Convert plain text to PDF",
        description:
          "Quickly convert text files into a neatly formatted PDF for easier sharing or printing.",
      },
      {
        icon: "fa-file-pdf text-danger",
        title: "Maintain text formatting",
        description:
          "The text in your file will be accurately formatted and displayed in the PDF.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Customizable PDF settings",
        description:
          "Choose settings for page layout, font size, and margins before conversion.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant PDF download",
        description:
          "Download your text file converted into a PDF immediately after the process.",
      },
      {
        icon: "fa-share text-success",
        title: "Easily share PDFs",
        description:
          "Once converted, share your PDF text file with others via email or cloud storage.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Works across platforms",
        description:
          "Use this tool on any device with an internet connection, regardless of operating system.",
      },
    ],
  },

  "pdf-to-images": {
    title: "PDF to Images",
    description: "Convert PDF pages into image formats.",
    formId: "pdf-to-images",
    fileInputId: "pdf-to-images-file",
    buttonId: "pdf-to-images-button",
    buttonText: "Convert to Images",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your PDF file.",
      "Select the image format (JPG, PNG, etc.).",
      "Click on 'Convert to Images'.",
      "Download the converted image(s).",
    ],
    features: [
      {
        icon: "fa-file-pdf text-primary",
        title: "Convert PDF pages to images",
        description:
          "Easily convert each page of your PDF into an image format like JPG or PNG.",
      },
      {
        icon: "fa-images text-danger",
        title: "High-quality image output",
        description:
          "The images retain high resolution and are perfect for presentations or sharing.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Select image format",
        description:
          "Choose the image format that suits your needs, including JPG, PNG, and more.",
      },
      {
        icon: "fa-download text-info",
        title: "Download images instantly",
        description: "Once converted, you can download your images right away.",
      },
      {
        icon: "fa-share text-success",
        title: "Easy sharing",
        description:
          "Share the images with others easily via email or cloud storage.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Works across platforms",
        description:
          "This tool works on any platform with an internet connection, whether it's Mac, Windows, or Linux.",
      },
    ],
  },
  "pdf-to-word": {
    title: "PDF to Word",
    description: "Convert PDF files to Word (DOCX) format.",
    formId: "pdf-to-word",
    fileInputId: "pdf-to-word-file",
    pageRangeId: "pdf-to-word-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "pdf-to-word-button",
    buttonText: "Convert to Word",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your PDF file.",
      "Click on 'Convert to Word'.",
      "Download the converted Word document.",
    ],
    features: [
      {
        icon: "fa-file-pdf text-primary",
        title: "Convert PDF to Word",
        description:
          "Convert PDF files into editable Word documents while retaining text and formatting.",
      },
      {
        icon: "fa-file-word text-danger",
        title: "Editable text and formatting",
        description:
          "Maintain the structure, formatting, and fonts of your PDF in the Word file.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Customize conversion",
        description:
          "Choose the page range and layout before converting your PDF to Word.",
      },
      {
        icon: "fa-download text-info",
        title: "Download instantly",
        description:
          "Download the converted Word document right after the conversion is completed.",
      },
      {
        icon: "fa-share text-success",
        title: "Quick sharing",
        description:
          "Share your Word document with others directly after conversion.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Cross-platform functionality",
        description:
          "Convert PDFs to Word on any platform, including Mac, Windows, and Linux.",
      },
    ],
  },
  "pdf-to-powerpoint": {
    title: "PDF to PowerPoint",
    description: "Convert PDF files to PowerPoint (PPTX) format.",
    formId: "pdf-to-powerpoint",
    fileInputId: "pdf-to-ppt-file",
    buttonId: "pdf-to-ppt-button",
    buttonText: "Convert to PowerPoint",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your PDF file.",
      "Click on 'Convert to PowerPoint'.",
      "Download the converted PowerPoint presentation.",
    ],
    features: [
      {
        icon: "fa-file-pdf text-primary",
        title: "Convert PDF to PowerPoint",
        description:
          "Convert PDF documents into PowerPoint slides, maintaining the original layout and design.",
      },
      {
        icon: "fa-file-powerpoint text-danger",
        title: "Retain presentation quality",
        description:
          "Keep the layout, formatting, and images intact for a professional-looking PowerPoint.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Flexible settings",
        description:
          "Choose specific slides or range of pages to convert into a PowerPoint presentation.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant download",
        description:
          "Once the conversion is finished, download the PPTX file right away.",
      },
      {
        icon: "fa-share text-success",
        title: "Easy to share",
        description:
          "Share the PowerPoint presentation via email or cloud storage.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Works on all platforms",
        description:
          "This tool works on any device with an internet connection and on any operating system.",
      },
    ],
  },
  "pdf-to-excel": {
    title: "PDF to Excel",
    description: "Convert PDF tables into Excel (XLSX) format.",
    formId: "pdf-to-excel",
    fileInputId: "pdf-to-excel-file",
    pageRangeId: "pdf-to-excel-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "pdf-to-excel-button",
    buttonText: "Convert to Excel",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your PDF file.",
      "Click on 'Convert to Excel'.",
      "Download the converted Excel file.",
    ],
    features: [
      {
        icon: "fa-file-pdf text-primary",
        title: "Extract tables from PDF to Excel",
        description:
          "Easily extract tabular data from PDFs into Excel format for analysis.",
      },
      {
        icon: "fa-file-excel text-danger",
        title: "Retain data integrity",
        description:
          "The tabular data from the PDF is accurately preserved in the Excel file.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Choose specific tables",
        description:
          "Select specific tables or pages within the PDF to convert into Excel format.",
      },
      {
        icon: "fa-download text-info",
        title: "Download immediately",
        description:
          "Get your Excel file right after the conversion process is completed.",
      },
      {
        icon: "fa-share text-success",
        title: "Easy to share",
        description:
          "Share the Excel file via email or cloud services after conversion.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Works across all platforms",
        description:
          "This tool works on any device, with any browser, and on any operating system.",
      },
    ],
  },
  "pdf-to-text": {
    title: "PDF to Text",
    description: "Convert PDF files into text format (.txt).",
    formId: "pdf-to-text",
    fileInputId: "pdf-to-text-file",
    pageRangeId: "pdf-to-text-page-range",
    pageRangePlaceholder: "N/A",
    buttonId: "pdf-to-text-button",
    buttonText: "Convert to Text",
    steps: [
      "Click the 'Select a file' button above.",
      "Upload your PDF file.",
      "Click on 'Convert to Text'.",
      "Download the converted text file.",
    ],
    features: [
      {
        icon: "fa-file-pdf text-primary",
        title: "Convert PDF to Text",
        description:
          "Extract raw text from PDF files and save it as a .txt file.",
      },
      {
        icon: "fa-file-text text-danger",
        title: "Easy-to-edit text",
        description:
          "The converted text file is fully editable, and you can copy or modify the content.",
      },
      {
        icon: "fa-cogs text-warning",
        title: "Select specific content",
        description:
          "Choose specific pages or sections to convert into text format.",
      },
      {
        icon: "fa-download text-info",
        title: "Instant download",
        description:
          "Download the converted text file immediately after conversion.",
      },
      {
        icon: "fa-share text-success",
        title: "Simple sharing",
        description:
          "Share the converted text file with others easily via email or cloud services.",
      },
      {
        icon: "fa-globe text-secondary",
        title: "Works on all devices",
        description:
          "This tool works seamlessly on all platforms, including Mac, Windows, and Linux.",
      },
    ],
  },
};
