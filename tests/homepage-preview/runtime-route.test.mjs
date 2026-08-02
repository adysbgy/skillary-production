import assert from "node:assert/strict";
import test from "node:test";

const BASE_URL = process.env.HOMEPAGE_PREVIEW_BASE_URL;
const EXPECTED_BANDS = Array.from({ length: 13 }, (_, index) =>
  `SK-HP-${String(index + 1).padStart(2, "0")}`,
);

test(
  "production output satisfies the HP-S8F route, finish-integration, and progressive-enhancement gates",
  { skip: BASE_URL ? false : "set HOMEPAGE_PREVIEW_BASE_URL for output-level assertions" },
  async () => {
    const previewResponse = await fetch(`${BASE_URL}/lp/homepage-preview`);
    const previewHtml = await previewResponse.text();
    assert.equal(previewResponse.status, 200);

    const cacheControl = previewResponse.headers.get("cache-control") ?? "";
    assert.equal(/public/i.test(cacheControl), false, cacheControl);

    const robotsContent = metaContent(previewHtml, "robots").toLowerCase();
    assert.equal(robotsContent.includes("noindex"), true, robotsContent);
    assert.equal(robotsContent.includes("nofollow"), true, robotsContent);

    assert.equal(count(previewHtml, /<main\b/gi), 1);
    assert.equal(count(previewHtml, /<h1\b/gi), 1);
    assert.equal(count(previewHtml, /<header\b/gi), 1);
    assert.equal(count(previewHtml, /<footer\b/gi), 1);
    assert.equal(count(previewHtml, /data-preview-owner="header"/gi), 1);
    assert.equal(count(previewHtml, /data-preview-owner="footer"/gi), 1);
    assert.equal(count(previewHtml, /data-query-tracking="disabled"/gi), 1);
    assert.equal(previewHtml.includes('aria-label="Navigasi utama Skillary"'), true);
    assert.equal(previewHtml.includes("Bangun skill kerja yang siap dipakai."), true);
    assert.equal(previewHtml.includes("Mulai jelajahi program"), true);
    assert.equal(previewHtml.includes("Bangun skill kerja yang siap dipraktikkan."), true);
    assert.equal(previewHtml.includes("Cara yang lebih jelas untuk membangun skill kerja."), true);
    assert.equal(
      previewHtml.includes("Bangun kapabilitas tim dari kebutuhan kerja yang nyata."),
      true,
    );
    assert.equal(previewHtml.includes("Ruang lingkup yang dapat dikunci"), true);
    assert.equal(previewHtml.includes('aria-label="Menu preview mobile tanpa JavaScript"'), true);
    assert.equal(previewHtml.includes("Apa yang ingin Anda pelajari?"), true);
    assert.equal(previewHtml.includes("Ilustrasi profesional individu"), true);
    assert.equal(previewHtml.includes("Ilustrasi pemimpin tim"), true);
    assert.equal(previewHtml.includes('data-enhanced="false"'), true);
    assert.equal(previewHtml.includes("Workshop berikutnya belum dijadwalkan."), true);
    assert.equal(previewHtml.includes("Daftarkan minat workshop"), true);
    assert.equal(previewHtml.includes("Dari project ke bukti yang dapat ditinjau."), true);
    assert.equal(previewHtml.includes('data-showcase-mode="anonymous-specimen"'), true);
    assert.equal(previewHtml.includes("Periksa bentuk buktinya."), true);
    assert.equal(previewHtml.includes("Status ketika syarat terpenuhi"), true);
    assert.equal(previewHtml.includes("Dari kebutuhan tim hingga ringkasan hasil."), true);
    assert.equal(previewHtml.includes("Ringkasan membantu HR/L&amp;D meninjau partisipasi"), true);
    assert.equal(previewHtml.includes("Pertanyaan sebelum Anda mulai."), true);
    assert.equal(previewHtml.includes("Pilih langkah berikutnya."), true);
    for (const lowerPageMarker of [
      "organization-process",
      "inspection-matrix",
      "faq-stack",
      "audience-closing",
    ]) {
      assert.equal(
        previewHtml.includes(`data-lower-page="${lowerPageMarker}"`),
        true,
        lowerPageMarker,
      );
    }
    assert.equal(count(previewHtml, /<details/gi) >= 6, true);
    assert.equal(count(previewHtml, /Geser secara horizontal untuk melihat kartu berikutnya\./g), 2);
    assert.equal(count(previewHtml, /role="region"/g) >= 2, true);

    const renderedBands = [...previewHtml.matchAll(/data-homepage-band="(SK-HP-\d{2})"/g)].map(
      (match) => match[1],
    );
    // Next streams the synchronous layout shell before the async page payload, so
    // raw response order is not DOM order. Source and hydrated-browser gates own
    // order; HTTP output still has to contain each stable band exactly once.
    assert.deepEqual([...renderedBands].sort(), EXPECTED_BANDS);
    assert.equal(new Set(renderedBands).size, 13);
    assert.equal(previewHtml.includes("data-conditional-proof"), false);

    assert.equal(previewHtml.includes('href="#homepage-preview-content"'), true);
    assert.match(previewHtml, /id="homepage-preview-content"[^>]*tabindex="-1"/i);
    for (const destination of ['id="program"', 'id="workshop"', 'id="jalur-belajar"']) {
      assert.equal(count(previewHtml, new RegExp(destination, "g")), 1, destination);
    }
    for (const panel of ["program-panel", "workshop-panel", "jalur-belajar-panel"]) {
      assert.match(previewHtml, new RegExp(`id="${panel}"(?![^>]*\\shidden)`), panel);
    }
    for (const forbidden of ["/events", "/checkout", "data-conditional-proof"] ) {
      assert.equal(previewHtml.includes(forbidden), false, forbidden);
    }

    const rootResponse = await fetch(`${BASE_URL}/`);
    const rootHtml = await rootResponse.text();
    assert.equal(rootResponse.status, 200);
    assert.equal(metaContent(rootHtml, "robots").toLowerCase().includes("noindex"), false);

    const sitemapResponse = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemap = await sitemapResponse.text();
    assert.equal(sitemapResponse.status, 200);
    assert.equal(sitemap.includes("/lp/homepage-preview"), false);
  },
);

function metaContent(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function count(value, pattern) {
  return value.match(pattern)?.length ?? 0;
}
