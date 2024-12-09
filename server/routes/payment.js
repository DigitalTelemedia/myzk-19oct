const express = require("express");
const router = express.Router();

const { makePayment } = require("../controllers/payment");

// POST route for payment
router.post("/makePayment", makePayment);

module.exports = router;
