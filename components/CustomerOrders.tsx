"use client";

// *********************
// Role of the component: Component that displays all orders on admin dashboard page
// Name of the component: CustomerOrders.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CustomerOrders />
// Input parameters: No input parameters
// Output: Table with all orders
// *********************

import React, { useEffect, useState } from "react";
import Link from "next/link";
// import ENDPOINT from "../config/appConfig";
import ENDPOINT from '@/config/appConfig';


import { useSession } from "next-auth/react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import toast from "react-hot-toast";
const CustomerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session }: any = useSession();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {

    const customer_id = session?.user?.id;

    const fetchOrders = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/email/${session?.user?.email}`;
      // const url = `${ENDPOINT.BASE_URL}/api/orders/email/${session?.user?.email}`;

      const response = await fetch(url);
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, [session?.user?.email]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOrderCancel = async (id: any) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/cancel/${id}`;
    // const url = `${ENDPOINT.BASE_URL}/api/orders/cancel/${id}`;
    const response = await axios.put(url);
    toast.success(response.data.message);


  };

  // const cencelOerder = async () => {
  //   await fetch(ENDPOINT.BASE_URL + "/api/orders", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: checkoutForm.name,
  //       lastname: checkoutForm.lastname,
  //       phone: checkoutForm.phone,
  //       email: checkoutForm.email,
  //       company: checkoutForm.company,
  //       adress: checkoutForm.adress,
  //       apartment: checkoutForm.apartment,
  //       postalCode: checkoutForm.postalCode,
  //       status: "processing",
  //       total: total,
  //       city: checkoutForm.city,
  //       country: checkoutForm.country,
  //       orderNotice: checkoutForm.orderNotice,
  //     }),
  //   });
  // };

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 ">
      <h1 className="text-3xl font-semibold text-center mb-5">All orders</h1>
      <div className="overflow-x-auto">
        <table className="table table-md table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Order ID</th>
              <th>Name and country</th>
              <th>Status</th>
              <th>Subtotal</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders &&
              orders.map((order) => (
                <tr key={order?.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>

                  <td>
                    <div>
                      <p className="font-bold">#{order?.id}</p>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-5">
                      <div>
                        <div className="font-bold">{order?.name}</div>
                        <div className="text-sm opacity-50">
                          {order?.country}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {/* <span className="badge badge-success text-white badge-sm">
                      {order?.status}...
                    </span> */}

                    <span
                      className={`badge text-white badge-sm ${
                        order?.status === "canceled"
                          ? "badge-danger" // Red for Canceled
                          : order?.status === "processing"
                          ? "badge-success" // Green for Processing
                          : order?.status === "delivered"
                          ? "badge-info" // Blue for Delivered
                          : "badge-secondary" // Default grey for other statuses
                      }`}
                    >
                      {order?.status}
                    </span>
                  </td>

                  <td>
                    <p>${order?.total}</p>
                  </td>

                  <td>
                    {new Date(Date.parse(order?.dateTime)).toDateString()}
                  </td>
                 {(order?.status == "processing")  &&  <th>
                    <Link
                      onClick={() => handleOrderCancel(order?.id)}
                      href={`/admin/orders/${order?.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      cancel
                    </Link>
                    {/* MUI Snackbar to show a popup message */}
                    {/* <Snackbar
                      open={openSnackbar}
                      autoHideDuration={3000} // Duration for the popup to stay visible (3 seconds)
                      onClose={handleCloseSnackbar}
                      message="Order cancelled successfully"
                    /> */}
                    {/* <Link
                      href={`/admin/orders/${order?.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      details
                    </Link> */}
                  </th>}
                </tr>
              ))}
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Name and country</th>
              <th>Status</th>
              <th>Subtotal</th>
              <th>Date</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
