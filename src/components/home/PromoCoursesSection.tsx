import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { PrimaryButton } from "@/components/ui/Button";

interface PromoCoursesSectionProps {
  courses: any[];
}

export function PromoCoursesSection({ courses }: PromoCoursesSectionProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <section id="promo-courses">
      <Container className="py-16 lg:py-24">
      <SectionTitle
        title="Kelas Promo Hari Ini"
        description="Ikuti kelas pilihan dengan harga launch promo. Belajar, kerjakan assessment, dan dapatkan sertifikat digital."
        actions={
          <Link href="/explore">
            <PrimaryButton className="px-5">Lihat Semua Kelas</PrimaryButton>
          </Link>
        }
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mt-8">
        {courses.slice(0, 4).map((course) => (
          <div key={course.slug} className="relative group">
            <div className="absolute -top-3 -right-3 z-10 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md transform rotate-12 group-hover:rotate-0 transition-transform">
              Launch Promo
            </div>
            <ProgramCard {...course} />
          </div>
        ))}
      </div>
    </Container>
    </section>
  );
}
