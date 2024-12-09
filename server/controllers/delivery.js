const axios = require('axios');
require('dotenv').config();

const DELIVERY_PINCODE_VERIFY_URL="http://smarttrack.ctbsplus.dtdc.com/ratecalapi/PincodeApiCall"
const DELIVERY_BOOK_SHIPMENT_URL="https://demodashboardapi.shipsy.in/api/customer/integration/consignment/softdata"

const verifyPincode = async (req, res) => {
  
  const { orgPincode, desPincode } = req.body;

  const url = DELIVERY_PINCODE_VERIFY_URL;
  const headers = {
    "Content-Type": "application/json",
    Cookie: 'GCLB="ce916d3ca633f33a"', // Replace with a valid cookie if required
  };


  try {
    const response = await axios.post(url, { orgPincode, desPincode }, { headers });
    
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data || "Error verifying pincode" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};


const bookShipment = async(req, res) => {
  console.log()
  const { consignments } = req.body; // The data sent from the frontend

  const url = DELIVERY_BOOK_SHIPMENT_URL
   const headers = {
    'api-key': 'b01ed3562b088ab9c52822e3c18f9e',
    'Content-Type': 'application/json',
  };

  const data = {
    consignments: consignments, // Consignment data from the frontend
  };

  try {
    // Send data to external API
    const response = await axios.post(url, data, { headers });
    
    // Send the external API's response back to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in backend:', error.message);
    res.status(500).json({ error: error.message });
  }
}
module.exports = { verifyPincode,bookShipment };
