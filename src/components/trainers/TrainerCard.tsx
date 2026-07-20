import Image from "next/image"; import Link from "next/link";
import type { SkillaryTrainer } from "@/types/trainer-types"; import { TrainerBadge } from "./TrainerBadge";
export function TrainerCard({ trainer }: { trainer: SkillaryTrainer }) {
 return <article className="group overflow-hidden rounded-[1.75rem] border border-[#eadfd5] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,.1)] motion-reduce:transform-none motion-reduce:transition-none">
  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100"><Image src={trainer.portraitSrc} alt={`Potret profesional ${trainer.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"/></div>
  <div className="p-6"><TrainerBadge status={trainer.status}/><h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-950">{trainer.name}</h2><p className="mt-2 min-h-12 text-base leading-6 text-slate-600">{trainer.headline}</p>
  <div className="mt-5 flex flex-wrap gap-2">{trainer.expertise.slice(0,3).map(x=><span key={x} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">{x}</span>)}</div>
  <Link href={`/trainers/${trainer.slug}`} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">Lihat profil <span aria-hidden>→</span></Link></div>
 </article>
}
