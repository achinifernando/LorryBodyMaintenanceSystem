const express = require("express");
const router = express.Router();
const Quotation = require("../models/quotationModel");
const QuotationRequest = require("../models/quotationRequestModel");
const nodemailer = require("nodemailer");

router.post("/generate-quotation/:requestID", async (req, res) => {
  try {
    const { requestID } = req.params;
    const quotationData = req.body;

    // Fetch the request and client
    const request = await QuotationRequest.findById(requestID).populate("clientID");
    if (!request) {
      return res.status(404).json({ message: "Quotation request not found" });
    }

    const client = request.clientID;

    // Save quotation in DB
    const newQuotation = new Quotation({
      ...quotationData,
      requestId: request._id,
      clientID: client._id,
      email: client.email,
    });
    await newQuotation.save();

    // Nodemailer transporter (using Gmail App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // Gmail App Password (16 chars)
      },
    });

    // Send email with PDF if available
    if (quotationData.pdfBase64) {
      const pdfBuffer = Buffer.from(quotationData.pdfBase64, "base64");

      await transporter.sendMail({
        from: `"Nimal Engineering Works and Lorry Body Builders" <${process.env.EMAIL_USER}>`,
        to: client.email,
        subject: "Price Quotation",
        text: "Please find attached your requested quotation.",
        attachments: [{ filename: "Quotation.pdf", content: pdfBuffer }],
      });
    }

    res.json({
      message: "Quotation generated and email sent successfully!",
      client,
    });
  } catch (err) {
    console.error("Email Send Error:", err);
    res.status(500).json({
      message: "Error generating quotation",
      error: err.message,
    });
  }
});

module.exports = router;
