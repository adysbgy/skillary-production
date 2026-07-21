import { PRIVATE_ROUTE_METADATA } from "@/lib/private-route-metadata";

export const metadata = PRIVATE_ROUTE_METADATA;

export default function EventCheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
