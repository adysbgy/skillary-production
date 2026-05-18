import React from "react";
import Link from "next/link";
import { EMAIL_GENERAL, EMAIL_TEAMS } from "@/data/config";

export function ContactAlternatives() {
  return (
    <div className="mt-12 pt-12" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <h3 className="text-xl font-bold text-[#0F172A] mb-4">Kontak Langsung</h3>
      <p className="text-sm text-[#475569] mb-6">
        Untuk kebutuhan yang lebih cepat, Anda juga dapat menghubungi Skillary melalui kontak berikut.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <div className="bg-white p-4 rounded-xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] mb-1">Inquiry Teams / Corporate</p>
          <a href={`mailto:${EMAIL_TEAMS}`} className="font-semibold hover:underline break-all" style={{ color: 'rgb(255, 138, 0)' }}>
            {EMAIL_TEAMS}
          </a>
        </div>
        <div className="bg-white p-4 rounded-xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] mb-1">Pertanyaan Umum</p>
          <a href={`mailto:${EMAIL_GENERAL}`} className="font-semibold hover:underline break-all" style={{ color: 'rgb(255, 138, 0)' }}>
            {EMAIL_GENERAL}
          </a>
        </div>
      </div>

      <div className="rounded-xl p-6" style={{ background: 'rgb(255, 244, 232)', border: '1.5px solid rgb(255, 214, 165)' }}>
        <h4 className="font-bold mb-2" style={{ color: 'rgb(180, 83, 9)' }}>Ingin Berkolaborasi sebagai Expert?</h4>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgb(180, 83, 9)', opacity: 0.8 }}>
          Skillary membuka peluang kolaborasi terbatas dengan trainer, praktisi, dan subject matter expert terpilih. Setiap calon partner akan ditinjau berdasarkan pengalaman, keahlian, dan kesesuaian program.
        </p>
        <Link href="#form">
          <button className="text-sm font-bold bg-white px-4 py-2 rounded-full shadow-sm transition-colors hover:shadow-md" style={{ color: 'rgb(180, 83, 9)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Ajukan Kolaborasi Expert
          </button>
        </Link>
      </div>
    </div>
  );
}
