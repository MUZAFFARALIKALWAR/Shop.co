// schemas/orders.js (Updated with reference to shippingForm)
import { defineType } from "sanity";

export default defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "shippingForm",
      title: "Shipping Form",
      type: "reference",  // Reference type
      to: [{ type:"shippingForm" }], // Reference to the shippingForm schema
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Product Name",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "qty",
              title: "Quantity",
              type: "number",
            },
           
          ],
        },
      ],
    },
  ],
});
