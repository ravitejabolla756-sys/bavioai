import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bavio.in";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = []
}: MetadataOptions): Metadata {
  const url = new URL(path, baseUrl).toString();

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Bavio AI",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bavio AI",
    url: baseUrl,
    logo: `${baseUrl}/images/bavio-mark.svg`,
    sameAs: [
      "https://x.com/bavioai",
      "https://www.linkedin.com/company/bavio-ai",
      "https://github.com/bavio-ai",
      "https://www.youtube.com/@bavioai"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressCountry: "IN"
    }
  };
}

export function getProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bavio AI Voice Agents",
    brand: "Bavio AI",
    description: "Autonomous voice agents for inbound and outbound business calls in Indian and global languages.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "0",
      highPrice: "14999"
    }
  };
}
