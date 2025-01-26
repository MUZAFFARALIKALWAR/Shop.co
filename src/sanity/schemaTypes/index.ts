import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import orders from './orders'
// import shippingForm from './shippingForm'
import contactForm from "./contact"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,contactForm,orders],
}