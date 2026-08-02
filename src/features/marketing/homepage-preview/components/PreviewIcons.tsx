export function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function CapabilityIcon({ kind }: { kind: "learn" | "practice" | "evidence" }) {
  if (kind === "learn") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 5.5h9.5A2.5 2.5 0 0 1 17 8v10.5H7.5A2.5 2.5 0 0 1 5 16Z" />
        <path d="M7.5 18.5A2.5 2.5 0 0 1 5 16c0-1.4 1.1-2.5 2.5-2.5H17" />
      </svg>
    );
  }

  if (kind === "practice") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 4h10v16H7z" />
        <path d="M9.5 8h5M9.5 12h5M9.5 16h3" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="10" r="5" />
      <path d="m9 14-1 6 4-2 4 2-1-6" />
      <path d="m10 10 1.3 1.3L14 8.5" />
    </svg>
  );
}

export function AudienceIcon({ kind }: { kind: "individual" | "organization" }) {
  if (kind === "individual") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="17" r="7" />
        <path d="M11 39c1.5-8 6-12 13-12s11.5 4 13 12" />
        <path d="M16 11.5c2-3 4.7-4.5 8-4.5s6 1.5 8 4.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <circle cx="24" cy="15" r="6" />
      <circle cx="11" cy="21" r="4.5" />
      <circle cx="37" cy="21" r="4.5" />
      <path d="M14 39c1.2-7.2 4.6-11 10-11s8.8 3.8 10 11" />
      <path d="M3.5 38c.8-5.4 3.3-8.2 7.5-8.2 2 0 3.7.6 5 1.8M44.5 38c-.8-5.4-3.3-8.2-7.5-8.2-2 0-3.7.6-5 1.8" />
    </svg>
  );
}

export function LearningFormatIcon({
  kind,
}: {
  kind: "path" | "program" | "workshop" | "project";
}) {
  if (kind === "path") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="10" cy="36" r="4" />
        <circle cx="24" cy="12" r="4" />
        <circle cx="38" cy="32" r="4" />
        <path d="M13 33c4-3 5-8 7-13M28 14c5 2 7 7 8 13" />
        <path d="m18 24 2-4 4 2M32 23l4 4-3 3" />
      </svg>
    );
  }

  if (kind === "program") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <path d="M9 9h23a6 6 0 0 1 6 6v24H15a6 6 0 0 1-6-6Z" />
        <path d="M15 39a6 6 0 0 1-6-6c0-3.3 2.7-6 6-6h23M16 17h15M16 22h10" />
      </svg>
    );
  }

  if (kind === "workshop") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <rect x="7" y="9" width="34" height="27" rx="2" />
        <path d="M7 17h34M15 6v6M33 6v6" />
        <path d="m21 22 8 5-8 5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M9 8h24l6 6v26H9Z" />
      <path d="M33 8v8h6M15 22h18M15 28h12" />
      <circle cx="31" cy="34" r="6" />
      <path d="m28.5 34 1.8 1.8 3.5-4" />
    </svg>
  );
}

export function GoalIcon({
  kind,
}: {
  kind: "dashboard" | "decision" | "ai" | "presentation";
}) {
  if (kind === "dashboard") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <rect x="7" y="8" width="34" height="30" rx="2" />
        <path d="M7 17h34M16 17v21" />
        <path d="M22 31v-6M28 31v-10M34 31v-4" />
      </svg>
    );
  }

  if (kind === "decision") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 8v8M40 24h-8M24 40v-8M8 24h8" />
        <path d="m17 25 5 5 10-12" />
      </svg>
    );
  }

  if (kind === "ai") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <rect x="10" y="10" width="28" height="28" rx="5" />
        <path d="M17 4v6M31 4v6M17 38v6M31 38v6M4 17h6M4 31h6M38 17h6M38 31h6" />
        <path d="M18 29V19h5a4 4 0 0 1 0 8h-5M30 19v10" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M8 9h32v24H8Z" />
      <path d="M16 40h16M24 33v7M14 27l7-7 5 4 8-9" />
      <circle cx="34" cy="15" r="2" />
    </svg>
  );
}
