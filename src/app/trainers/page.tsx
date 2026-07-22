import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TrainerFilters } from "@/components/trainers/TrainerFilters";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText, SectionHeading } from "@/components/v2/marketing/MarketingUI";
import { publicTrainers } from "@/lib/trainer-public";

export const metadata: Metadata = {
  title: "Skillary Faculty | Praktisi Pilihan untuk Pengalaman Belajar",
  description: "Temukan trainer Skillary berdasarkan expertise, pengalaman praktik, dan bukti profesional yang ditinjau secara transparan.",
  alternates: { canonical: "/trainers" },
};

const selection = [
  { title: "Identitas & pengalaman", desc: "Identitas profesional dan pengalaman utama ditinjau sebelum profil dipublikasikan." },
  { title: "Bukti kompetensi", desc: "Portfolio, credential, program, atau karya publik diperiksa sesuai konteksnya." },
  { title: "Kemampuan mengajar", desc: "Kami menilai bagaimana trainer menyusun, menjelaskan, dan memfasilitasi pembelajaran." },
  { title: "Kualitas berkelanjutan", desc: "Profil, bukti, dan feedback ditinjau ulang agar informasi tetap relevan." },
];

export const dynamic = "force-dynamic";

export default async function TrainersPage() {
  const trainers = await publicTrainers();
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Skillary Faculty", itemListElement: trainers.map((trainer, index) => ({ "@type": "ListItem", position: index + 1, url: `https://skillary.my.id/trainers/${trainer.slug}`, name: trainer.name })) };
  return (
    <MarketingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden px-5 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_top,rgba(255,138,0,0.13)_0%,rgba(255,90,95,0.06)_40%,transparent_70%)]" />
        <Container className="relative text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#eaded2] bg-white px-4 py-1.5 text-xs font-semibold text-[#64748B] shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8a00]" />Skillary Faculty</div>
          <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">Praktisi yang mengajar dari <GradientText>pengalaman nyata</GradientText></h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#64748B] md:text-lg">Kenali kelompok praktisi pilihan yang dipercaya untuk membawakan pembelajaran berbasis pengalaman, evidence, dan konteks industri.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="#trainer-explorer" className="w-full rounded-full bg-gradient-to-r from-[#ff8a00] to-[#ff5a5f] px-8 py-4 text-center text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90 sm:w-auto">Temukan trainer</a><Link href="/contact" className="w-full rounded-full border border-slate-200 bg-white px-8 py-4 text-center text-sm font-bold text-slate-950 hover:bg-slate-50 sm:w-auto">Diskusikan program organisasi</Link></div>
        </Container>
      </section>
      <section className="bg-[url('/images/lp-startup-band.svg')] bg-[length:100%_100%] px-5 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Standar Seleksi" title="Kepercayaan dibangun melalui proses" sub="Skillary membedakan faculty pilihan dan trainer yang telah diverifikasi melalui proses yang transparan." />
          <div data-reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{selection.map((item, index) => <article key={item.title} className="lp-lift rounded-2xl border border-[#eaedf3] bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"><span className="text-sm font-extrabold text-[#ff8a00]">0{index + 1}</span><h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#64748B]">{item.desc}</p></article>)}</div>
          <div className="mt-8 text-center"><Link href="/trainer-verification" className="text-sm font-bold text-[#ff8a00] hover:underline">Pelajari standar verifikasi →</Link></div>
        </Container>
      </section>
      <section id="trainer-explorer" className="scroll-mt-28 px-5 py-16 md:py-24"><Container><div className="mb-10 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff8a00]">Invitation-led faculty</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">Faculty yang dipilih dengan sengaja</h2><p className="mt-4 text-base leading-7 text-[#64748B]">Faculty tidak direkrut melalui pendaftaran terbuka. Hanya praktisi yang dinominasikan, diundang, dan menyetujui profil publik yang ditampilkan.</p></div><TrainerFilters trainers={trainers} /></Container></section>
    </MarketingShell>
  );
}
