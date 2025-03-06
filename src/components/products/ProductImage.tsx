import { Product } from "@/db/types";
import Image from "next/image";

interface Props {
    product: Product
}

export default function ProductImage({product}: Props) {
    if (!product.image) {
        return <div className="min-w-full min-h-full bg-muted rounded-md" />
    }
    return (
        <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top"
        />
    )
}