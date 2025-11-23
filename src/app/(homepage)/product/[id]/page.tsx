import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductClient from "./product-client";
export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="py-24 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </main>
    );
  }

  const data = await res.json();

  return <ProductClient key={data._id} product={data} />;
}
