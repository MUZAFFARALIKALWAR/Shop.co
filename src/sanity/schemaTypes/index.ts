import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import orders from "./order"
import shipping from "./shipping_form"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,orders,shipping],
}