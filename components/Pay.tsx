"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface PayProps {
  name: string;
  amount: number;
  mobile: string;
}

interface PaymentPayload {
  merchantId: string;
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber: string;
  paymentInstrument: {
    type: string;
  };
}

const Pay: React.FC<PayProps> = ({ name, amount, mobile }) => {
  const router = useRouter();

  const [data, setData] = useState<PayProps | null>(null);

  const handleFormData = () => {
    const updatedData = { name, amount, mobile };
    setData(updatedData);
  };

  const makePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const transactionId = "Tr-" + uuidv4().toString(36).slice(-6);
    const transactionId = "Tr-" + uuidv4().slice(-6);
//transaction id will be order id for us
    const payload: PaymentPayload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID || '',
      merchantTransactionId: transactionId,
      // merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
      merchantUserId: 'MUID-' + uuidv4().slice(-6),
      amount: 10000,
      redirectUrl: `https://myzk.in/api/status/${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `https://myzk.in/api/status/${transactionId}`,
      mobileNumber: '9999999999',
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");

    const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);
    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
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

      const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
      router.push(redirectUrl);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
<></>
  );
};

export default Pay;
