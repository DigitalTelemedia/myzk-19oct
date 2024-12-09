"use client";
import { DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import ENDPOINT from "@/config/appConfig";

interface DashboardSupportTicketProps {
  params: { id: number };
}

const DashboardSupportTicketPage = ({
  params: { id },
}: DashboardSupportTicketProps) => {
  const [ticketInput, setTicketInput] = useState<{
    name: string;
    email: string;
    orderNumber: string;
    description: string;
  }>({
    name: "",
    email: "",
    orderNumber: "",
    description: "",
  });
  const router = useRouter();

  const deleteTicket = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support-ticket/${id}, requestOptions`)
    // fetch(`${ENDPOINT.BASE_URL}/api/support-ticket/${id}, requestOptions`)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Ticket deleted successfully");
          router.push("/admin/tickets");
        } else {
          throw Error("There was an error while deleting the ticket");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting the ticket");
      });
  };

  const addTicket = async () => {
    if (
      ticketInput.name.length > 0 &&
      ticketInput.email.length > 0 &&
      ticketInput.orderNumber.length > 0 &&
      ticketInput.description.length > 0
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ticketInput.name,
          email: ticketInput.email,
          orderNumber: ticketInput.orderNumber,
          description: ticketInput.description,
        }),
      };

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support-ticket, requestOptions`)
      // fetch(`${ENDPOINT.BASE_URL}/api/support-ticket, requestOptions`)
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw Error("Error while creating support ticket");
          }
        })
        .then((data) => toast.success("Ticket successfully created"))
        .catch((error) => {
          toast.error("There was an error while creating the ticket");
        });
    } else {
      toast.error("Please fill out all fields");
      return;
    }
  };

  useEffect(() => {
    // Fetching single ticket details
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support-ticket/${id}`)
    // fetch(`${ENDPOINT.BASE_URL}/api/support-ticket/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTicketInput({
          name: data?.name,
          email: data?.email,
          orderNumber: data?.orderNumber,
          description: data?.description,
        });
      });
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Support Ticket</h1>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={ticketInput.name}
              onChange={(e) =>
                setTicketInput({ ...ticketInput, name: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email:</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              value={ticketInput.email}
              onChange={(e) =>
                setTicketInput({ ...ticketInput, email: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Order Number:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={ticketInput.orderNumber}
              onChange={(e) =>
                setTicketInput({
                  ...ticketInput,
                  orderNumber: e.target.value,
                })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full max-w-xs"
              value={ticketInput.description}
              onChange={(e) =>
                setTicketInput({
                  ...ticketInput,
                  description: e.target.value,
                })
              }
            />
          </label>
        </div>

        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            className="uppercase bg-orange-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2"
            onClick={addTicket}
          >
            Add Ticket
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteTicket}
          >
            Delete Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupportTicketPage;
