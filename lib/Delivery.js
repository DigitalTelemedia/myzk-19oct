const axios = require('axios');
const readline = require('readline');
//0a5f0e5f7de81720078c8dd1d2d50774a7546b92

//const host = 'https://staging-express.delhivery.com/';
const host = 'https://track.delhivery.com/';
///const host = 'http://sandbox.delivery.com/';
const GUEST_TOKEN = 'Guest-Token';
const AUTH_TOKEN = 'Authorization';
//const CLIENT_ID = 'NDU1MWU1YjM4NzczMjljN2ZlNjFkODFkNDhlMjdkZGZk';
const CLIENT_ID = '48cbacfee8ad9e729f7bbbf5542f4d873a28c429';
const ORDER_TYPE = 'delivery';
const SEARCH_ADDRESS = '1330 1st Ave, 10021';
const ADDRESS_APT = 'Apt 123';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get Guest Token
async function getGuestToken(clientId) {
  try {
    const response = await axios.get(`${host}customer/auth/guest`, {
      params: { m: clientId }
    });
    return response.data['Guest-Token'];
  } catch (error) {
    console.error('Error getting guest token:', error);
  }
}

// Function to search for a merchant based on address
// async function search(address) {
//   try {
//     const response = await axios.get(`${host}merchant/search/delivery`, {
//       params: {
//         address: address,
//         client_id: CLIENT_ID
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error searching for merchant:', error);
//   }
// }

// // Function to get Access Token using authorization code
// async function getAccessToken(code, clientId, clientSecret, redirectURI) {
//   try {
//     const response = await axios.post('http://sandbox.delivery.com/api/third_party/access_token', {
//       client_id: clientId,
//       client_secret: clientSecret,
//       redirect_uri: redirectURI,
//       grant_type: 'authorization_code',
//       code: code
//     });
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error getting access token:', error);
//   }
// }

// // Function to view the cart of a merchant
// async function viewCart(guestToken, accessToken, merchantId, address) {
//   try {
//     const response = await axios.get(`${host}customer/cart/${merchantId}`, {
//       params: {
//         client_id: CLIENT_ID,
//         zip: address.zip_code,
//         city: address.city,
//         state: address.state,
//         latitude: address.latitude,
//         longitude: address.longitude
//       },
//       headers: {
//         [guestToken ? GUEST_TOKEN : AUTH_TOKEN]: guestToken || accessToken
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error viewing cart:', error);
//   }
// }

// // Function to create a new location for delivery
// async function createLocation(authToken, location, aptNum) {
//   try {
//     const response = await axios.post(`${host}customer/location`, {
//       street: location.street,
//       unit_number: aptNum,
//       city: location.city,
//       state: location.state,
//       zip_code: location.zip_code,
//       phone: '555-555-5555'
//     }, {
//       headers: {
//         [AUTH_TOKEN]: authToken
//       }
//     });
//     return response.data.location.location_id;
//   } catch (error) {
//     console.error('Error creating location:', error);
//   }
// }

// // Function to complete the checkout process
// async function checkout(authToken, tip, orderNotes, ccId, locationId, merchantId) {
//   try {
//     const response = await axios.post(`${host}customer/cart/checkout/${merchantId}/checkout`, {
//       instructions: orderNotes,
//       tip: tip,
//       location_id: locationId,
//       order_type: ORDER_TYPE,
//       payments: [
//         { type: 'credit_card', id: ccId }
//       ]
//     }, {
//       headers: {
//         [AUTH_TOKEN]: authToken
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error during checkout:', error);
//   }
// }

// // Helper function to extract merchant ID from the search results
// function getWasabiLobbyId(searchResults) {
//   // Assuming that the searchResults contains the merchants array.
//   return searchResults.merchants[0]?.merchant_id; // Adjust this based on actual API response
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// api 1  on pin code entered

