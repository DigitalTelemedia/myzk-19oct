"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ENDPOINT from "@/config/appConfig";
import axios from "axios";
import { bookShipment } from "@/utils/deliveryDtdc";

const Page = () => {
  const searchParams = useSearchParams();
  const transactionid = searchParams.get("transactionid");
  const [order, setOrder] = useState<any[]>([]);

  const updateCustomerOrderStatus = async (orderId: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`;
    // const url = `${ENDPOINT.BASE_URL}/api/orders`;
    const response = await axios.patch(url, {
      id: orderId,
      status: "payment received",
    });
  };
  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${transactionid}`
      );
      const data = await response.json();

      setOrder(data);
      return data
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  useEffect(() => {
    const processShipment = async () => {
      if (transactionid && transactionid?.length > 0) {
        updateCustomerOrderStatus(transactionid);
  
        try {
          const orderData = await fetchOrderData(); // Fetch order details
          console.log(orderData,"order");
          
          const destination = orderData; // Assume 'destination' is part of the response
  
          if (!destination) {
            console.error("Destination details not found in the order data.");
            return;
          }
  
          bookShipment({
            consignments: [
              {
                customer_code: "GL017",
                service_type_id: "B2C PRIORITY",
                load_type: "NON-DOCUMENT",
                consignment_type: "Forward",
                dimension_unit: "cm",
                length: "70.0",
                width: "70.0",
                height: "65.0",
                weight_unit: "kg",
                weight: "1.0",
                declared_value: destination.total,
                eway_bill: "",
                invoice_number: "",
                invoice_date: "",
                num_pieces: "1",
                origin_details: {
                  name: "MZYK",
                  phone: "9958039775",
                  alternate_phone: "9650745556",
                  address_line_1: "169, E Block, Sector 63, Noida, Uttar Pradesh 201301.",
                  address_line_2: "",
                  pincode: "201301",
                  city: "Noida",
                  state: "Uttar Pradesh",
                },
                destination_details: {
                  name: destination.name || "Unknown",
                  phone: destination.phone || "",
                  alternate_phone: destination.alternate_phone || "",
                  address_line_1: destination.adress || "",
                  address_line_2: destination.address_line_2 || "",
                  pincode: destination.postalCode || "",
                  city: destination.city || "",
                  state: destination.company || "New Delhi",
                },
                customer_reference_number: transactionid,
                cod_collection_mode: "",
                cod_amount: "",
                commodity_id: "2",
                description: "test order containing test product",
                reference_number: "",
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching order data or booking shipment:", error);
        }
      }
    };
  
    processShipment();
  }, [transactionid]);
  


  // useEffect(() => {
  //   if (transactionid && transactionid.length > 0) {
  //     updateCustomerOrderStatus(transactionid);
 
  //     fetchOrderData()
  //      const data = {
  //       "consignments": [
  //           {
  //               "customer_code": "GL017", //your DTDC code
  //               "service_type_id": "B2C PRIORITY", //service type for movement like Air & Surface
  //               "load_type": "NON-DOCUMENT", //everything is consider NON-DOCUMENT except letters, paper etc
  //               "consignment_type": "Forward", //type will be forward for normal movement and "reverse" for return
  //               "dimension_unit": "cm", //we accept dimensions in "cm" only
  //               "length": "70.0", 
  //               "width": "70.0",
  //               "height": "65.0",
  //               "weight_unit": "kg", //we accept weight in "kg" only
  //               "weight": "1.0",
  //               "declared_value": "5982.6", //invoice or shipment value
  //               "eway_bill": "", //in case of shipment where invoice value is above 50k
  //               "invoice_number": "", //optional
  //               "invoice_date": "", //optional
  //               "num_pieces": "1", //no of shipments or boxes
  //               "origin_details": {
  //                   "name": "TEST ENTERPRISES",
  //                   "phone": "9987456321",
  //                   "alternate_phone": "9987456321",
  //                   "address_line_1": "Upper Ground  Chandra Park  Old Palam Road  Kakrola  Delhi None",
  //                   "address_line_2": "",
  //                   "pincode": "110046",
  //                   "city": "New Delhi",
  //                   "state": "Delhi"
  //               },
  //               "destination_details": {
  //                   "name": "TEST",
  //                   "phone": "7894561230",
  //                   "alternate_phone": "",
  //                   "address_line_1": "3/658  pillayar nagar karattur Amani kondalampatti",
  //                   "address_line_2": "",
  //                   "pincode": "636010",
  //                   "city": "SALEM",
  //                   "state": "Tamil Nadu"
  //               },
  //               // "return_details": {
  //               //     "name": "test WH HO",
  //               //     "phone": "9876543121",
  //               //     "alternate_phone": "9557551556",
  //               //     "address_line_1": "D-13, First Floor, Sector-3, Noida, 201301",
  //               //     "address_line_2": "",
  //               //     "pincode": "201301",
  //               //     "city": "NOIDA",
  //               //     "state": "UTTAR PRADESH",
  //               //     "country": "India",
  //               //     "email": ""
  //               // },
  //               "customer_reference_number": "SO-GGN/22-23/0000121", //your order id
  //               "cod_collection_mode": "", //"CASH" in case of COD & blank for prepaid
  //               "cod_amount": "", //collectable amount
  //               "commodity_id": "2", // list attached : https://docs.google.com/spreadsheets/d/158LuKmF8mHXSQfXcSE-U_NVeUpz-O1LuNlc1ualKEeI/edit?gid=1685543408#gid=1685543408
  //               "description": "test order containing test product", //optional with 250 characters limit
  //               "reference_number": "" //AWB number
  //           }
  //       ]
  //   }
  //     bookShipment(data)
  //   }
  // }, [transactionid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {/* Success SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 4a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="text-2xl font-semibold text-gray-800 mt-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Your payment has been processed successfully.
          </p>
        </div>
        {transactionid && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-600">Transaction ID</h2>
            <p className="text-lg font-semibold text-gray-800">{transactionid}</p>
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
