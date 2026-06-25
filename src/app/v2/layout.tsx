// Header & footer are now provided by the root layout (production switch).
// This layout is kept as a passthrough so /v2/* routes continue to resolve
// without rendering a second, duplicate set of chrome.
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
