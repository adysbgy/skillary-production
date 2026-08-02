import { HomepagePreview } from "@/features/marketing/homepage-preview/HomepagePreview";
import { getCachedHomepagePreviewData } from "@/features/marketing/homepage-preview/data/get-homepage-preview-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function HomepagePreviewPage() {
  const data = await getCachedHomepagePreviewData();

  return <HomepagePreview data={data} />;
}
