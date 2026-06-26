import { ImageResponse } from "next/og";
import { getAllProgramSlugs, getProgramBySlug } from "@/data/v2-programs";

export const alt = "Program Pelatihan Korporat — Skillary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-generate an OG image for every program slug at build time.
export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  const title = program?.title ?? "Program Pelatihan Korporat";
  const category = program?.category ?? "Skillary";
  const gradient = program?.gradient ?? "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "rgb(17, 24, 39)",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Category gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "14px",
            background: gradient,
          }}
        />

        {/* Logo + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              S
            </div>
            <div style={{ marginLeft: "16px", fontSize: "32px", fontWeight: 800, color: "white", display: "flex" }}>
              Skillary
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              color: "white",
              padding: "10px 22px",
              borderRadius: "9999px",
              background: gradient,
            }}
          >
            {category}
          </div>
        </div>

        {/* Program title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: "rgb(255,138,0)",
              marginBottom: "18px",
            }}
          >
            PROGRAM PELATIHAN
          </div>
          <div style={{ display: "flex", fontSize: "64px", fontWeight: 800, color: "white", lineHeight: 1.12, maxWidth: "960px" }}>
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: "24px", color: "rgb(156,163,175)" }}>
            Pelatihan korporat in-house, online &amp; hybrid
          </div>
          <div style={{ display: "flex", fontSize: "24px", fontWeight: 700, color: "white" }}>
            skillary.my.id
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
