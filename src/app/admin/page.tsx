import {getProducts} from "@/actions";
import ProductsTable from "@/components/admin/ProductTable";


export default async function Home() {
  const products = await getProducts();
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductsTable products={products} />
    </div>
  );
}
