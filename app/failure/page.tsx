"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useProductStore } from "../_zustand/store";
import ENDPOINT from "@/config/appConfig";
import axios from "axios";

const Page = () => {
  const searchParams = useSearchParams();
  const transactionid = searchParams.get("transactionid");
  const { products, clearCart } = useProductStore();

  const deleteCustomerOrder = async (orderId: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`;
    // const url = `${ENDPOINT.BASE_URL}/api/order`;
    const response = await axios.delete(url, {
      params: {
        id: orderId,
      },
    });
  };
  const deleteProductOrder = async (orderId: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/order-product?id=${orderId}`;
      // const url = `${ENDPOINT.BASE_URL}/api/order-product?id=${orderId}`;
      const response = await axios.delete(url);
    } catch (error) {
      console.error("Error adding order product:", error);
    }
  };

  useEffect(() => {
    if (transactionid) {
      console.log(
        "trying to delete customer order for transaction id" + transactionid
      );

      deleteCustomerOrder(transactionid);
      deleteProductOrder(transactionid);
      // clearCart(); // Clear the cart once the order is recorded
    }
  }, [transactionid]);

  return (
    <div className="flex justify-center items-center text-center">
      Your payment has been failed. Transaction ID: {transactionid}
    </div>
  );
};

export default Page;
