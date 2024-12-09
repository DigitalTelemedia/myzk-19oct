
"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import ENDPOINT from "../../../../config/appConfig";
import ENDPOINT from '@/config/appConfig';


interface SupportTicket {
  id: number;
  name: string;
  email: string;
  orderNumber: string;
  description: string;
}

const DashboardSupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    // Fetching all support tickets
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/support-ticket")
    // fetch(ENDPOINT.BASE_URL + "/api/support-ticket")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTickets(data);
      });
  }, []);


  // Function to delete a support ticket
  const deleteTicket = async (id: number) => {
    const requestOptions = {
      method: "DELETE",
    };

    // Call the API to delete the ticket
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support-ticket/${id}, requestOptions`)
    // fetch(`${ENDPOINT.BASE_URL}/api/support-ticket/${id}, requestOptions`)
      .then((response) => {
        if (response.status === 200) {
          // Filter out the deleted ticket from the state
          setTickets(tickets.filter((ticket) => ticket.id !== id));
          toast.success("Ticket deleted successfully");
        } else {
          throw new Error("Error deleting ticket");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting the ticket");
        console.error(error);
      });
  };

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center mb-5">All Support Tickets</h1>
        {/* <div className="flex justify-end mb-5">
           <Link href="/admin/support-ticket/new">
            <CustomButton
              buttonType="button"
              customWidth="160px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add new ticket"
            />
          </Link>
        </div> */}
        <div className="xl:ml-5 w-full max-xl:mt-5 overflow-auto w-full h-[80vh]">
          <table className="table table-md table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Order Number</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {tickets &&
                tickets.map((ticket) => (
                  <tr key={nanoid()}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>

                    <td>
                      <div className="flex items-center gap-3">
                        <p>{ticket?.name}</p>
                      </div>
                    </td>
                    <td>
                      <p>{ticket?.email}</p>
                    </td>
                    <td>
                      <p>{ticket?.orderNumber}</p>
                    </td>
                    <td>
                      <p>{ticket?.description}</p>
                    </td>
                    <th>
                      <button
                        onClick={() => deleteTicket(ticket.id)}
                        className="btn btn-ghost btn-xs text-red-500"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Order Number</th>
                <th>Description</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupportTickets;