import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface PageHeroProps {
    eyebrow: string;
    title: string;
    description: string;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, actions, children }: PageHeroProps) {
    return (
        <section className="relative overflow-hidden bg-white py-14 lg:py-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />
            <Container className="relative py-4 lg:py-8 animate-fade-in-up">
                <SectionTitle eyebrow={eyebrow} title={title} description={description} actions={actions} headingLevel="h1" />
                {children}
            </Container>
        </section>
    );
}