async function fetchPinCodeData(clientId, pinCode) {
  try {
    const response = await axios.get(
      host+'c/api/pin-codes/json/?filter_codes='+pinCode,
      {
        headers: {
          Authorization: `Token ${clientId}`, // Correctly format the Authorization header
        },
      }
    );

    const data = response.data;
    //console.log("Response Data as JSON String:", JSON.stringify(data, null, 2));

    // Create an array to store status objects
    const statusArray = [];

    if (data && data.delivery_codes) {
      data.delivery_codes.forEach((deliveryCode) => {
        const postalCode = deliveryCode.postal_code;
        const remarks = postalCode.remarks;
        const isServiceable = remarks === "" || remarks.toLowerCase() !== "embargo";
        const isPrePaidAvailable = postalCode.pre_paid === "Y";
        const isPickupAvailable = postalCode.pickup === "N";
        const isReplAvailable = postalCode.repl === "Y";

        // Create a status object for each pincode
        const status = {
          postalCode: postalCode.pin,
          city: postalCode.city,
          serviceable: isServiceable,
          services: {
            prePaid: isPrePaidAvailable,
            pickup: isPickupAvailable,
            repl: isReplAvailable,
          },
        };

        // Push the status object into the statusArray
        statusArray.push(status);
      });
    } else {
      console.error('No delivery codes found in the response.');
    }

    // Return the status array
    return statusArray;

  } catch (error) {
    console.error('Error fetching data:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2)); // Ensure error response data is formatted
    } else {
      console.error('Error Details:', error); // In case error.response is undefined
    }
  }
}


// dont use
// Function to send a POST request to Delhivery API to create a client warehouse
async function createClientWarehouse(clientId) {
  try {
    // The API URL
    const url = host+'api/backend/clientwarehouse/create/';

    
    // The data payload to send with the request
    const data = {
      name: "Test",
      email: "a@gmail.com",
      phone: "9990714882",
      address: "test address",
      city: "Noida",
      country: "India",
      pin: "201303",
      return_address: "test address",
      return_pin: "201303",
      return_city: "Noida",
      return_state: "up",
      return_country: "India"
    };

    // Send the POST request to the Delhivery API
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${clientId}`,  // Authorization header with API token
      }
    });

    // Log the response data
    return response.data;

  } catch (error) {
    // Handle errors
    console.error('Error making the API request:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

 
// no use
async function fetchBulkWaybillData(clientId) {
  try {
    const url = host+'waybill/api/bulk/json/?count=1'; // API endpoint

    // Sending GET request to Delhivery API with clientId as the token
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${clientId}`, // Pass clientId as the token
      }
    });

    // Return status object if packages are not found
    if (response.data.packages_found === 0) {
      return {
        status: {
          code: 404,
          message: 'No packages found',
        },
        packages: [] // Empty packages array
      };
    }

    // If packages are found, return the data with a success status
    return {
      status: {
        code: 200,
        message: 'Packages found',
      },
      packages: response.data.packages, // Actual package data
    };

  } catch (error) {
    // Error handling: Return error status and message
    console.error('Error fetching data:', error.message);
    return {
      status: {
        code: 500,
        message: error.message || 'An unexpected error occurred',
      },
      packages: [], // Empty array in case of error
    };
  }
}

 // api 2 shipping charges calculation
