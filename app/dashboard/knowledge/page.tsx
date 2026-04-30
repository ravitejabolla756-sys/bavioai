import { DashboardModulePage } from "@/components/dashboard/dashboard-module-page";

export default function DashboardKnowledgePage() {
  return (
    <DashboardModulePage
      eyebrow="Knowledge"
      title="Manage your AI knowledge base."
      description="Upload documents, URLs, FAQs, and internal notes so every agent can answer with accurate business context."
      highlights={[
        "PDF, DOCX, URL, and plain-text ingestion",
        "Source-level freshness and sync status",
        "Chunking and retrieval relevance controls",
        "Knowledge access controls by team",
        "Fallback behavior for unknown queries",
        "Traceable source citations per response"
      ]}
    />
  );
}
