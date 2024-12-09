// warrantyController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all warranties
const getAllWarranties = async (req, res) => {
  try {
    const warranties = await prisma.warranty.findMany({
      include: {
        customerOrder: true,
        product: true,
      },
    });
    res.status(200).json(warranties);
  } catch (error) {
    console.error('Error fetching warranties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single warranty by ID
const getWarranty = async (req, res) => {
  const { id } = req.params;
  try {
    const warranty = await prisma.warranty.findUnique({
      where: { id },
      include: {
        customerOrder: true,
        product: true,
      },
    });
    if (!warranty) {
      return res.status(404).json({ error: 'Warranty not found' });
    }
    res.status(200).json(warranty);
  } catch (error) {
    console.error('Error fetching warranty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new warranty
const createWarranty = async (req, res) => {

  const { email, orderNumber } = req.body;

  if (!email || !orderNumber) {
    return res.status(400).json({ error: 'Email and Order Number are required.' });
  }

  try {
    // Find the customer order by ID and email to ensure ownership
    const customerOrder = await prisma.customer_order.findFirst({
      where: {
        id: orderNumber,
        email: email,
      },
      include: { 
        products: { 
          include: { product: true },
        },
        Warranties: true,
      },
    });

    if (!customerOrder) {
      return res.status(400).json({ error: 'Order number does not exist or does not belong to the provided email.' });
    }

    // Check if warranties have already been issued for this order
    if (customerOrder.Warranties && customerOrder.Warranties.length > 0) {
      return res.status(400).json({ error: 'Warranties have already been issued for this order.' });
    }

    // Prepare warranty data
    const warrantiesToCreate = [];

    // fix for warranty should be from back date   (task )
    const currentDate = new Date();

    for (const orderProduct of customerOrder.products) {
      const product = orderProduct.product;
      
      if (product.warrantyDuration && product.warrantyDuration > 0) {
          //   currentDate= orderProduct.Date
        const expiresAt = new Date(currentDate);
        expiresAt.setMonth(expiresAt.getMonth() + product.warrantyDuration);

        // Check if a warranty already exists for this product in this order
        const existingWarranty = await prisma.warranty.findFirst({
          where: {
            customerOrderId: customerOrder.id,
            productId: product.id,
          },
        });

        if (existingWarranty) {
          console.log(`Warranty already exists for product ${product.id} in order ${customerOrder.id}. Skipping.`);
          continue;
        }
// found product id matching order id for which warranty has not been issued
        warrantiesToCreate.push({
          customerOrderId: customerOrder.id,
          productId: product.id,
          issuedAt: currentDate,
          expiresAt: expiresAt,
        });
      }
    }

    if (warrantiesToCreate.length === 0) {
      console.log("No warranties to create.");
      return res.status(400).json({ error: 'No warranties available for the products in this order.' });
    }

    // Create warranties in a transaction for atomicity
    const createdWarranties = await prisma.$transaction(
      warrantiesToCreate.map((warranty) => prisma.warranty.create({ data: warranty }))
    );

    res.status(201).json({ message: 'Warranties issued successfully.', warranties: createdWarranties });
  } catch (error) {
    console.error('Error creating warranties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

// Update an existing warranty
const updateWarranty = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Prevent updating certain fields
  const { customerOrderId, productId, issuedAt, ...safeData } = updateData;

  try {
    const existingWarranty = await prisma.warranty.findUnique({ where: { id } });
    if (!existingWarranty) {
      return res.status(404).json({ error: 'Warranty not found' });
    }

    const updatedWarranty = await prisma.warranty.update({
      where: { id },
      data: safeData,
    });

    res.status(200).json(updatedWarranty);
  } catch (error) {
    console.error('Error updating warranty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a warranty
const deleteWarranty = async (req, res) => {
  const { id } = req.params;

  try {
    const existingWarranty = await prisma.warranty.findUnique({ where: { id } });
    if (!existingWarranty) {
      return res.status(404).json({ error: 'Warranty not found' });
    }

    await prisma.warranty.delete({ where: { id } });

    res.status(200).json({ message: 'Warranty deleted successfully.' });
  } catch (error) {
    console.error('Error deleting warranty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get warranties by Order Number
const getWarrantyByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const warranties = await prisma.warranty.findMany({
      where: { customerOrderId: orderNumber },
      include: {
        customerOrder: true,
        product: true,
      },
    });

    if (warranties.length === 0) {
      return res.status(404).json({ error: 'No warranties found for this order number.' });
    }

    res.status(200).json(warranties);
  } catch (error) {
    console.error('Error fetching warranties by order number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllWarranties,
  getWarranty,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  getWarrantyByOrderNumber,
};
