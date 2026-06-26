import { ImageResponse } from "next/og";

// Site-wide default OG image — applies to the homepage and, by inheritance,
// every route that doesn't define its own opengraph-image. Statically
// generated at build time (no request-time data).
export const alt = "Skillary — Platform Pelatihan Organisasi Terukur & Bersertifikat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        {/* Soft brand glow */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(255,138,0,0.45) 0%, rgba(255,138,0,0) 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "38px",
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ marginLeft: "18px", fontSize: "38px", fontWeight: 800, color: "white", display: "flex" }}>
            Skillary
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "4px",
              color: "rgb(255,138,0)",
              marginBottom: "20px",
            }}
          >
            PLATFORM PELATIHAN ORGANISASI
          </div>
          <div style={{ display: "flex", fontSize: "70px", fontWeight: 800, color: "white", lineHeight: 1.12 }}>
            Terukur, Bersertifikat,
          </div>
          <div style={{ display: "flex", fontSize: "70px", fontWeight: 800, color: "white", lineHeight: 1.12 }}>
            dan Terdokumentasi
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: "26px", color: "rgb(156,163,175)" }}>
            Untuk HR, L&amp;D, dan Training Manager
          </div>
          <div style={{ display: "flex", fontSize: "26px", fontWeight: 700, color: "white" }}>
            skillary.my.id
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
