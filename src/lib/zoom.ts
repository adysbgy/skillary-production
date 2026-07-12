// Zoom Server-to-Server OAuth. Registers each paid buyer as a meeting
// registrant so they get a UNIQUE join link — which lets Zoom tie attendance
// to their email (basis for automated attendance → certificate in Fase D).
// Fails soft (returns null) when Zoom credentials aren't configured.

const ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

let cached: { token: string; exp: number } | null = null;

async function getToken(): Promise<string | null> {
  if (!ACCOUNT_ID || !CLIENT_ID || !CLIENT_SECRET) return null;
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  try {
    const res = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ACCOUNT_ID}`,
      { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    cached = { token: data.access_token, exp: Date.now() + (data.expires_in ?? 3600) * 1000 };
    return cached.token;
  } catch (err) {
    console.warn("Zoom token failed:", err);
    return null;
  }
}

export async function createMeetingRegistrant(
  meetingId: string,
  buyer: { email: string; name: string }
): Promise<{ joinUrl: string } | null> {
  const token = await getToken();
  if (!token) return null;
  const [first, ...rest] = buyer.name.trim().split(/\s+/);
  try {
    const res = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}/registrants`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: buyer.email,
        first_name: first || buyer.email,
        last_name: rest.join(" ") || "-",
      }),
    });
    if (!res.ok) {
      console.warn("Zoom registrant failed:", res.status);
      return null;
    }
    const data = await res.json();
    return data.join_url ? { joinUrl: data.join_url } : null;
  } catch (err) {
    console.warn("Zoom registrant error:", err);
    return null;
  }
}
