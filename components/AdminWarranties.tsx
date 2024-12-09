"use client";

// *********************
// Role of the component: Component that displays all warranties on admin dashboard page
// Name of the component: AdminOrders.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <AdminOrders />
// Input parameters: No input parameters
// Output: Table with all warranties
// *********************

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ENDPOINT from "../config/appConfig";
const AdminWarranties = () => {
  const [warranties, setWarranties] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/warranties");
      // const response = await fetch(ENDPOINT.BASE_URL + "/api/warranties");
      const data = await response.json();
      setWarranties(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 ">
      <h1 className="text-3xl font-semibold text-center mb-5">
        All Warranties
      </h1>
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
              <th>Warranty ID</th>
              <th>Product ID</th>
              <th>Issued At</th>
              <th>Expires At</th>
              {/* <th>Date</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {warranties &&
              warranties.map((warranty) => (
                <tr key={warranty?.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>

                  <td>
                    <div>
                      <p className="font-bold">#{warranty?.id}</p>
                    </div>
                  </td>
                  {/* <td>
                    <div className="flex items-center gap-5">
                      <div>
                        <div className="font-bold">{warranty?.name}</div>
                        <div className="text-sm opacity-50">{warranty?.country}</div>
                      </div>
                    </div>
                  </td> */}

                  <td>
                    <span className="badge badge-success text-white badge-sm">
                      {warranty?.productId}
                    </span>
                  </td>

                  <td>
                    <p>
                    {new Date(Date.parse(warranty?.issuedAt as any)).toDateString()}
                         {/* {warranty?.issuedAt} */}
                         </p>
                  </td>

                  <td>
                    {new Date(Date.parse(warranty?.expiresAt as any)).toDateString()}
                  </td>
                  <th>
                    {/* <Link
                      href={`/admin/warranties/${warranty?.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      details
                    </Link> */}
                  </th>
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

export default AdminWarranties;
