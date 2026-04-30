import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bavio.ai";
const SITE_NAME = "Bavio AI";
const DEFAULT_OG_IMAGE = "/images/bavio-mark.svg";
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 155;

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
  const safeTitle = truncateMeta(title, MAX_TITLE_LENGTH);
  const safeDescription = truncateMeta(description, MAX_DESCRIPTION_LENGTH);
  const url = new URL(path, SITE_URL).toString();
  const imageUrl = new URL(DEFAULT_OG_IMAGE, SITE_URL).toString();

  return {
    title: safeTitle,
    description: safeDescription,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} voice AI platform`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [imageUrl]
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || ""
      }
    }
  };
}

function truncateMeta(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;

  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/bavio-mark.svg`,
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
    brand: SITE_NAME,
    description: "Autonomous voice agents for inbound and outbound business calls in Indian and global languages.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "0",
      highPrice: "14999"
    }
  };
}

export function getFaqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
