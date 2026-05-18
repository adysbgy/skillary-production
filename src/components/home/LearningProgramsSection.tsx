import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { SecondaryButton } from "@/components/ui/Button";

interface LearningProgramsSectionProps {
  courses: any[];
}

export function LearningProgramsSection({ courses }: LearningProgramsSectionProps) {
  return (
    <Container className="py-20 lg:py-32 bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Program Pembelajaran Pilihan
          </h2>
          <p className="text-[#475569] text-lg">
            Selain training organisasi, Skillary menyediakan program pembelajaran terstruktur untuk peserta individual yang ingin meningkatkan kompetensi secara lebih terarah.
          </p>
        </div>
        <div className="shrink-0">
          <Link href="/explore">
            <SecondaryButton className="px-6 py-3 border-[#E7DDD4] text-[#334155] hover:bg-[#FFF8F1]">
              Jelajahi Semua Program
            </SecondaryButton>
          </Link>
        </div>
      </div>
      
      {(!courses || courses.length === 0) ? (
        <div className="bg-[#FFF8F1] border border-[#E7DDD4] rounded-xl p-12 text-center">
          <p className="text-[#64748B] font-medium">Program pilihan sedang disiapkan. Silakan jelajahi katalog Skillary.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {courses.slice(0, 4).map((course) => (
            <ProgramCard key={course.slug} {...course} />
          ))}
        </div>
      )}
    </Container>
  );
}
