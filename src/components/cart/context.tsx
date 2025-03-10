import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/db/types';

export interface BasketProduct extends Product {
  quantity: number;
}

export type Products = BasketProduct[]
export type RemoveProduct = (productId: number) => void
export type UpdateQuantity = (productId: number, quantity: number) => void
export type GetTotalPrice = () => number
export type ClearBasket = () => void

export interface BasketContextType {
  products: Products;
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: RemoveProduct;
  updateQuantity: UpdateQuantity;
  clearBasket: ClearBasket;
  totalItems: number;
  getTotalPrice: GetTotalPrice;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);
