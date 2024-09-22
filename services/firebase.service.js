const { database } = require("../config/firebase.config");

// Helper function to parse and transform data for Firebase
async function saveOrdersToFirebase(orders) {
  const transformedOrders = {};

  orders.forEach((order, index) => {
    const deliveryManKey = `delivery_man_id_${order.dm_id}`;
    const orderKey = `count - ${index + 1}`; // Unique key for each order count

    // Prepare the order data structure
    const orderData = {
      customer_location: {
        lat: parseFloat(order.customer_location.split(",")[0]),
        lng: parseFloat(order.customer_location.split(",")[1]),
      },
      rest_location: {
        lat: parseFloat(order.rest_location.split(",")[0]),
        lng: parseFloat(order.rest_location.split(",")[1]),
      },
      delivery_man_id: deliveryManKey,
      dm_fee: parseFloat(order.dm_fee),
      dm_rest_distance: parseFloat(order.dm_rest_distance),
      rest_customer_distance: parseFloat(order.rest_customer_distance),
      payment: order.payment,
      id: order.order_id,
    };

    // Merge the order data into the transformedOrders object
    if (!transformedOrders[deliveryManKey]) {
      transformedOrders[deliveryManKey] = {};
    }

    transformedOrders[deliveryManKey][orderKey] = orderData;
  });

  // Save the transformed data to Firebase under the "orders" collection
  const ordersRef = database.ref("orders");
  await ordersRef.set(transformedOrders);
}

module.exports = { saveOrdersToFirebase };
