import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { SecondaryButton } from "@/components/ui/Button";

interface FreeCoursesSectionProps {
  courses: any[];
}

export function FreeCoursesSection({ courses }: FreeCoursesSectionProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <Container className="py-16 lg:py-24 bg-[#FFFDF9]/50">
      <SectionTitle
        title="Mulai dari Kelas Gratis"
        description="Perkuat fundamental skill Anda sebelum lanjut ke kelas berbayar. Sertifikat digital tersedia setelah menyelesaikan materi dan assessment."
        actions={
          <Link href="/explore">
            <SecondaryButton className="px-5">Lihat Kelas Gratis</SecondaryButton>
          </Link>
        }
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mt-8">
        {courses.slice(0, 4).map((course) => (
          <ProgramCard key={course.slug} {...course} />
        ))}
      </div>
    </Container>
  );
}
