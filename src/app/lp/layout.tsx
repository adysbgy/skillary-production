/**
 * Layout for /lp/* routes (landing pages).
 * 
 * Intentionally does NOT render the global <Header /> or <Footer />
 * so each landing page can have its own isolated compact header/footer.
 */
export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
