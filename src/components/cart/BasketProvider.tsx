"use client"
import { useEffect, useState } from 'react';
import { BasketProduct, BasketContext } from './context';
import { Product } from '@/db/types';

export default function BasketProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<BasketProduct[]>([]);

  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setProducts(JSON.parse(savedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product, quantity: number = 1) => {
    setProducts((currentProducts) => {
      const existingProduct = currentProducts.find((p) => p.id === product.id);
      
      if (existingProduct) {
        return currentProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      
      return [...currentProducts, { ...product, quantity: quantity }];
    });
  };

  const removeProduct = (productId: number) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const clearBasket = () => {
    setProducts([]);
  };

  const getTotalItems = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  const getTotalPrice = () => {
    return products.reduce(
      (total, product) => total + parseFloat(product.price) * product.quantity,
      0
    );
  };

  const value = {
    products,
    addProduct,
    removeProduct,
    updateQuantity,
    clearBasket,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
}