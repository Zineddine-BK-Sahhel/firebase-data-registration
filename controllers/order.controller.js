const { ordersSchema } = require("../validators/order.validator");
const { saveOrdersToFirebase } = require("../services/firebase.service");

// Controller to handle order saving
async function addOrders(req, res) {
  try {
    // Validate incoming request body with Zod
    const validation = ordersSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: validation.error.errors,
      });
    }

    const { orders } = validation.data; // Extract validated orders

    // Call the service function to save data to Firebase
    await saveOrdersToFirebase(orders);

    // Send a success response
    res.status(200).json({ message: "Orders added successfully!" });
  } catch (error) {
    console.error("Error saving orders:", error);
    res.status(500).json({ message: "Error saving orders" });
  }
}

module.exports = { addOrders };
