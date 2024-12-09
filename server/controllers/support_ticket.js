const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllSupportTickets(request, response) {
  try {
    const supportTickets = await prisma.supportTicket.findMany();
    return response.json(supportTickets);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching support tickets" });
  }
}
async function deleteSupportTicketsByTicketId(request, response) {
  const { ticketId } = request.params;

  try {
    // Getting all support tickets by userId
    const supportTickets = await prisma.supportTicket.deleteMany({
      where: {
        id: ticketId,
      },
    });
    return response.json(supportTickets);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching support tickets by user" });
  }
}

async function getAllSupportTicketsByUserId(request, response) {
  const { userId } = request.params;
  try {
    // Getting all support tickets by userId
    const supportTickets = await prisma.supportTicket.findMany({
      where: {
        userId: userId,
      },
    });
    return response.json(supportTickets);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching support tickets by user" });
  }
}

async function createSupportTicket(request, response) {
  try {
    const { name, email, orderNumber, description } = request.body;

    // Optionally, you can add logic to check if the orderNumber is valid in the customer_order table.

    const supportTicket = await prisma.supportTicket.create({
      data: {
        name,
        email,
        orderNumber,
        description,
      },
    });

    return response.status(201).json(supportTicket);
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return response.status(500).json({ error: "Error creating support ticket" });
  }
}

async function deleteSupportTicket(request, response) {
  try {
    const { userId, ticketId } = request.params;

    await prisma.supportTicket.deleteMany({
      where: {
        id: ticketId,
        userId: userId,
      },
    });

    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting support ticket" });
  }
}

async function getSingleSupportTicket(request, response) {
  try {
    const { userId, ticketId } = request.params;

    const supportTicket = await prisma.supportTicket.findMany({
      where: {
        id: ticketId,
        userId: userId,
      },
    });

    return response.status(200).json(supportTicket);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error fetching support ticket" });
  }
}

module.exports = {
  getAllSupportTickets,
  getAllSupportTicketsByUserId,
  createSupportTicket,
  deleteSupportTicketsByTicketId,
  deleteSupportTicket,
  getSingleSupportTicket,
};