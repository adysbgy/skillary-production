import Image from "next/image";

import type {
  HomepageLearningPathCard,
  HomepagePreviewData,
  HomepageProgramCard,
  HomepageSectionState,
  HomepageWorkshopCard,
} from "./data/types";
import {
  HOMEPAGE_PAYMENT_POLICY,
  SAFE_CAPABILITY_COPY,
  SAFE_CTA_COPY,
  SAFE_STATIC_DESTINATIONS,
} from "./data/homepage-preview-contract";
import { BlueprintBand } from "./components/BlueprintBand";
import { PreviewDiscoveryTabs } from "./components/PreviewDiscoveryTabs";
import {
  ArrowIcon,
  AudienceIcon,
  CapabilityIcon,
  GoalIcon,
  LearningFormatIcon,
} from "./components/PreviewIcons";
import { PreviewScrollRail } from "./components/PreviewScrollRail";
import styles from "./HomepagePreview.module.css";

const HERO_COPY = {
  heading: "Bangun skill kerja yang siap dipakai.",
  body: "Temukan program, workshop, dan jalur belajar yang menghubungkan materi dengan project, penilaian, sertifikat, dan ringkasan hasil.",
  reassurance: "Untuk langkah karier Anda berikutnya—atau kapabilitas seluruh tim.",
} as const;

const HERO_CAPABILITY_STRIP = [
  { label: "Belajar terarah", detail: "Program sesuai tujuan", kind: "learn" as const },
  { label: "Praktik nyata", detail: "Project dan umpan balik", kind: "practice" as const },
  { label: "Buktikan hasil", detail: "Penilaian dan sertifikat", kind: "evidence" as const },
] as const;

const LEARNING_FORMATS = [
  {
    kind: "path" as const,
    title: "Jalur belajar",
    copy: "Mulai dari tujuan, lalu ikuti urutan program yang sumbernya sudah diverifikasi.",
    label: "Lihat jalur",
    href: SAFE_STATIC_DESTINATIONS.learningPathSection,
  },
  {
    kind: "program" as const,
    title: "Program terstruktur",
    copy: "Pelajari level, durasi, format, dan hasil program sebelum menentukan pilihan.",
    label: "Jelajahi program",
    href: SAFE_STATIC_DESTINATIONS.programSection,
  },
  {
    kind: "workshop" as const,
    title: "Events & Workshop",
    copy: "Jadwal berikutnya diumumkan setelah topik, fasilitator, waktu, dan ketersediaannya terverifikasi.",
    label: "Daftarkan minat",
    href: SAFE_STATIC_DESTINATIONS.workshopSection,
  },
  {
    kind: "project" as const,
    title: "Project & penilaian",
    copy: "Hubungkan materi dengan praktik, umpan balik, penilaian, dan bukti hasil belajar.",
    label: "Lihat cara kerjanya",
    href: SAFE_STATIC_DESTINATIONS.productProofSection,
  },
] as const;

const BUSINESS_SCOPE = [
  "Kebutuhan kerja",
  "Level peserta",
  "Format pelaksanaan",
  "Hasil project",
  "Penilaian",
  "Evaluasi program",
] as const;

const GUIDED_GOALS = [
  {
    slug: "power-bi-business-dashboard",
    kind: "dashboard" as const,
    title: "Membangun dashboard untuk keputusan bisnis",
    copy: "Mulai dari data mentah, lalu susun model, visual, dan dashboard yang siap dipresentasikan.",
    signal: "Data → model → dashboard",
  },
  {
    slug: "data-driven-decision-making",
    kind: "decision" as const,
    title: "Mengambil keputusan dengan dasar data",
    copy: "Perkuat cara membaca data, menemukan insight, dan menyusun rekomendasi yang dapat dipertanggungjawabkan.",
    signal: "Pertanyaan → insight → rekomendasi",
  },
  {
    slug: "ai-productivity-for-teams",
    kind: "ai" as const,
    title: "Menerapkan AI pada alur kerja tim",
    copy: "Kenali use case, prompting, risiko, dan cara memasukkan AI ke pekerjaan sehari-hari secara terarah.",
    signal: "Contoh penggunaan → praktik → alur kerja",
  },
  {
    slug: "business-presentation-reporting",
    kind: "presentation" as const,
    title: "Menyampaikan laporan agar mudah dipahami",
    copy: "Susun pesan, slide, data, dan penyampaian menjadi presentasi bisnis yang ringkas dan jelas.",
    signal: "Pesan → visual → penyampaian",
  },
] as const;

const PRODUCT_VIEWS = [
  {
    title: "Ruang kerja project",
    copy: SAFE_CAPABILITY_COPY.practice,
    variant: "project",
    scope: "Ringkasan · pengerjaan · tinjauan",
  },
  {
    title: "Tinjauan penilaian",
    copy: SAFE_CAPABILITY_COPY.assessment,
    variant: "assessment",
    scope: "Kriteria · catatan · tindak lanjut",
  },
  {
    title: "Rekam sertifikat",
    copy: SAFE_CAPABILITY_COPY.certification,
    variant: "credential",
    scope: "Program · syarat penerbitan · status",
  },
] as const;

