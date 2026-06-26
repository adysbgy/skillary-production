// Credibility bar — BINAR-style: impact numbers + client logos + sektor

const IMPACT_STATS = [
  { value: "1998", label: "Berpengalaman sejak", suffix: "" },
  { value: "21", label: "Organisasi klien", suffix: "+" },
  { value: "39", label: "Program terdokumentasi", suffix: "+" },
  { value: "6", label: "Sektor industri", suffix: "+" },
];

const CLIENT_LOGOS = [
  { name: "Bank Indonesia", abbr: "BI", color: "rgb(220, 38, 38)" },
  { name: "BNI", abbr: "BNI", color: "rgb(29, 78, 216)" },
  { name: "OJK", abbr: "OJK", color: "rgb(21, 128, 61)" },
  { name: "Indofood", abbr: "IF", color: "rgb(234, 88, 12)" },
  { name: "Freeport", abbr: "FCX", color: "rgb(139, 92, 246)" },
  { name: "Mandiri Univ.", abbr: "MU", color: "rgb(5, 150, 105)" },
  { name: "Indosat", abbr: "IO", color: "rgb(220, 38, 38)" },
  { name: "PPM Mgmt", abbr: "PPM", color: "rgb(37, 99, 235)" },
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
            Klien & Organisasi yang Pernah Dilayani
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
                style={{ background: "rgb(31, 41, 55)", border: "1px solid rgb(55, 65, 81)" }}
              >
                {/* Avatar initial badge */}
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0"
                  style={{ background: client.color }}
                >
                  {client.abbr.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-gray-300">{client.name}</span>
              </div>
            ))}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
              style={{ background: "rgb(31, 41, 55)", border: "1px solid rgb(55, 65, 81)" }}
            >
              <span className="text-xs font-semibold text-gray-500">+13 lainnya</span>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-4">
            Nama klien merujuk pada arsip dokumentasi pelatihan korporat sejak 1998 yang menjadi fondasi Skillary.
          </p>
        </div>
      </div>
    </section>
  );
}
