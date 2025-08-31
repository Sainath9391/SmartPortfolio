const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST route for sending emails
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure transporter (Gmail example)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sainathpendalwar43@gmail.com",   // 👉 replace with your Gmail
        pass: "wdbx ohxk zltl ykyz"      // 👉 use Gmail App Password (not real password)
      }
    });

    // Define email options
    let mailOptions = {
      from: email,
      to: "sainathpendalwar43@gmail.com",       // 👉 where you receive messages
      subject: `📩 New message from ${name}`,
      text: `You got a new message:\n\n${message}\n\nFrom: ${name} (${email})`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: "❌ Failed to send message." });
  }
});

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
