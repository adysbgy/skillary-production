// Credibility bar — BINAR-style: impact numbers + client logos + sektor

const IMPACT_STATS = [
  { value: "1998", label: "Berpengalaman sejak", suffix: "" },
  { value: "21", label: "Organisasi klien", suffix: "+" },
  { value: "39", label: "Program terdokumentasi", suffix: "+" },
  { value: "6", label: "Sektor industri", suffix: "+" },
];

// Softened to industry sectors (no unapproved client-name claims), matching
// the framing used on /v2/about and /v2/proposal.
const SECTORS = [
  "Perbankan",
  "Regulator Keuangan",
  "FMCG & Manufaktur",
  "Pertambangan & Energi",
  "Telekomunikasi",
  "Pendidikan & Konsultansi",
];

export function CredibilityV2() {
  return (
    <section style={{ background: "rgb(17, 24, 39)", borderBottom: "1.5px solid rgb(31, 41, 55)" }}>
      {/* Impact stats */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x" style={{ borderColor: "rgb(55, 65, 81)" }}>
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className="text-center md:px-8">
              <div className="text-3xl md:text-4xl font-extrabold text-white">
                {s.value}
                <span style={{ color: "rgb(255, 138, 0)" }}>{s.suffix}</span>
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Client strip */}
      <div style={{ borderTop: "1px solid rgb(31, 41, 55)" }} className="py-6">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5">
            Pengalaman Pelatihan Lintas Sektor Industri
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SECTORS.map((sector) => (
              <div
                key={sector}
                className="flex items-center px-4 py-2.5 rounded-lg"
                style={{ background: "rgb(31, 41, 55)", border: "1px solid rgb(55, 65, 81)" }}
              >
                <span className="text-xs font-semibold text-gray-300">{sector}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-4">
            Berangkat dari arsip dokumentasi pelatihan korporat sejak 1998 yang menjadi fondasi Skillary.
          </p>
        </div>
      </div>
    </section>
  );
}
