const PENDO_INTEGRATION_KEY = process.env.PENDO_INTEGRATION_KEY ?? "";
const PENDO_DATA_HOST =
  process.env.PENDO_DATA_HOST ?? "https://data.pendo-dev.pendo-dev.com";

export function pendoTrack(
  event: string,
  properties: Record<string, string | number | boolean> = {},
): void {
  if (!PENDO_INTEGRATION_KEY) return;

  const body = JSON.stringify({
    type: "track",
    event,
    visitorId: "system",
    accountId: "system",
    timestamp: Date.now(),
    properties,
  });

  fetch(`${PENDO_DATA_HOST}/data/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-pendo-integration-key": PENDO_INTEGRATION_KEY,
    },
    body,
  }).catch((err: unknown) => {
    console.error("Pendo track error:", err);
  });
}
