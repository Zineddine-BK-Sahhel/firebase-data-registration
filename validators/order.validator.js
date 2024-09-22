const z = require("zod");

// Define Zod schema for order validation
const orderSchema = z.object({
  order_id: z.string().uuid(),
  dm_uuid: z.string().uuid(),
  dm_fee: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "dm_fee must be a valid number as a string",
  }),
  rest_customer_distance: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "rest_customer_distance must be a valid number as a string",
  }),
  dm_rest_distance: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "dm_rest_distance must be a valid number as a string",
  }),
  customer_location: z
    .string()
    .refine((val) => val.split(",").length === 2, {
      message: "customer_location must be a valid lat,lng string",
    })
    .refine((val) => {
      const [lat, lng] = val.split(",");
      return !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
    }, "Invalid customer_location coordinates"),
  rest_location: z
    .string()
    .refine((val) => val.split(",").length === 2, {
      message: "rest_location must be a valid lat,lng string",
    })
    .refine((val) => {
      const [lat, lng] = val.split(",");
      return !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
    }, "Invalid rest_location coordinates"),
  payment: z.string({ required_error: "payment is required" }),
  dm_id: z.number().positive(),
});

// Schema for the whole request body
const ordersSchema = z.object({
  orders: z.array(orderSchema),
});

module.exports = { orderSchema, ordersSchema };
