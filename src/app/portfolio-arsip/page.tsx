import { PORTFOLIO_METADATA } from "@/lib/portfolio-metadata";
import { PortfolioContent } from "@/components/portfolio/PortfolioArchiveContent";

export const metadata = PORTFOLIO_METADATA;

export default function PortfolioArchivePage() {
  return <PortfolioContent />;
}