const ARTIFACTS = [
  {
    title: "Ringkasan project",
    copy: SAFE_CAPABILITY_COPY.practice,
    variant: "brief",
    format: "Dokumen kerja",
  },
  {
    title: "Rubrik & umpan balik",
    copy: SAFE_CAPABILITY_COPY.assessment,
    variant: "rubric",
    format: "Lembar peninjauan",
  },
  {
    title: "Verifikasi sertifikat",
    copy: SAFE_CAPABILITY_COPY.certification,
    variant: "credential",
    format: "Rekam pemeriksaan",
  },
] as const;

const EVIDENCE_STAGES = [
  { title: "Tugas", copy: "Ringkasan dan hasil kerja" },
  { title: "Umpan balik", copy: "Catatan peninjauan" },
  { title: "Penilaian", copy: "Kriteria sesuai program" },
  { title: "Sertifikat", copy: "Status ketika syarat terpenuhi" },
  { title: "Portofolio", copy: "Artefak jika tersedia" },
] as const;

const ORGANIZATION_STEPS = [
  {
    title: "Pahami",
    question: "Kebutuhan apa yang perlu dijawab?",
    copy: "Petakan peserta, peran, konteks kerja, level awal, format, dan kendala pelaksanaan.",
    output: "Konteks dan kebutuhan program",
  },
  {
    title: "Rancang",
    question: "Perubahan apa yang ingin dilatih?",
    copy: "Sepakati tujuan, struktur materi, bentuk praktik, penilaian, dan syarat penyelesaian.",
    output: "Ringkasan program dan rencana pelaksanaan",
  },
  {
    title: "Jalankan",
    question: "Bagaimana program akan berlangsung?",
    copy: "Siapkan kelompok, peserta, akses, fasilitator, jadwal, serta dukungan sesuai ruang lingkup.",
    output: "Persiapan peserta dan pelaksanaan",
  },
  {
    title: "Tinjau",
    question: "Apa yang dapat diperiksa setelahnya?",
    copy: "Tinjau partisipasi, penyelesaian, penilaian, sertifikat, dan ringkasan yang tersedia.",
    output: "Tinjauan dan ringkasan sesuai data",
  },
] as const;

const INSPECTION_GROUPS = [
  {
    title: "Partisipasi",
    copy: "Siapa yang terdaftar dan aktivitas program apa yang diikuti.",
    checkpoints: ["Peserta", "Batch", "Kehadiran bila dicatat"],
  },
  {
    title: "Kemajuan",
    copy: "Penyelesaian materi atau aktivitas yang memang masuk ke dalam program.",
    checkpoints: ["Akses", "Penyelesaian", "Aktivitas"],
  },
  {
    title: "Penilaian",
    copy: "Hasil peninjauan berdasarkan format dan kriteria penilaian yang disepakati.",
    checkpoints: ["Kriteria", "Status", "Umpan balik"],
  },
  {
    title: "Sertifikat",
    copy: "Status penerbitan sertifikat ketika syarat penyelesaian dan penerbitan terpenuhi.",
    checkpoints: ["Kelayakan", "Status", "Rekam"],
  },
  {
    title: "Laporan",
    copy: "Ringkasan program berdasarkan data yang tersedia dan penerima laporan yang disepakati.",
    checkpoints: ["Ruang lingkup", "Penerima", "Format ringkasan"],
  },
] as const;

