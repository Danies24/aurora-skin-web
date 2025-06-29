import { Suspense } from "react";
import ProductListingPage from "@/pages/ProductListingPage";

export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListingPage />
    </Suspense>
  );
}
