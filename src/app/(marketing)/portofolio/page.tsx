export { PORTFOLIO_METADATA as metadata } from "@/lib/portfolio-metadata";

import { PortfolioContent } from "@/components/portfolio/PortfolioArchiveContent";

export default function CanonicalPortfolioPage() {
  return <PortfolioContent showEmbeddedHeader={false} />;
}
