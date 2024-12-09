// require('dotenv').config();
// // const { default: Email } = require('next-auth/providers/email');
// const nodemailer = require('nodemailer');

// // Configure the SMTP transporter

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "missnaziya24@gmail.com", // Use environment variable
//     pass: "mtjb ubjs ckyn jbal", // Use environment variable
//   },
// });

// // Send email function
// const sendEmail = async (from,to, subject, text) => {
//   console.log("test",from,to, subject, text);
  
//   try {
//     const info = await transporter.sendMail({
//       host,
//       from,
//       subject,
//       text,
//     });

//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email:', error.message); // More detailed error message
//   }
// };
// module.exports = { sendEmail };
// // Example usage
// // sendEmail(Email, 'Test Email', 'Hello from Node.js!');

const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter using environment variables for security
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'), // Use '587' or '465' based on your SMTP configuration
  secure: false, // For port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Function to send emails with dynamic details
async function sendEmail({ from = process.env.DEFAULT_EMAIL_SENDER, to, subject, text, html }) {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
}

module.exports = { sendEmail };
