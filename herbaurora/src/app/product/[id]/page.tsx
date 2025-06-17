import ProductDetailsPage from "@/pages/ProductDetailsPage";

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailsPage id={params.id} />;
}
