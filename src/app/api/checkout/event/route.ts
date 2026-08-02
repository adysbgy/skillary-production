import { NextResponse } from "next/server";

/**
 * Event commerce is fail-closed until checkout is backed by an approved entry in
 * the commercial offer registry and a real database schedule. The legacy static
 * event catalog is illustrative and must never create an order.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "Pendaftaran webinar berbayar belum tersedia. Jadwal berikutnya sedang dikurasi.",
      code: "EVENT_COMMERCE_HOLD",
    },
    { status: 503 },
  );
}
