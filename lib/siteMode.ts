export type SiteVariant = "full" | "holding";

export function getSiteVariant(): SiteVariant {
  return process.env.SLK_SITE_VARIANT === "holding" ? "holding" : "full";
}

export function isHoldingSite() {
  return getSiteVariant() === "holding";
}
