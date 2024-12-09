const axios = require("axios");

/**
 * Handles payment processing by interacting with the backend API.
 * @param {string} mobile - The mobile number of the user.
 * @param {number} total - The total payment amount.
 * @param {string} orderId - The unique order identifier.
 */
const makePayment = async (mobile, total, orderId) => {
  
  try {
    // const response = await axios.post(`http://localhost:3001/api/payment/makePayment`, {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/makePayment`, {
      mobile,
      total,
      orderId,
    });

    const { redirectUrl } = response.data;

    if (redirectUrl) {
      console.log("Redirecting to payment page:", redirectUrl);
      window.location.href = redirectUrl; // Redirect to the payment page
    } else {
      console.error("Failed to retrieve redirect URL.");
      alert("Failed to initiate the payment. Please try again.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data || "An error occurred during payment processing.";
    console.error("Payment Error:", errorMessage);
    alert("Unable to complete the payment. Please try again later.");
  }
};

module.exports = { makePayment };



// const axios = require("axios");
// const crypto = require("crypto");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const makePayment = async (mobile, total, orderId) => {
//     console.log("hello naziya.....");
    
  
//     console.log("NEXT_PUBLIC_PAYMENT_BASE_URL", process.env.NEXT_PUBLIC_PAYMENT_BASE_URL);
//     console.log("NEXT_PUBLIC_MERCHANT_ID", process.env.NEXT_PUBLIC_MERCHANT_ID);
//     console.log("NEXT_PUBLIC_PAYMENT_REDIRECT_URL", process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL);
//     console.log("NEXT_PUBLIC_SALT_KEY", process.env.NEXT_PUBLIC_SALT_KEY);
//     console.log("NEXT_PUBLIC_SALT_INDEX", process.env.NEXT_PUBLIC_SALT_INDEX);
    
//   try {
//     const transactionId = orderId;
//     const payload = {
//       merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
//       merchantTransactionId: transactionId,
//       merchantUserId: "MUID-" + uuidv4().slice(-6),
//       amount: total,
//       redirectUrl: `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/api/status/${transactionId}`,
//       redirectMode: "POST",
//       callbackUrl: `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/api/status/${transactionId}`,
//       mobileNumber: mobile,
//       paymentInstrument: { type: "PAY_PAGE" },
//     };
  
//     // Encode payload as Base64
//     const dataPayload = JSON.stringify(payload);
//     const dataBase64 = Buffer.from(dataPayload).toString("base64");
  
//     // Generate checksum
//     const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
//     const dataSha256 = crypto.createHash("sha256").update(fullURL).digest("hex");
//     const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_SALT_INDEX}`;
  
//     // Define API URL
//     const UAT_PAY_API_URL = `${process.env.NEXT_PUBLIC_PAYMENT_BASE_URL}/pg/v1/pay`;
  
//     console.log("Making Payment Request to URL:", UAT_PAY_API_URL);
//     console.log("Payload Data:", dataBase64);
//     console.log("Generated Checksum:", checksum);
  
//     // Make API request
//     const response = await axios.post(
//       UAT_PAY_API_URL,
//       { request: dataBase64 },
//       {
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//           "X-VERIFY": checksum,
//         },
//       }
//     );
  
//     // Handle the redirect URL from the API response
//     const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
  
//         // router.push(redirectUrl);
//        // Perform the redirection if the URL is valid
//        if (redirectUrl) {
//         window.location.href = redirectUrl; // Redirect the user to the payment page
//       }
//     console.log("Redirect URL:", redirectUrl);
//   } catch (error) {
//     // console.log("Error",error);
    
//     console.error("Payment error:", error.response?.data || error.message);
//     if (error.response) {
//       console.log("Error Response Status:", error.response.status);
//     //   console.log("Error Response Headers:", error.response.headers);
//     }
//   }
//   };

// // Test the function
// const mobile = "9123456789";
// const total = 30400;
// const orderId = "ORD-jehwifsgdj" ;
// // const orderId = "ORD-" + uuidv4().slice(-8);
// makePayment(mobile,total,orderId)

// module.exports = { makePayment  };

