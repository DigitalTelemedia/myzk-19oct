const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

 const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // From .env
                pass: process.env.EMAIL_PASS  // From .env (App Password)
            },
            tls: {
                rejectUnauthorized: false // Ignore self-signed certificate issues
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to, // Dynamically passed recipient
            subject, // Dynamically passed subject
            text, // Dynamically passed text
            html // Dynamically passed HTML content
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


module.exports = { sendEmail };
