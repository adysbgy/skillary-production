/**
 * @deprecated — ORPHANED COMPONENT (Sprint 1 finding)
 *
 * This header was scaffolded during early landing page development and is NOT
 * imported or rendered by any route. The shared layout Header at
 * src/components/layout/Header.tsx is the canonical header for the entire site.
 *
 * DO NOT use this component. It lacks:
 * - Session/auth state (useSession)
 * - Mobile drawer with scroll-lock
 * - Account dropdown
 * - Active-route gradient highlighting
 *
 * Scheduled for deletion in Sprint 3 (post full-site alignment QA).
 * Ticket: global_ui_alignment_audit.md → Sprint 1 → Task 4
 */

import React from 'react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-skillary-border shadow-sm">
<div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-6">
<Link href="/" className="flex items-center gap-2 flex-shrink-0">
<div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
<svg aria-hidden="true" className="lucide lucide-box w-5 h-5 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
<path d="m3.3 7 8.7 5 8.7-5" />
<path d="M12 22V12" />
</svg>
</div>
<div className="flex flex-col">
<span className="text-[21px] font-extrabold text-skillary-navy tracking-tight leading-none">
        Skill
        <span className="gradient-text">
         ary
        </span>
</span>
<span className="text-[9px] text-skillary-muted font-medium tracking-wide -mt-0.5">
        Platform Pelatihan Terukur
       </span>
</div>
</Link>
<nav className="hidden md:flex items-center gap-1 flex-1">
<Link href="/program-catalog" className="flex items-center gap-0.5 text-sm text-skillary-muted font-medium px-3 py-2 rounded-lg hover:bg-skillary-peach hover:text-skillary-orange transition-all duration-150">
       Program
      </Link>
<Link href="/services" className="flex items-center gap-0.5 text-sm text-skillary-muted font-medium px-3 py-2 rounded-lg hover:bg-skillary-peach hover:text-skillary-orange transition-all duration-150">
       Untuk Organisasi
      </Link>
<Link href="/certificates" className="flex items-center gap-0.5 text-sm text-skillary-muted font-medium px-3 py-2 rounded-lg hover:bg-skillary-peach hover:text-skillary-orange transition-all duration-150">
       Sertifikat
      </Link>
<Link href="/portfolio" className="flex items-center gap-0.5 text-sm text-skillary-muted font-medium px-3 py-2 rounded-lg hover:bg-skillary-peach hover:text-skillary-orange transition-all duration-150">
       Portofolio
      </Link>
<Link href="/contact" className="flex items-center gap-0.5 text-sm text-skillary-muted font-medium px-3 py-2 rounded-lg hover:bg-skillary-peach hover:text-skillary-orange transition-all duration-150">
       Kontak
      </Link>
</nav>
<div className="hidden md:flex items-center gap-2 ml-auto">
<Link href="/login" className="text-sm font-semibold text-skillary-navy px-4 py-2 rounded-lg hover:bg-skillary-peach hover:text-skillary-orange transition-colors">
       Masuk
      </Link>
<Link href="/proposal" className="text-sm font-bold text-white px-5 py-2.5 rounded-full shadow-md hover:opacity-90 transition-opacity" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
       Minta Proposal
      </Link>
</div>
<button className="md:hidden ml-auto w-10 h-10 flex items-center justify-center rounded-lg hover:bg-skillary-peach transition-colors">
<svg aria-hidden="true" className="lucide lucide-menu w-6 h-6 text-skillary-navy" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12h16" />
<path d="M4 18h16" />
<path d="M4 6h16" />
</svg>
</button>
</div>
</header>
  );
};
