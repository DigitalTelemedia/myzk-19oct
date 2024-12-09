const express = require('express');

const router = express.Router();


const {
  getAllWarranties,
  getWarranty,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  getWarrantyByOrderNumber,
} = require('../controllers/warranties');

// Route to get all warranties and create a new warranty
router.route('/')
  .get(getAllWarranties)
  .post(createWarranty);

// Route to get, update, or delete a warranty by ID
router.route('/:id')
  .get(getWarranty)
  .put(updateWarranty)
  .delete(deleteWarranty);

// Route to get warranties by Order Number
router.route('/order/:orderNumber')
  .get(getWarrantyByOrderNumber);

module.exports = router;
