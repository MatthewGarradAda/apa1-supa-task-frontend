import {getProduct} from "@/actions";

import { ProductDetails } from "@/components/products/ProductDetails";

export default async function Home({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const [product] = await getProduct(parseFloat(id));
  if (!product) {
    return <p>Product not found.</p>
  }
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductDetails product={product} />
    </div>
  );
}
