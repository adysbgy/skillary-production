"use client";

import { useId, useMemo, useRef, useState } from "react";

import type { HomepageSearchEntry } from "../data/types";
import { CloseIcon, SearchIcon } from "./PreviewIcons";
import styles from "../HomepagePreview.module.css";

interface PreviewSearchProps {
  entries: readonly HomepageSearchEntry[];
  compact?: boolean;
  sourceState?: "ready" | "loading" | "unavailable";
}

export function PreviewSearch({
  entries,
  compact = false,
  sourceState = "ready",
}: PreviewSearchProps) {
  const inputId = useId();
  const resultsId = useId();
  const statusId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return entries
      .filter((entry) =>
        [entry.label, entry.description, ...entry.keywords]
          .join(" ")
          .toLocaleLowerCase("id-ID")
          .includes(normalizedQuery),
      )
      .slice(0, 6);
  }, [entries, normalizedQuery]);

  const state = !normalizedQuery
    ? sourceState === "ready"
      ? "idle"
      : sourceState
    : results.length > 0
      ? "results"
      : sourceState === "ready"
        ? "empty"
        : sourceState;
  const showResults = isExpanded && (normalizedQuery.length > 0 || sourceState !== "ready");
  const announcement =
    state === "results"
      ? `${results.length} tujuan ditemukan.`
      : state === "empty"
        ? "Belum ada hasil yang cocok."
        : state === "loading"
          ? "Sedang memeriksa tujuan terverifikasi."
          : state === "unavailable"
            ? "Hasil dinamis sedang tidak tersedia. Tujuan statis tetap dapat dicari."
            : "Pencarian siap digunakan.";

  return (
    <div
      aria-label="Cari tujuan Skillary"
      className={`${styles.previewSearch} ${compact ? styles.previewSearchCompact : ""}`}
      data-search-state={state}
      data-query-tracking="disabled"
      role="search"
    >
      <label className={styles.visuallyHidden} htmlFor={inputId}>
        Cari program, workshop, atau halaman Skillary
      </label>
      <div className={styles.searchField}>
        <SearchIcon />
        <input
          aria-controls={resultsId}
          aria-describedby={statusId}
          autoComplete="off"
          id={inputId}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsExpanded(true);
          }}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsExpanded(false);
              inputRef.current?.focus({ preventScroll: true });
            }
          }}
          placeholder="Apa yang ingin Anda pelajari?"
          ref={inputRef}
          type="search"
          value={query}
        />
        {normalizedQuery ? (
          <button
            aria-label="Hapus pencarian"
            className={styles.searchClear}
            onClick={() => {
              setQuery("");
              setIsExpanded(false);
              window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
            }}
            type="button"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>

      <div
        aria-busy={state === "loading"}
        aria-label="Hasil pencarian Skillary"
        className={styles.searchResults}
        hidden={!showResults}
        id={resultsId}
        role="region"
      >
        {results.length > 0 ? (
          <>
            <p>{results.length} tujuan ditemukan</p>
            <ul>
              {results.map((entry) => (
                <li key={entry.id}>
                  <a href={entry.href} onClick={() => setIsExpanded(false)}>
                    <strong>{entry.label}</strong>
                    <span>{entry.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : state === "loading" ? (
          <div className={styles.searchEmpty}>
            <strong>Memeriksa tujuan terverifikasi…</strong>
            <span>Bagian dan halaman statis Skillary tetap tersedia.</span>
          </div>
        ) : state === "unavailable" ? (
          <div className={styles.searchEmpty}>
            <strong>Hasil dinamis sedang tidak tersedia.</strong>
            <span>Coba program, workshop, sertifikasi, organisasi, atau halaman Skillary.</span>
          </div>
        ) : (
          <div className={styles.searchEmpty}>
            <strong>Belum ada hasil yang cocok.</strong>
            <span>Coba kata seperti program, workshop, sertifikasi, atau organisasi.</span>
          </div>
        )}
      </div>
      <p aria-live="polite" className={styles.visuallyHidden} id={statusId} role="status">
        {announcement}
      </p>
    </div>
  );
}
