import { HeaderV2 } from "@/components/v2/layout/HeaderV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2-root flex flex-col min-h-screen">
      <HeaderV2 />
      <main className="flex-1">{children}</main>
      <FooterV2 />
    </div>
  );
}
