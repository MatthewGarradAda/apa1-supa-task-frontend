import { z } from 'zod';

// ** to change

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  quantity: z.number().int(),
  price: z.number(),
  type: z.string(),
});

// Books Schema
export const booksSchema = z.object({
  author: z.string(),
  isbn: z.string(),
  genre: z.string(),
  publicationDate: z.string(),
  productId: z.string()
});

// Clothing Schema
export const clothingSchema = z.object({
  size: z.string(),
  material: z.string(),
  color: z.string(),
  brand: z.string(),
  gender: z.string(),
  productId: z.string()
});

// Electronics Schema
export const electronicsSchema = z.object({
  brand: z.string(),
  warranty: z.string(),
  model: z.string(),
  powerConsumption: z.number(),
  dimensions: z.string(),
});

// Groceries Schema
export const groceriesSchema = z.object({
  expirationDate: z.string(),
  nutritionalInfo: z.string(),
  organic: z.boolean(),
  productId: z.string()
});

// Toys Schema
export const toysSchema = z.object({
  ageGroup: z.string(),
  material: z.string(),
  batteryOperated: z.boolean(),
  productId: z.string()
});

export type Product = z.infer<typeof productSchema>;
export type Books = z.infer<typeof booksSchema>;
export type Clothing = z.infer<typeof clothingSchema>;
export type Electronics = z.infer<typeof electronicsSchema>;
export type Groceries = z.infer<typeof groceriesSchema>;
export type Toys = z.infer<typeof toysSchema>;

// ** better way to define this that still has .partial?
type Schema = typeof booksSchema 
  | typeof clothingSchema
  | typeof electronicsSchema
  | typeof groceriesSchema
  | typeof toysSchema

export default new Map<string, Schema>([
  ['books', booksSchema],
  ['clothing', clothingSchema],
  ['electronics', electronicsSchema],
  ['groceries', groceriesSchema],
  ['toys', toysSchema]
]);

