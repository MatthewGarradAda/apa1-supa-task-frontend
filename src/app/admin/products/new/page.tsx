import { ProductForm } from "@/components/admin/Product";


export default async function NewProduct() {
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductForm product={{id: 0, name: '', description: '', image: null, price: '', sku: '', createdAt: null}} />
    </div>
  );
}
