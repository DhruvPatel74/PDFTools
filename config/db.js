const mongoose = require("mongoose");
// const Tool = require('../model/tools'); // Update with correct relative path

mongoose.connect("mongodb://127.0.0.1:27017/pdfToolsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


// toolsData = [
//   {
//     name: "Merge PDF",
//     id: "merge pdf",
//     icon: "fa-layer-group",
//     color: "text-primary",
//     description:
//       "Combine multiple PDFs into a single document in any desired order.",
//     link: "/merge",
//   },
//   {
//     name: "Split PDF",
//     id: "splite pdf",
//     icon: "fa-columns",
//     color: "text-success",
//     description:
//       "Extract specific pages from a PDF or split it into smaller files.",
//     link: "/split",
//   },
//   {
//     name: "Compress PDF",
//     id: "compress pdf",
//     icon: "fa-compress-alt",
//     color: "text-warning",
//     description:
//       "Reduce the size of your PDF files for easier sharing and storage.",
//     link: "/compress-pdf",
//   },
//   {
//     name: "Rotate PDF",
//     id: "rotate pdf",
//     icon: "fa-sync-alt",
//     color: "text-primary",
//     description:
//       "Rotate specific pages or entire PDFs to the desired orientation.",
//     link: "/rotate-pdf",
//   },
//   {
//     name: "Protect PDF",
//     id: "protect pdf",
//     icon: "fa-lock",
//     color: "text-danger",
//     description: "Add password protection and secure your PDF documents.",
//     link: "/protect-pdf",
//   },
//   {
//     name: "Unlock PDF",
//     id: "unlock pdf",
//     icon: "fa-unlock-alt",
//     color: "text-success",
//     description: "Remove passwords and restrictions from your PDF files.",
//     link: "/unlock-pdf",
//   },
//   {
//     name: "Edit PDF",
//     id: "edit pdf",
//     icon: "fa-edit",
//     color: "text-secondary",
//     description:
//       "Edit text, images, and other elements directly in your PDF files.",
//     link: "/edit-pdf",
//   },
//   {
//     name: "Add Watermark",
//     id: "add watermark",
//     icon: "fa-tint",
//     color: "text-warning",
//     description:
//       "Insert watermarks to protect your PDFs from unauthorized use.",
//     link: "/add-watermark-pdf",
//   },
//   {
//     name: "Remove Pages",
//     id: "remove pages",
//     icon: "fa-times",
//     color: "text-danger",
//     description: "Delete unwanted pages from your PDF document.",
//     link: "/remove-pages-pdf",
//   },
//   {
//     name: "Extract Pages",
//     id: "extract pages",
//     icon: "fa-file-export",
//     color: "text-secondary",
//     description: "Save specific pages from a PDF as a new document.",
//     link: "/extract-pages-pdf",
//   },
//   {
//     name: "Organize PDF",
//     id: "organize pdf",
//     icon: "fa-th-list",
//     color: "text-primary",
//     description: "Reorder, delete, or add pages to your PDF file.",
//     link: "/organize-pdf",
//   },
//   {
//     name: "PDF Page Numbering",
//     id: "pdf page numbering",
//     icon: "fa-sort-numeric-up",
//     color: "text-success",
//     description: "Add or remove page numbers from PDFs.",
//     link: "/pdf-page-numbering",
//   },
//   {
//     name: "PDF Sign",
//     id: "pdf sign",
//     icon: "fa-signature",
//     color: "text-warning",
//     description: "Add electronic or digital signatures to PDFs.",
//     link: "/pdf-sign",
//   },
//   {
//     name: "Redact PDF",
//     id: "redact-pdf",
//     icon: "fa-user-secret",
//     color: "text-danger",
//     description: "Permanently remove or hide sensitive information in PDFs.",
//     link: "pdf-redaction",
//   },
//   {
//     name: "Images to PDF",
//     id: "images to pdf",
//     icon: "fa-image",
//     color: "text-success",
//     description: "Convert images into a single PDF document.",
//     link: "/images-to-pdf",
//     category: "Frequently Used",
//   },
//   {
//     name: "Word to PDF",
//     id: "word to pdf",
//     icon: "fa-file-word",
//     color: "text-primary",
//     description: "Convert Word documents (.doc, .docx) to PDF format.",
//     link: "/word-to-pdf",
//     category: "Frequently Used",
//   },
//   {
//     name: "PowerPoint to PDF",
//     id: "powerpoint to pdf",
//     icon: "fa-file-powerpoint",
//     color: "text-warning",
//     description: "Convert PowerPoint presentations (.ppt, .pptx) to PDF.",
//     link: "/powerpoint-to-pdf",
//     category: "Frequently Used",
//   },
//   {
//     name: "Excel to PDF",
//     id: "excel to pdf",
//     icon: "fa-file-excel",
//     color: "text-success",
//     description: "Convert Excel spreadsheets (.xls, .xlsx) to PDF format.",
//     link: "/excel-to-pdf",
//     category: "Frequently Used",
//   },
//   {
//     name: "HTML to PDF",
//     id: "HTML to pdf",
//     icon: "fa-html5",
//     color: "text-danger",
//     description: "Convert HTML file into a PDF document.",
//     link: "/html-to-pdf",
//     category: "Frequently Used",
//   },
//   {
//     name: "Text to PDF",
//     id: "text to pdf",
//     icon: "fa-file-alt",
//     color: "text-muted",
//     description: "Convert text files to PDF format.",
//     link: "/text-to-pdf",
//     category: "Frequently Used",
//   },

//   {
//     name: "PDF to images",
//     id: "pdf to images",
//     icon: "fa-image",
//     color: "text-success",
//     description: "Convert PDF files to image formats.",
//     link: "/pdf-to-images",
//     category: "Frequently Used",
//   },
//   {
//     name: "PDF to Word",
//     id: "pdf to word",
//     icon: "fa-file-word",
//     color: "text-primary",
//     description: "Convert PDF files to Word documents.",
//     link: "/pdf-to-word",
//     category: "Frequently Used",
//   },
//   {
//     name: "PDF to PowerPoint",
//     id: "pdf to powerpoint",
//     icon: "fa-file-powerpoint",
//     color: "text-warning",
//     description: "Convert PDF files to PowerPoint presentations.",
//     link: "/pdf-to-powerpoint",
//     category: "Frequently Used",
//   },
//   {
//     name: "PDF to Excel",
//     id: "pdf to excel",
//     icon: "fa-file-excel",
//     color: "text-success",
//     description: "Convert PDF files to Excel spreadsheets.",
//     link: "/pdf-to-excel",
//     category: "Frequently Used",
//   },
//   {
//     name: "PDF to Text",
//     id: "pdf to text",
//     icon: "fa-file-alt",
//     color: "text-muted",
//     description: "Extract text from PDF files.",
//     link: "/pdf-to-text",
//     category: "Frequently Used",
//   },
// ];

// async function insertToolsIfNotExists() {
//   for (const tool of toolsData) {
//     const exists = await Tool.exists({ id: tool.id });
//     if (!exists) {
//       await Tool.create(tool);
//       console.log(`✅ Inserted: ${tool.name}`);
//     } else {
//       console.log(`⚠️ Already exists: ${tool.name}`);
//     }
//   }
// }


// const toolsData = require("../data/toolData");

// const insertTools = async () => {
//   try {
//     await Tool.deleteMany(); // optional: clean existing data
//     const toolEntries = Object.entries(toolsData).map(([name, tool]) => ({
//       name,
//       ...tool,
//     }));
//     await Tool.insertMany(toolEntries);
//     console.log("✅ Tools inserted successfully");
//     process.exit();
//   } catch (error) {
//     console.error("❌ Error inserting tools:", error);
//     process.exit(1);
//   }
// };

// insertTools();


// module.exports ={db, insertToolsIfNotExists}; ;
module.exports ={db}; ;