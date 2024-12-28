const { PrismaClient } = require('@prisma/client');
const { sendEmail } = require('../utills/email');
const prisma = new PrismaClient();

// Create a contact form submission
exports.createContactForm = async (req, res) => {

  try {
    const { name, email, message, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Send an email notification
    const to = "missnaziya24@gmail.com";
    await sendEmail({
      // from: to,         // Customer email
      to: to,              // Admin email
      subject: subject,    // Email subject
      text: message ,   // Email body
      html:   `<html>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; padding: 20px;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <h1 style="color: #333333;">Contact Submission from Myzk</h1>
              <p style="font-size: 16px; color: #555555;">You have a new message from a customer!</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; font-size: 16px; color: #333333;">
              <p><strong>Customer Name:</strong> ${name}</p>
              <p><strong>Email Address:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #555555;">${message}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center;">
              <a href="https://myzk.in" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Visit Myzk Site</a>
            </td>
          </tr>
        </table>
      </body>
    </html>`
    });

    // Create new contact form entry using Prisma
    const newContactForm = await prisma.contact.create({
      data: { name, email, message, subject }
    });

    return res.status(201).json({
      message: 'Thank you for contacting us! We will get back to you shortly.',
      data: newContactForm
    });
  } catch (error) {
    console.error("Error submitting contact form:", error.message);
    return res.status(500).json({
      message: 'Error submitting the contact form',
      error: error.message
    });
  }
};

// Get all contact form submissions (Admin only)
exports.getAllContactForms = async (req, res) => {
  try {
    const contactForms = await prisma.contact.findMany();
    return res.status(200).json({
      message: 'All contact forms retrieved successfully',
      data: contactForms
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching contact forms',
      error: error.message
    });
  }
};

// Get a specific contact form by ID (Admin only)
exports.getContactForm = async (req, res) => {
  try {
    const contactFormId = parseInt(req.params.id);
    const contactForm = await prisma.contactForm.findUnique({
      where: {
        id: contactFormId
      }
    });

    if (!contactForm) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    return res.status(200).json({
      message: 'Contact form retrieved successfully',
      data: contactForm
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching contact form',
      error: error.message
    });
  }
};

// Delete a specific contact form by ID (Admin only)
exports.deleteContactForm = async (req, res) => {
  try {
    const contactFormId = parseInt(req.params.id);
    const contactForm = await prisma.contactForm.findUnique({
      where: {
        id: contactFormId
      }
    });

    if (!contactForm) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    await prisma.contactForm.delete({
      where: {
        id: contactFormId
      }
    });

    return res.status(200).json({
      message: 'Contact form deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting contact form',
      error: error.message
    });
  }
};
