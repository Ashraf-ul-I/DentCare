import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

async function testEmail() {
  console.log("Gmail user:", process.env.ADMIN_GMAIL);
  console.log("Gmail pass:", process.env.ADMIN_GMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_GMAIL,
      pass: process.env.ADMIN_GMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.ADMIN_GMAIL,
      to: "ashrafulai10159@gmail.com",
      subject: "Test Email",
      text: "Hello, this is a test!",
    });
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

testEmail();
