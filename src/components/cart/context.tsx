import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/db/types';

export interface BasketProduct extends Product {
  quantity: number;
}

export interface BasketContextType {
  products: BasketProduct[];
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearBasket: () => void;
  totalItems: number;
  getTotalPrice: () => number;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);
