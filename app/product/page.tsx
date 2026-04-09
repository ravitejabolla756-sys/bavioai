import { buildMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/pages/product-page";

export const metadata = buildMetadata({
  title: "Product | Bavio AI — The Complete Voice Agent Platform",
  description:
    "Every feature you need to deploy, scale, and automate voice AI agents for your business. Real-time processing, visual workflow builder, analytics, and 50+ integrations.",
  path: "/product"
});

export default function Product() {
  return <ProductPage />;
}
