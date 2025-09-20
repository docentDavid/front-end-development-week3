import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productType, formatPrice } from "../../../types/product";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // Check if id is a valid number
  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    notFound();
  }

  let product: productType | null = null;
  try {
    const data = await res.json();
    // Some APIs return {} or null for not found, so check for id
    if (!data || typeof data !== "object" || !("id" in data)) {
      notFound();
    }

    product = data as productType;
  } catch (e) {
    notFound();
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
