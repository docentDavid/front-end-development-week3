import Link from "next/link";

export default function NoProduct({ issue }: { issue: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="mt-2">{issue}</p>
      <p className="mt-4">
        <Link href="/products">Back to all products</Link>
      </p>
    </main>
  );
}
