import {getProduct} from "@/actions";

import { ProductForm } from "@/components/admin/Product";

export default async function Home({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const [product] = await getProduct(parseFloat(id));
  if (!product) {
    return <p>Product not found.</p>
  }
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductForm product={product} />
    </div>
  );
}
