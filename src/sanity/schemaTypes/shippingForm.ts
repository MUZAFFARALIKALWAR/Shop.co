// schemas/shippingForm.js
import { defineType } from "sanity";

export default defineType({
  name: "shippingForm",
  title: "Shipping Form",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "text",
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
  ],
});