export function HomepagePreview({ data }: { data: HomepagePreviewData }) {
  return (
    <div className={styles.previewPage} data-contract-version={data.contractVersion}>
      <BlueprintBand
        bandId="SK-HP-02"
        className={`${styles.band} ${styles.heroBand}`}
        aria-labelledby="homepage-preview-heading"
      >
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 aria-label={HERO_COPY.heading} id="homepage-preview-heading">
              <span aria-hidden="true">Bangun skill kerja</span>
              <span aria-hidden="true">yang siap dipakai.</span>
            </h1>
            <p className={styles.heroBody}>{HERO_COPY.body}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href={SAFE_STATIC_DESTINATIONS.programSection}>
                Mulai jelajahi program
                <ArrowIcon />
              </a>
              <a className={styles.secondaryAction} href={SAFE_STATIC_DESTINATIONS.organizationJourneySection}>
                Lihat alur organisasi
                <ArrowIcon />
              </a>
            </div>
            <p aria-label="Alur Skillary: Belajar, Praktik, Buktikan" className={styles.heroMethod}>
              <span>Belajar</span>
              <span>Praktik</span>
              <span>Buktikan</span>
            </p>
            <p className={styles.heroReassurance}>{HERO_COPY.reassurance}</p>
          </div>
          <HeroFigure tone="individual" />
          <HeroFigure tone="organization" />
        </div>
        <ol
          aria-label="Cara Skillary membangun hasil belajar"
          className={styles.heroCapabilityStrip}
          data-skillary-signature="learn-practice-prove"
        >
          {HERO_CAPABILITY_STRIP.map((item, index) => (
            <li key={item.label}>
              <span className={styles.heroCapabilityStep}>0{index + 1}</span>
              <CapabilityIcon kind={item.kind} />
              <span className={styles.heroCapabilityCopy}>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
            </li>
          ))}
        </ol>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-03"
        className={`${styles.band} ${styles.audienceBand}`}
        aria-labelledby="audience-heading"
      >
        <h2 className={styles.visuallyHidden} id="audience-heading">
          Pilih Skillary untuk individu atau organisasi
        </h2>
        <div className={styles.audienceGrid}>
          <article className={`${styles.audienceCard} ${styles.audienceIndividual}`}>
            <AudienceIcon kind="individual" />
            <p>Untuk individu</p>
            <h3>Bangun skill kerja yang siap dipraktikkan.</h3>
            <span>
              Pilih program, kerjakan project, dan pahami bentuk penilaian sebelum Anda
              mulai.
            </span>
            <a data-audience-route="individual" href={SAFE_STATIC_DESTINATIONS.programSection}>
              Lihat program individu
              <ArrowIcon />
            </a>
          </article>
          <article className={`${styles.audienceCard} ${styles.audienceOrganization}`}>
            <AudienceIcon kind="organization" />
            <p>Untuk organisasi</p>
            <h3>Bangun kapabilitas tim secara terarah.</h3>
            <span>
              Rancang tujuan, cara pelaksanaan, penilaian, dan evaluasi berdasarkan kebutuhan
              tim.
            </span>
            <a
              data-audience-route="organization"
              href={SAFE_STATIC_DESTINATIONS.organizationJourneySection}
            >
              Lihat alur untuk tim
              <ArrowIcon />
            </a>
          </article>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-04"
        className={`${styles.band} ${styles.formatsBand}`}
        aria-labelledby="formats-heading"
      >
        <div className={styles.contentWidth}>
          <div className={styles.formatsLead}>
            <h2 id="formats-heading">Cara yang lebih jelas untuk membangun skill kerja.</h2>
            <p>
              Pilih format berdasarkan cara belajar dan hasil kerja yang ingin Anda bangun.
            </p>
          </div>
          <div className={styles.formatsGrid}>
            {LEARNING_FORMATS.map((format) => (
              <article className={styles.formatCard} data-format={format.kind} key={format.title}>
                <LearningFormatIcon kind={format.kind} />
                <h3>{format.title}</h3>
                <p>{format.copy}</p>
                <a href={format.href}>
                  {format.label}
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-05"
        className={`${styles.band} ${styles.businessBand}`}
        aria-labelledby="business-heading"
      >
        <div className={`${styles.contentWidth} ${styles.businessLayout}`}>
          <div className={styles.businessCopy}>
            <h2 id="business-heading">Bangun kapabilitas tim dari kebutuhan kerja yang nyata.</h2>
            <p>
              Mulai dari konteks tim, lalu sepakati tujuan, cara pelaksanaan, praktik,
              penilaian, dan bentuk evaluasi program.
            </p>
            <a
              className={styles.businessAction}
              href={SAFE_STATIC_DESTINATIONS.organizationJourneySection}
            >
              Lihat alur untuk tim
              <ArrowIcon />
            </a>
          </div>
          <div className={styles.businessScope} aria-label="Ruang lingkup program organisasi">
            <p>Ruang lingkup yang dapat dikunci</p>
            <div>
              {BUSINESS_SCOPE.map((item) => (
                <span key={item}>
                  <i aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-06"
        className={`${styles.band} ${styles.discoveryBand}`}
        aria-labelledby="discovery-heading"
        data-catalog-mode={data.catalogPresentation.mode}
      >
        <div className={styles.contentWidth}>
          <div className={styles.discoveryLead}>
            <div>
              <SectionLead
                headingId="discovery-heading"
                heading="Mulai dari hasil kerja yang ingin Anda bangun."
              />
              <p>
                Empat tujuan di bawah terhubung langsung ke program yang isi dan halaman
                detailnya sudah dapat diperiksa.
              </p>
            </div>
            <CatalogStatus presentation={data.catalogPresentation} />
          </div>
          <GuidedGoals section={data.sections.programs} />
          <div className={styles.catalogLead}>
            <div>
              <h3>Pilih format, lalu periksa detailnya.</h3>
              <p>
                Bandingkan program yang tersedia, lalu lihat kapan workshop dan jalur belajar
                siap dibuka.
              </p>
            </div>
            <a href={SAFE_STATIC_DESTINATIONS.contact}>
              Butuh bantuan memilih?
              <ArrowIcon />
            </a>
          </div>
          <PreviewDiscoveryTabs
            program={
              <DiscoveryGroup
                heading="Program"
                headingId="program"
                section={data.sections.programs}
                renderItems={(items) => <ProgramCards items={items} />}
              />
            }
            workshop={
              <DiscoveryGroup
                heading="Events & Workshop"
                headingId="workshop"
                section={data.sections.workshops}
                renderItems={(items) => <WorkshopCards items={items} />}
              />
            }
            learningPath={
              <DiscoveryGroup
                heading="Jalur Belajar"
                headingId="jalur-belajar"
                section={data.sections.learningPaths}
                renderItems={(items) => <LearningPathCards items={items} />}
              />
            }
          />
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-07"
        className={`${styles.band} ${styles.productBand}`}
        aria-labelledby="product-heading"
      >
        <div
          className={`${styles.contentWidth} ${styles.productLayout}`}
          data-showcase-mode="anonymous-specimen"
        >
          <div className={styles.productIntro}>
            <SectionLead
              headingId="product-heading"
              heading="Dari project ke bukti yang dapat ditinjau."
              inverse
            />
            <p>
              Tiga contoh anonim memperlihatkan bagaimana ringkasan project, tinjauan berbasis
              kriteria, dan rekam sertifikat dapat tersambung sesuai konfigurasi program.
            </p>
            <a className={styles.showcaseAction} href="#artifact-heading">
              Periksa contoh buktinya
              <ArrowIcon />
            </a>
            <span>Seluruh contoh bersifat anonim dan tidak menggunakan nama, nilai, atau hasil peserta.</span>
          </div>
          <PreviewScrollRail
            className={styles.productGrid}
            itemCount={PRODUCT_VIEWS.length}
            label="Contoh tampilan produk"
          >
            {PRODUCT_VIEWS.map((view) => (
              <article className={styles.productView} data-proof={view.variant} key={view.title}>
                <div className={styles.specimenTopline}>
                  <p className={styles.specimenLabel}>Contoh tampilan</p>
                  <span>{view.scope}</span>
                </div>
                <ProductProofCanvas variant={view.variant} />
                <div className={styles.specimenCaption}>
                  <h3>{view.title}</h3>
                  <p>{view.copy}</p>
                </div>
              </article>
            ))}
          </PreviewScrollRail>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-08"
        className={`${styles.band} ${styles.artifactBand}`}
        aria-labelledby="artifact-heading"
      >
        <div className={styles.contentWidth}>
          <div className={styles.artifactHeader}>
            <SectionLead
              headingId="artifact-heading"
              heading="Periksa bentuk buktinya."
            />
            <p className={styles.artifactIntro}>
              Bandingkan bentuk ringkasan project, umpan balik, dan rekam verifikasi yang
              dapat disiapkan sesuai program.
            </p>
          </div>
          <PreviewScrollRail
            className={styles.artifactGrid}
            itemCount={ARTIFACTS.length}
            label="Contoh artefak hasil belajar"
          >
            {ARTIFACTS.map((artifact) => (
              <article className={styles.artifactCard} data-artifact-card={artifact.variant} key={artifact.title}>
                <div className={styles.specimenTopline}>
                  <p className={styles.specimenLabel}>Contoh tampilan</p>
                  <span>{artifact.format}</span>
                </div>
                <ArtifactCanvas variant={artifact.variant} />
                <div className={styles.specimenCaption}>
                  <h3>{artifact.title}</h3>
                  <p>{artifact.copy}</p>
                </div>
              </article>
            ))}
          </PreviewScrollRail>
          <div className={styles.evidenceLedger} aria-label="Evidence ledger">
            <div>
              <h3>Dari tugas ke bukti yang dapat ditinjau.</h3>
              <span>Urutan dan ketersediaan dapat berbeda sesuai program.</span>
            </div>
            <ol>
              {EVIDENCE_STAGES.map((stage) => (
                <li key={stage.title}>
                  <strong>{stage.title}</strong>
                  <span>{stage.copy}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-09"
        className={`${styles.band} ${styles.organizationBand}`}
        aria-labelledby="organization-heading"
        data-lower-page="organization-process"
      >
        <div className={`${styles.contentWidth} ${styles.organizationLayout}`}>
          <div className={styles.organizationIntro}>
            <h2 id="organization-heading">Dari kebutuhan tim hingga ringkasan hasil.</h2>
            <p>
              Mulai dari konteks kerja tim. Komponen program dan bentuk laporan ditentukan
              bersama sesuai kebutuhan, peserta, serta data yang tersedia.
            </p>
            <dl className={styles.organizationBrief}>
              <div>
                <dt>Konteks</dt>
                <dd>Peran, tantangan, dan prioritas kerja</dd>
              </div>
              <div>
                <dt>Peserta</dt>
                <dd>Peserta, level awal, dan kebutuhan akses</dd>
              </div>
              <div>
                <dt>Pelaksanaan</dt>
                <dd>Format, durasi, fasilitator, dan dukungan</dd>
              </div>
              <div>
                <dt>Evaluasi</dt>
                <dd>Penilaian, penyelesaian, sertifikat, dan laporan</dd>
              </div>
            </dl>
            <a className={styles.inkAction} href={SAFE_STATIC_DESTINATIONS.organization}>
              Pelajari program organisasi
              <ArrowIcon />
            </a>
          </div>
          <ol className={styles.organizationSteps}>
            {ORGANIZATION_STEPS.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div>
                  <p className={styles.organizationQuestion}>{step.question}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  <small>
                    <span>Hasil</span>
                    {step.output}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-10"
        className={`${styles.band} ${styles.inspectBand}`}
        aria-labelledby="inspect-heading"
        data-lower-page="inspection-matrix"
      >
        <div className={styles.contentWidth}>
          <div className={styles.inspectLead}>
            <SectionLead
              headingId="inspect-heading"
              heading="Apa yang dapat ditinjau organisasi?"
            />
            <p className={styles.inspectIntro}>
              Ringkasan membantu HR/L&amp;D meninjau partisipasi, kemajuan, penilaian,
              sertifikat, dan laporan berdasarkan data yang disepakati.
            </p>
          </div>
          <div className={styles.inspectMatrix}>
            <div className={styles.inspectMatrixHeader} aria-hidden="true">
              <span>Area</span>
              <span>Yang dapat dijelaskan</span>
              <span>Checkpoint</span>
            </div>
            {INSPECTION_GROUPS.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <ul>
                  {group.checkpoints.map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className={styles.inspectBoundary}>
            Isi, akses, format, dan waktu penyampaian mengikuti ruang lingkup program.
          </p>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-11"
        className={`${styles.band} ${styles.faqBand}`}
        aria-labelledby="faq-heading"
        data-lower-page="faq-stack"
      >
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <SectionLead headingId="faq-heading" heading="Pertanyaan sebelum Anda mulai." />
            <p>
              Temukan jawaban tentang pilihan belajar, program untuk tim, sertifikat, data,
              dan pembayaran.
            </p>
            <a className={styles.textAction} href={SAFE_STATIC_DESTINATIONS.contact}>
              Hubungi Skillary
              <ArrowIcon />
            </a>
          </div>
          <div className={styles.faqList}>
            <FaqItem title="Apakah Skillary melayani individu dan organisasi?">
              Ya. Individu dapat menjelajahi program yang tersedia. Organisasi memulai dari
              kebutuhan tim agar peserta, cara pelaksanaan, penilaian, dan bentuk evaluasi
              dapat disusun sesuai ruang lingkup.
            </FaqItem>
            <FaqItem title="Kapan workshop berikutnya tersedia?">
              {data.sections.workshops.status === "confirmed"
                ? "Jadwal yang tampil telah melewati pemeriksaan publikasi. Periksa detail sesi sebelum mendaftarkan minat."
                : `${data.sections.workshops.message} Kami tidak menampilkan tanggal, host, harga, atau ketersediaan kursi sebelum datanya terverifikasi.`}
            </FaqItem>
            <FaqItem title="Apa saja yang dapat masuk ke program organisasi?">
              Struktur program dapat mencakup materi, sesi fasilitasi, praktik, penilaian,
              dukungan, sertifikat, dan laporan. Komponen akhirnya mengikuti kebutuhan serta
              kesepakatan ruang lingkup—tidak otomatis sama untuk setiap program.
            </FaqItem>
            <FaqItem title="Apakah setiap program menyediakan penilaian dan sertifikat?">
              Tidak selalu dengan struktur yang sama. Penilaian mengikuti rancangan program,
              sedangkan sertifikat hanya tersedia ketika syarat penyelesaian dan penerbitan
              yang berlaku terpenuhi.
            </FaqItem>
            <FaqItem title="Data apa yang dapat dilihat HR atau L&D?">
              Bergantung pada data dan ruang lingkup program—misalnya partisipasi,
              penyelesaian, penilaian, status sertifikat, atau ringkasan program. Isi,
              penerima, format, dan waktu penyampaian harus dikonfirmasi lebih dulu.
            </FaqItem>
            <FaqItem title="Apakah pembayaran online sudah tersedia?">
              {HOMEPAGE_PAYMENT_POLICY.message} Tidak ada CTA checkout pada homepage preview.
              Gunakan halaman detail atau hubungi Skillary untuk langkah berikutnya.
            </FaqItem>
          </div>
        </div>
      </BlueprintBand>

      <BlueprintBand
        bandId="SK-HP-12"
        className={`${styles.band} ${styles.closingBand}`}
        aria-labelledby="closing-heading"
        data-lower-page="audience-closing"
      >
        <div className={`${styles.contentWidth} ${styles.closingLayout}`}>
          <div className={styles.closingIntro}>
            <SectionLead headingId="closing-heading" heading="Pilih langkah berikutnya." inverse />
            <p>
              Mulai dari program yang dapat Anda periksa sekarang, atau bawa konteks tim
              untuk dibahas bersama Skillary.
            </p>
          </div>
          <div className={styles.closingGrid}>
            <article data-audience="individual">
              <span className={styles.closingAudienceIcon}>
                <AudienceIcon kind="individual" />
              </span>
              <p>Untuk individu</p>
              <h3>Temukan program, lalu periksa detailnya.</h3>
              <span>Yang dapat dilakukan sekarang</span>
              <ul>
                <li>Bandingkan topik dan level</li>
                <li>Periksa durasi serta format</li>
                <li>Lihat tujuan dan struktur program</li>
              </ul>
              <a className={styles.primaryAction} href={SAFE_STATIC_DESTINATIONS.programSection}>
                {SAFE_CTA_COPY.exploreCatalog}
                <ArrowIcon />
              </a>
            </article>
            <article data-audience="organization">
              <span className={styles.closingAudienceIcon}>
                <AudienceIcon kind="organization" />
              </span>
              <p>Untuk organisasi</p>
              <h3>Bawa konteks tim, bukan sekadar daftar topik.</h3>
              <span>Siapkan untuk konsultasi</span>
              <ul>
                <li>Peserta dan kebutuhan kerja</li>
                <li>Format dan batas pelaksanaan</li>
                <li>Hasil dan bentuk evaluasi</li>
              </ul>
              <a className={styles.closingOrganizationAction} href={SAFE_STATIC_DESTINATIONS.contact}>
                Diskusikan kebutuhan tim
                <ArrowIcon />
              </a>
            </article>
          </div>
          <p className={styles.closingReassurance}>
            Belum siap memilih? Mulai dari program atau konsultasikan kebutuhan tim.
          </p>
        </div>
      </BlueprintBand>
    </div>
  );
}

function HeroFigure({ tone }: { tone: "individual" | "organization" }) {
  const isIndividual = tone === "individual";
  const figure = isIndividual
    ? {
        image: "/images/homepage-preview/hero-individual-cutout-v2.png",
        alt: "Ilustrasi profesional individu yang sedang membangun skill kerja",
        capabilities: [
          { label: "Program terstruktur", kind: "learn" as const },
          { label: "Praktik berbasis project", kind: "practice" as const },
          { label: "Bukti hasil belajar", kind: "evidence" as const },
        ],
      }
    : {
        image: "/images/homepage-preview/hero-organization-cutout-v2.png",
        alt: "Ilustrasi pemimpin tim yang merancang program belajar organisasi",
        capabilities: [
          { label: "Program untuk tim", kind: "learn" as const },
          { label: "Pantau kemajuan", kind: "practice" as const },
          { label: "Ringkasan hasil", kind: "evidence" as const },
        ],
      };

  return (
    <figure
      className={`${styles.heroFigure} ${
        isIndividual ? styles.figureIndividual : styles.figureOrganization
      }`}
    >
      <div className={styles.heroPortraitFrame}>
        <span aria-hidden="true" className={styles.heroPortraitShape} />
        <Image
          alt={figure.alt}
          className={styles.heroPortrait}
          fill
          loading="eager"
          sizes="(max-width: 519px) 82vw, (max-width: 939px) 42vw, 28vw"
          src={figure.image}
        />
        <figcaption className={styles.visuallyHidden}>{figure.alt}</figcaption>
      </div>
      {figure.capabilities.map((capability, index) => (
        <span
          aria-label={capability.label}
          className={styles.capabilityBubble}
          data-slot={index + 1}
          key={capability.label}
          role="img"
        >
          <CapabilityIcon kind={capability.kind} />
          <span className={styles.visuallyHidden}>{capability.label}</span>
        </span>
      ))}
    </figure>
  );
}

function SectionLead({
  heading,
  headingId,
  inverse = false,
}: {
  heading: string;
  headingId: string;
  inverse?: boolean;
}) {
  return (
    <div className={`${styles.sectionLead} ${inverse ? styles.sectionLeadInverse : ""}`}>
      <h2 id={headingId}>{heading}</h2>
    </div>
  );
}

function CatalogStatus({
  presentation,
}: {
  presentation: HomepagePreviewData["catalogPresentation"];
}) {
  return (
    <div className={styles.catalogStatus} aria-label="Status katalog homepage preview">
      <strong>{presentation.approvedReachableItemCount}</strong>
      <span>
        {presentation.mode === "catalog"
          ? "pilihan terkurasi dapat dibuka"
          : "pilihan terverifikasi tersedia"}
      </span>
      <small>{presentation.label}</small>
    </div>
  );
}

function GuidedGoals({
  section,
}: {
  section: HomepageSectionState<HomepageProgramCard>;
}) {
  if (section.status !== "confirmed") {
    return (
      <div className={styles.guidedGoalsUnavailable}>
        <p>Panduan tujuan akan tampil bersama program yang telah lolos pemeriksaan.</p>
        <a href={section.action.href}>{section.action.label}</a>
      </div>
    );
  }

  const programsBySlug = new Map(section.items.map((program) => [program.slug, program]));
  const goals = GUIDED_GOALS.flatMap((goal) => {
    const program = programsBySlug.get(goal.slug);
    return program ? [{ ...goal, program }] : [];
  });

  return (
    <div className={styles.guidedGoals} aria-label="Panduan program berdasarkan tujuan kerja">
      <div className={styles.guidedGoalsStatement}>
        <h3>Tujuan dulu. Program setelahnya.</h3>
        <span>
          Setiap tujuan mengarah ke satu program yang dapat diperiksa. Urutannya membantu
          memilih, bukan menunjukkan peringkat.
        </span>
      </div>
      <div className={styles.guidedGoalList}>
        {goals.map((goal) => (
          <a href={goal.program.href} key={goal.slug}>
            <GoalIcon kind={goal.kind} />
            <span className={styles.guidedGoalCopy}>
              <strong>{goal.title}</strong>
              <span>{goal.copy}</span>
              <small>{goal.signal}</small>
            </span>
            <span className={styles.guidedGoalProgram}>
              <span>{goal.program.title}</span>
              <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function DiscoveryGroup<TItem>({
  heading,
  headingId,
  section,
  renderItems,
}: {
  heading: string;
  headingId: string;
  section: HomepageSectionState<TItem>;
  renderItems: (items: readonly TItem[]) => React.ReactNode;
}) {
  return (
    <section className={styles.discoveryGroup} aria-labelledby={headingId}>
      <div className={styles.discoveryGroupHeading}>
        <h3 id={headingId} tabIndex={-1}>
          {heading}
        </h3>
        <span>{section.status === "confirmed" ? "Terkurasi" : "Status sumber"}</span>
      </div>
      {section.status === "confirmed" ? (
        renderItems(section.items)
      ) : (
        <SourceStatePanel section={section} />
      )}
    </section>
  );
}

function SourceStatePanel({
  section,
}: {
  section: Exclude<HomepageSectionState<never>, { status: "confirmed" }>;
}) {
  const isWorkshop = section.source === "manual.workshopRegistry";
  const isLearningPath = section.source === "prisma.learningPath";

  return (
    <div
      className={styles.sourceState}
      data-source-state={section.status}
      data-workshop-state={isWorkshop ? "true" : undefined}
    >
      <div>
        <p>
          {isWorkshop && section.status === "empty"
            ? "Belum ada jadwal terverifikasi"
            : section.status === "empty"
              ? "Belum ada item terverifikasi"
              : "Sumber belum tersedia"}
        </p>
        <h4>{section.title}</h4>
        <span>{section.message}</span>
        {isWorkshop ? (
          <small>
            Tanggal, host, harga, dan ketersediaan kursi tidak ditampilkan sebelum lolos
            verifikasi publikasi.
          </small>
        ) : null}
        {isLearningPath ? (
          <ul className={styles.sourceReadinessList} aria-label="Kriteria jalur belajar">
            <li>Tujuan dan urutan program yang jelas</li>
            <li>Seluruh program di dalam jalur siap dibuka</li>
            <li>Halaman detail jalur telah ditinjau</li>
          </ul>
        ) : null}
      </div>
      <div className={styles.sourceStateAction}>
        {isWorkshop ? (
          <dl aria-label="Informasi yang akan diperiksa sebelum workshop dipublikasikan">
            <div><dt>Waktu</dt><dd>Tanggal dan zona waktu</dd></div>
            <div><dt>Sesi</dt><dd>Format, level, dan hasil</dd></div>
            <div><dt>Host</dt><dd>Profil yang telah terverifikasi</dd></div>
          </dl>
        ) : null}
        <a href={section.action.href}>
          {section.action.label}
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

function ProgramCards({ items }: { items: readonly HomepageProgramCard[] }) {
  return (
    <div className={styles.sourceCardGrid}>
      {items.slice(0, 4).map((item) => (
        <article
          className={`${styles.sourceCard} ${styles.programCard}`}
          id={`program-${item.slug}`}
          key={item.id}
        >
          <figure className={styles.programCardMedia}>
            <Image
              alt={item.thumbnailAlt}
              className={styles.programCardImage}
              fill
              loading="lazy"
              sizes="(max-width: 519px) calc(100vw - 40px), (max-width: 1199px) 50vw, 300px"
              src={item.thumbnailUrl}
            />
            <figcaption>{item.thumbnailLabel}</figcaption>
          </figure>
          <div className={styles.programCardBody}>
            <p>{item.categoryLabel}</p>
            <h4>{item.title}</h4>
            <div className={styles.sourceCardMeta}>
              <span>{item.level}</span>
              <span>{item.duration}</span>
              <span>{item.moduleCount} modul</span>
              <span>{item.outcomeCount} hasil belajar</span>
            </div>
            <p className={styles.sourceCardDescription}>{item.description}</p>
            <p className={styles.programFormats}>{item.formats.join(" · ")}</p>
            <a href={item.href}>
              {item.actionLabel}
              <ArrowIcon />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function WorkshopCards({ items }: { items: readonly HomepageWorkshopCard[] }) {
  return (
    <div className={styles.sourceCardGrid}>
      {items.slice(0, 4).map((item) => {
        const schedule = formatWorkshopSchedule(item);
        return (
          <article className={`${styles.sourceCard} ${styles.workshopCard}`} key={item.id}>
            <p>{item.workshopKind}</p>
            <div className={styles.workshopSchedule}>
              <time dateTime={item.startsAt}>{schedule.date}</time>
              <strong>{schedule.time}</strong>
            </div>
            <h4>{item.title}</h4>
            <div className={styles.sourceCardMeta}>
              <span>{item.format}</span>
              <span>{item.level}</span>
              <span>{formatDuration(item.durationMinutes)}</span>
              <span>
                {item.registrationState === "interest" ? "Pendaftaran minat" : item.registrationState}
              </span>
            </div>
            <p className={styles.sourceCardDescription}>{item.summary}</p>
            <div className={styles.workshopOutcome}>
              <span>Hasil sesi</span>
              <p>{item.sessionOutcome}</p>
            </div>
            <p className={styles.workshopHost}>Faculty: {item.host.name}</p>
            <small>
              Jadwal ditinjau {formatReviewedDate(item.reviewedAt)} · {item.timeZone}
            </small>
            <a href={item.href}>
              {item.actionLabel}
              <ArrowIcon />
            </a>
          </article>
        );
      })}
    </div>
  );
}

function LearningPathCards({ items }: { items: readonly HomepageLearningPathCard[] }) {
  return (
    <div className={styles.sourceCardGrid}>
      {items.slice(0, 4).map((item) => (
        <article className={styles.sourceCard} key={item.id}>
          <p>Jalur Belajar</p>
          <h4>{item.title}</h4>
          <div className={styles.sourceCardMeta}>
            <span>{item.mode === "GUIDED" ? "Terarah" : "Berurutan"}</span>
            <span>{item.courseCount} program</span>
          </div>
          <p className={styles.sourceCardDescription}>{item.description}</p>
          <a href={item.href}>
            {item.actionLabel}
            <ArrowIcon />
          </a>
        </article>
      ))}
    </div>
  );
}

function formatWorkshopSchedule(item: HomepageWorkshopCard) {
  const startsAt = new Date(item.startsAt);
  const endsAt = new Date(item.endsAt);
  const date = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    timeZone: item.timeZone,
    weekday: "long",
    year: "numeric",
  }).format(startsAt);
  const timeFormatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: item.timeZone,
    timeZoneName: "short",
  });

  return {
    date,
    time: `${timeFormatter.format(startsAt)}–${timeFormatter.format(endsAt)}`,
  };
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours === 0) return `${minutes} menit`;
  return remainder === 0 ? `${hours} jam` : `${hours} jam ${remainder} menit`;
}

function formatReviewedDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Jakarta",
    year: "numeric",
  }).format(new Date(value));
}

function ProductProofCanvas({
  variant,
}: {
  variant: (typeof PRODUCT_VIEWS)[number]["variant"];
}) {
  if (variant === "project") {
    return (
      <div className={styles.proofCanvas} data-proof-canvas="project" aria-hidden="true">
        <div className={styles.proofWindowBar}>
          <span>Ruang kerja project</span>
          <i>CONTOH</i>
        </div>
        <div className={styles.projectWorkspace}>
          <aside>
            <strong>Project</strong>
            <span data-active="true">Ringkasan</span>
            <span>Pengerjaan</span>
            <span>Tinjauan</span>
          </aside>
          <div className={styles.projectDocument}>
            <div className={styles.projectDocumentHeading}>
              <div>
                <span>Tugas terapan</span>
                <strong>Dashboard keputusan</strong>
              </div>
              <i>Contoh</i>
            </div>
            <div className={styles.projectDocumentGrid}>
              <div>
                <span>Konteks kerja</span>
                <p>Situasi dan keputusan yang ingin didukung.</p>
              </div>
              <div>
                <span>Hasil</span>
                <p>Artefak yang dapat ditinjau kembali.</p>
              </div>
              <div>
                <span>Kriteria</span>
                <p>Kejelasan, relevansi, dan penerapan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "assessment") {
    return (
      <div className={styles.proofCanvas} data-proof-canvas="assessment" aria-hidden="true">
        <div className={styles.proofWindowBar}>
          <span>Tinjauan penilaian</span>
          <i>ANONIM</i>
        </div>
        <div className={styles.assessmentSheet}>
          <div>
            <span>Penilaian terapan</span>
            <strong>Peninjauan berbasis kriteria</strong>
          </div>
          <ul>
            <li><span>Kesesuaian dengan ringkasan</span><i>Ditinjau</i></li>
            <li><span>Kejelasan keputusan</span><i>Umpan balik</i></li>
            <li><span>Kualitas penyajian</span><i>Kriteria</i></li>
          </ul>
          <p>Catatan peninjauan mengikuti struktur program.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.proofCanvas} data-proof-canvas="credential" aria-hidden="true">
      <div className={styles.proofWindowBar}>
        <span>Rekam sertifikat</span>
        <i>CONTOH</i>
      </div>
      <div className={styles.credentialRecord}>
        <div className={styles.credentialMark}>S</div>
        <span>Sertifikat Skillary</span>
        <strong>Penerima anonim</strong>
        <dl>
          <div><dt>Program</dt><dd>Sesuai ruang lingkup</dd></div>
          <div><dt>Dasar penerbitan</dt><dd>Penilaian</dd></div>
          <div><dt>Status rekam</dt><dd>Contoh tampilan</dd></div>
        </dl>
      </div>
    </div>
  );
}

function ArtifactCanvas({
  variant,
}: {
  variant: (typeof ARTIFACTS)[number]["variant"];
}) {
  if (variant === "brief") {
    return (
      <div className={styles.artifactCanvas} data-artifact="brief" aria-hidden="true">
        <div className={styles.documentHeader}>
          <span>RINGKASAN PROJECT</span>
          <i>CONTOH</i>
        </div>
        <strong>Dashboard keputusan</strong>
        <p>Dokumen kerja anonim</p>
        <dl className={styles.briefSections}>
          <div><dt>Konteks</dt><dd>Situasi kerja yang akan dianalisis.</dd></div>
          <div><dt>Hasil</dt><dd>Bentuk hasil yang perlu disusun.</dd></div>
          <div><dt>Tinjauan</dt><dd>Kriteria yang dipakai untuk meninjau.</dd></div>
        </dl>
      </div>
    );
  }

  if (variant === "rubric") {
    return (
      <div className={styles.artifactCanvas} data-artifact="rubric" aria-hidden="true">
        <div className={styles.documentHeader}>
          <span>RUBRIK &amp; UMPAN BALIK</span>
          <i>ANONIM</i>
        </div>
        <strong>Lembar peninjauan</strong>
        <div className={styles.rubricTable}>
          <div><span>Relevansi</span><i>Sesuai kriteria</i></div>
          <div><span>Kejelasan</span><i>Catatan peninjau</i></div>
          <div><span>Penerapan</span><i>Tindak lanjut</i></div>
        </div>
        <p className={styles.feedbackNote}>Umpan balik contoh tanpa nilai peserta.</p>
      </div>
    );
  }

  return (
    <div className={styles.artifactCanvas} data-artifact="credential" aria-hidden="true">
      <div className={styles.documentHeader}>
        <span>REKAM VERIFIKASI</span>
        <i>CONTOH</i>
      </div>
      <div className={styles.artifactCredentialMark}>S</div>
      <strong>Rekam sertifikat</strong>
      <p>Contoh — bukan sertifikat valid</p>
      <dl className={styles.verificationFields}>
        <div><dt>Program</dt><dd>Sesuai program</dd></div>
        <div><dt>Kriteria</dt><dd>Penilaian</dd></div>
        <div><dt>Rekam</dt><dd>Tidak dapat diverifikasi</dd></div>
      </dl>
    </div>
  );
}

function FaqItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className={styles.faqItem}>
      <summary>{title}</summary>
      <p>{children}</p>
    </details>
  );
}
