// const express = require("express");
// const { google } = require("googleapis");


// const router = express.Router();

// // const oauth2Client = new google.auth.OAuth2(
// //   process.env.CLIENT_ID,
// //   process.env.CLIENT_SECRET,
// //   process.env.REDIRECT_URL
// // );

// // const scopes = ["https://www.googleapis.com/auth/calendar"];

// // router.get("/google", (req, res) => {
// //   const url = oauth2Client.generateAuthUrl({
// //     access_type: "offline",
// //     scope: scopes,
// //     prompt: "consent",
// //   });
// //   res.redirect(url);
// // });

// // router.get("/google/redirect", async (req, res) => {
// //   const code = req.query.code;
// //   if (!code) return res.status(400).send("No code found");

// //   try {
// //     const { tokens } = await oauth2Client.getToken(code);
// //     oauth2Client.setCredentials(tokens);

// //     res.json({ message: "Google OAuth success", tokens });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// module.exports = router;
