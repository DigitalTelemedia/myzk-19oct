const express = require("express");
const router = express.Router();


// Import the contact form controller functions
const {
  createContactForm, // For submitting the contact form
  getContactForm, // For admin to get a specific form by ID
  getAllContactForms, // For admin to get all contact forms
  deleteContactForm, // For deleting a specific contact form
} = require("../controllers/contact");

// Route for creating a contact form and getting all forms (admin access)
router
  .route("/")
  .post(createContactForm) // Endpoint for submitting the contact form
  .get(getAllContactForms); // Endpoint for admin to get all forms
console.log("test");

// Route for retrieving, updating, or deleting a specific contact form by ID
router
  .route("/:id")
  .get(getContactForm) // Admin can retrieve a specific contact form by ID
  .delete(deleteContactForm); // Admin can delete a contact form by ID

module.exports = router;
