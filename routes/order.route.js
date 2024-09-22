const express = require("express");
const { addOrders } = require("../controllers/order.controller");

const router = express.Router();

// Define the POST route to add orders
router.post("/add-orders", addOrders);

module.exports = router;