async function fetchInvoiceCharges(clientId, params) {
  try {
    const url = host+'api/kinko/v1/invoice/charges/.json'; // API endpoint

    // Sending GET request to Delhivery API with clientId as the token and dynamic params
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${clientId}`, // Pass clientId as the token
      },
      params: params, // Use the input params dynamically
    });

    // Logging the response data

    // Return the response data along with a success status
    return {
      status: {
        code: 200,
        message: 'Invoice charges fetched successfully',
      },
      data: response.data, // Invoice charges data
    };

  } catch (error) {
    // Error handling: Return error status and message
    console.error('Error fetching data:', error.message);
    return {
      status: {
        code: 500,
        message: error.message || 'An unexpected error occurred',
      },
      data: null, // No data in case of error
    };
  }
}

const qs = require('querystring'); // For URL encoding



async function createShipment(token, data) {
  const url = 'https://track.delhivery.com/api/cmu/create.json';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded', // Ensure correct content type for URL-encoded payload
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  };

  // Ensure `format=json&data=` is prepended to the payload
  const payload = `format=json&data=${JSON.stringify(data)}`;

  try {
    const response = await axios.post(url, payload, { headers });
    
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {

    return {
      status: error.response ? error.response.status : 500,
      statusText: error.response ? error.response.statusText : 'Internal Server Error',
      error: error.response ? error.response.data : error.message,
    };
  }

}

// Example usage
const shipmentData = {
  shipments: [
    {
      name: 'test',
      add: 'noida',
      pin: '201301',
      city: 'noida',
      state: 'up',
      country: 'india',
      phone: '1234567890',
      order: '3432453nsdjfsj',
      payment_mode: 'Prepaid',
      return_pin: '',
      return_city: '',
      return_phone: '',
      return_add: '',
      return_state: '',
      return_country: '',
      products_desc: '',
      hsn_code: '',
      cod_amount: '',
      order_date: null,
      total_amount: '',
      seller_add: '',
      seller_name: '',
      seller_inv: '',
      quantity: '',
      waybill: '',
      shipment_width: '',
      shipment_height: '',
      weight: '',
      seller_gst_tin: '',
      shipping_mode: 'Surface',
      address_type: 'office',
    },
  ],
  pickup_location: {
    name: 'Test',
    add: 'test address',
    city: 'Noida',
    pin_code: 201303,
    country: 'India',
    phone: '9990714882',
  },
};





// Main function to execute the entire flow
async function main() {
  const clientSecret = 'OGpYvTZubYUUlqo2zkgwDbmr7sXGOK1UMCDXqFTE';
  const redirectURI = 'http://localhost';

  try {
  //  
  
// // Example usage
// const shipmentData = {
//   shipments: [
//     {
//       name: 'test',
//       add: 'noida',
//       pin: '201301',
//       city: 'noida',
//       state: 'up',
//       country: 'india',
//       phone: '1234567890',
//       order: 'fjdshfijebgu',
//       payment_mode: 'Prepaid',
//       return_pin: '',
//       return_city: '',
//       return_phone: '',
//       return_add: '',
//       return_state: '',
//       return_country: '',
//       products_desc: '',
//       hsn_code: '',
//       cod_amount: '',
//       order_date: null,
//       total_amount: '',
//       seller_add: '',
//       seller_name: '',
//       seller_inv: '',
//       quantity: '',
//       waybill: '',
//       shipment_width: '',
//       shipment_height: '',
//       weight: '',
//       seller_gst_tin: '',
//       shipping_mode: 'Surface',
//       address_type: 'office',
//     },
//   ],
//   pickup_location: {
//     name: 'Test',
//     add: 'test address',
//     city: 'Noida',
//     pin_code: 201303,
//     country: 'India',
//     phone: '9990714882',
//   },
// };


// api 3 create shipment after payment success  
(async () => {
  const statusCreateShipment = await createShipment(CLIENT_ID, shipmentData);
})();


  let status = await fetchPinCodeData(CLIENT_ID, '201303');
  //   console.log('*************************fetchPinCodeData status:', status);


  //   //let statusWareHouse = await createClientWarehouse(CLIENT_ID);   //Mostlike this we do not need to call this will create a WareHouse PickUp Location
  //   //console.log('*************************createClientWarehouse status:', statusWareHouse);

    
  //   let statusWayBill = await fetchBulkWaybillData(CLIENT_ID);
  //   console.log('*************************fetchBulkWaybillData status:', statusWayBill);


      
  // const params = {
  //   md: 'E',
  //   ss: 'Delivered',
  //   d_pin: '110067',
  //   o_pin: '201303',
  //   cgm: '50',
  //   pt: 'Pre-paid',
  //   cod: '0',
  // };

  // let statusInvoiceCharges = await fetchInvoiceCharges(CLIENT_ID, params);
  // console.log('*************************fetchInvoiceCharges status:', statusInvoiceCharges);

    // Step 1: Get Guest Token
    //const guestToken = await getGuestToken(CLIENT_ID);
    //console.log('Guest Token:', guestToken);

    // Step 2: Search for a Merchant
    // const searchResults = await search(SEARCH_ADDRESS);
    // const geoCodedLocation = searchResults.search_address;
    // console.log('My address was geocoded to:', geoCodedLocation);

    // // Step 3: Get Merchant ID
    // const merchantId = getWasabiLobbyId(searchResults);
    // console.log('Successfully found merchant with id:', merchantId);

    // // Step 4: Create Location
    // const locationId = await createLocation('authToken', geoCodedLocation, true, ADDRESS_APT);
    // console.log('Successfully created a location with id:', locationId);

    // // Step 5: Checkout Process
    // const ccId = 123; // Example CC ID (replace with actual CC ID)
    // const orderNotes = 'Please be nice to the doorman. He works so hard.';
    // const order = await checkout('authToken', 2.5, orderNotes, ccId, locationId, merchantId);
    // console.log('Just placed an order:', order);
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    rl.close();
  }
}

// Execute the main function
main();
