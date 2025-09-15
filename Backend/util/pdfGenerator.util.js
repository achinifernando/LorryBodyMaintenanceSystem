// const { jsPDF } = require("jspdf");
// require("jspdf-autotable");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// /**
//  * Generates a PDF for a quotation based on the provided data.
//  * @param {Object} data - The quotation data
//  * @returns {Buffer} - PDF as Buffer
//  */
// const generatePDF = async (data) => {
//   const doc = new jsPDF();

//   // Choose template (currently only one template for quotations)
//   return generateQuotationTemplate(doc, data);
// };

// /**
//  * Template for quotation PDF
//  * @param {jsPDF} doc 
//  * @param {Object} data 
//  * @returns {Buffer}
//  */
// const generateQuotationTemplate = (doc, data) => {
//   // === Title ===
//   doc.setFontSize(20);
//   doc.setTextColor(51, 102, 204);
//   doc.text("Price Quotation", 105, 30, { align: "center" });

//   // === Logo ===
//   if (process.env.COMPANY_LOGO) {
//     const logoPath = path.join(__dirname, `../assets/${process.env.COMPANY_LOGO}`);
//     if (fs.existsSync(logoPath)) {
//       const logoBytes = fs.readFileSync(logoPath);
//       const logoBase64 = `data:image/png;base64,${logoBytes.toString("base64")}`;
//       doc.addImage(logoBase64, "PNG", 10, 40, 40, 40);
//     }
//   }

//   // === Company Info ===
//   doc.setFontSize(12);
//   doc.setTextColor(0, 0, 0);
//   let y = 90;

//   const companyLines = [
//     process.env.COMPANY_NAME,
//     process.env.COMPANY_ADDRESS,
//     `Phone: ${process.env.COMPANY_PHONE}`,
//     `Email: ${process.env.COMPANY_EMAIL}`,
//   ];

//   companyLines.forEach((line) => {
//     if (line) {
//       doc.text(line, 20, y);
//       y += 8;
//     }
//   });

//   // === Client Info ===
//   y += 4;
//   const clientInfo = [
//     `Client Name: ${data.clientName || ""}`,
//     `Request ID: ${data.requestID || ""}`,
//     `Quotation ID: ${data.quotationID || ""}`,
//   ];
//   clientInfo.forEach((line) => {
//     doc.text(line, 20, y);
//     y += 8;
//   });

//   // === Quotation Details Table ===
//   const tableHeader = [
//     "Lorry Category",
//     "Lorry Type",
//     "Lorry Model",
//     "Quantity",
//     "Unit Price",
//     "Total Price",
//   ];
//   const tableData = [
//     [
//       data.lorryCategory || "",
//       data.lorryType || "",
//       data.lorryModel || "",
//       data.quantity || "",
//       data.unitPrice || "",
//       data.totalPrice || "",
//     ],
//   ];

//   doc.autoTable({
//     startY: y + 10,
//     head: [tableHeader],
//     body: tableData,
//     theme: "grid",
//     headStyles: {
//       fillColor: [51, 102, 204],
//       textColor: [255, 255, 255],
//       fontStyle: "bold",
//     },
//     styles: { fontSize: 12, cellPadding: 4 },
//   });

//   // === Remarks ===
//   const finalY = doc.lastAutoTable.finalY || y + 40;
//   if (data.remarks) {
//     doc.setFontSize(12);
//     doc.text(`Remarks: ${data.remarks}`, 20, finalY + 10);
//   }

//   return createPDFBuffer(doc);
// };

// /**
//  * Converts jsPDF document to Buffer
//  * @param {jsPDF} doc 
//  * @returns {Buffer}
//  */
// const createPDFBuffer = (doc) => {
//   const pdfBytes = doc.output("arraybuffer");
//   return Buffer.from(pdfBytes);
// };

// module.exports = { generatePDF };
