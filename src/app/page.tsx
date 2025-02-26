import {getProducts} from "@/actions";

import { ProductsGrid } from "@/components/products/ProductGrid";

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductsGrid products={products} />
    </div>
  );
}
