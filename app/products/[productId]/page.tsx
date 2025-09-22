import Image from "next/image";
import Link from "next/link";
import { productType, formatPrice } from "../../../types/product";
import NoProduct from "@/app/components/NoProduct";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const id = Number(productId);

  // Minimal validation: handle missing/invalid ids with a simple message
  if (!Number.isFinite(id) || id <= 0) {
    return <NoProduct issue="The provided url has an invalid format." />;
  }

  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  // If API says not found, show a simple fallback
  if (!response.ok) {
    return <NoProduct issue="We were seaching in the wrong catalog." />;
  }

  let product: productType | null = null;
  try {
    product = (await response.json()) as productType;
  } catch {
    return <NoProduct issue="Our catalog does not contain this product." />;
  }

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950"
      ></div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">Product Details</h1>
        </header>
        <div key={product.id}>
          <h1 className="text-2xl font-bold pb-4">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-lg font-bold py-4">
            € {formatPrice(product.price)}
          </p>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>

        <p className="cursor-pointer text-center pt-4 text-indigo-600 dark:text-indigo-400">
          <Link href="/products">Back to all products</Link>
        </p>
      </main>
    </section>
  );
}
