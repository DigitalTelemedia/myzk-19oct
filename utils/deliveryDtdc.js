const axios = require("axios");
const crypto = require("crypto");
const { default: Router } = require("next/router");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

//  const checkPostalCodeService = async (orgPincode, desPincode) =>  {
//   const url = "http://smarttrack.ctbsplus.dtdc.com/ratecalapi/PincodeApiCall";
//   const headers = {
//     "Content-Type": "application/json",
//     Cookie: 'GCLB="ce916d3ca633f33a"', // Replace with valid cookie if required
//   };

//   const data = {
//     orgPincode,
//     desPincode,
//   };

//   try {
//     const response = await axios.post(url, data);
//     console.log("Response data:", response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error("API Error:", error.response.status, error.response.data);
//     } else {
//       console.error("Network Error:", error.message);
//     }
//   }


// };

// module.exports = { checkPostalCodeService };

const makePayment = async (mobile, total, orderId) => {
  

 
try {
  const transactionId = orderId;
  const payload = {
    merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: "MUID-" + uuidv4().slice(-6),
    amount: total,
    redirectUrl: `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/api/status/${transactionId}`,
    redirectMode: "POST",
    callbackUrl: `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/api/status/${transactionId}`,
    mobileNumber: mobile,
    paymentInstrument: { type: "PAY_PAGE" },
  };

  // Encode payload as Base64
  const dataPayload = JSON.stringify(payload);
  const dataBase64 = Buffer.from(dataPayload).toString("base64");

  // Generate checksum
  const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = crypto.createHash("sha256").update(fullURL).digest("hex");
  const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_SALT_INDEX}`;

  // Define API URL
  const UAT_PAY_API_URL = `${process.env.NEXT_PUBLIC_PAYMENT_BASE_URL}/pg/v1/pay`;



  // Make API request
  const response = await axios.post(
    UAT_PAY_API_URL,
    { request: dataBase64 },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
    }
  );

  // Handle the redirect URL from the API response
  const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

      Router.push(redirectUrl);
} catch (error) {
  
  console.error("Payment error:", error.response?.data || error.message);
  if (error.response) {
    console.log("Error Response Status:", error.response.status);
  }
}
};

 const checkPostalCodeService = async (orgPincode, desPincode) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery/verify-pincode`; // URL to your backend API

  const data = {
    orgPincode,
    desPincode,
  };

  try {
    const response = await axios.post(url, data);
    return response.data; // Return the response data to the caller
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error verifying pincode");
    }
    throw new Error("Network error");
  }
};


const bookShipment = async (data) => {
  console.log("bookShipment",bookShipment);
  
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery/book-shipment`; // Your backend URL

 

  const headers = {
    'api-key': 'b01ed3562b088ab9c52822e3c18f9e',
    'Content-Type': 'application/json',
  };

  try {
    // Send request to the backend API
    const response = await axios.post(url, data, { headers });

    // Handle success response
    console.log('Response from backend:', response.data);

    // Handle the response on the frontend (e.g., update state or show message)
  } catch (error) {
    console.error('Error sending consignment data:', error.message);
  }
};
// makePayment("2423432","222","sfdsfdg")

module.exports = { checkPostalCodeService, bookShipment };

// checkPostalCodeService("110025","110013")


