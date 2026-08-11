export type ServiceMenuItem = {
  id: string;
  name: string;
  formLabel: string;
  summary: string;
  typicalTime: string;
  priceNote: string;
  quoteHint: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const serviceMenu: ServiceMenuItem[] = [
  {
    id: "oil_change",
    name: "Oil change",
    formLabel: "Oil change",
    summary:
      "Full synthetic oil change, filter replacement, and a quick maintenance check.",
    typicalTime: "30-60 min",
    priceNote: "Starting at $85*",
    quoteHint:
      "Helpful details: mileage, oil type if known, and whether the vehicle is European or diesel.",
    imageSrc: "/images/service-oil.avif",
    imageAlt: "Motor oil being poured into an engine",
  },
  {
    id: "brakes",
    name: "Brake pads and rotors",
    formLabel: "Brake pads and rotors",
    summary:
      "Brake pad and rotor replacement. Parts, pad type, and final price are confirmed by vehicle.",
    typicalTime: "1.5-3 hr",
    priceNote: "Quote required",
    quoteHint:
      "Helpful details: front/rear/both, grinding or squealing sounds, vibration, and any warning lights.",
    imageSrc: "/images/service-brakes.avif",
    imageAlt: "Disc brake and caliper close up",
  },
  {
    id: "battery_replacement",
    name: "Battery replacement",
    formLabel: "Battery replacement",
    summary:
      "Battery testing and on-site battery replacement when the battery is the likely issue.",
    typicalTime: "30-90 min",
    priceNote: "Starting at $60 diagnostic",
    quoteHint:
      "Helpful details: battery age, recent jump starts, dim lights, and whether the car still starts.",
    imageSrc: "/images/service-battery.avif",
    imageAlt: "Mechanic testing a car battery",
  },
  {
    id: "diagnostics",
    name: "Warning lights & diagnostics",
    formLabel: "Check engine light / diagnostic",
    summary:
      "Check engine lights, drivability issues, strange sounds, leaks, and first-look troubleshooting.",
    typicalTime: "45-90 min",
    priceNote: "Starting at $80",
    quoteHint:
      "Helpful details: warning lights, symptoms, when the issue started, and whether the vehicle is safe to drive.",
  },
  {
    id: "starter_alternator",
    name: "Starters, alternators & charging",
    formLabel: "Starter / alternator / charging issue",
    summary:
      "Starting and charging issues where the battery may not be the only problem.",
    typicalTime: "1.5-3 hr",
    priceNote: "Quote required",
    quoteHint:
      "Helpful details: whether the engine cranks, battery age, recent tests, and dash lights.",
  },
  {
    id: "suspension",
    name: "Suspension & ride issues",
    formLabel: "Suspension / ride issue",
    summary:
      "Clunks, uneven ride feel, steering vibration, and common suspension part replacement.",
    typicalTime: "Inspection first",
    priceNote: "Quote required",
    quoteHint:
      "Helpful details: where the sound comes from, when it happens, and any recent impacts or repairs.",
  },
];

export const quoteServiceOptions = [
  ...serviceMenu.map((service) => ({
    value: service.id,
    label: service.formLabel,
  })),
  { value: "other", label: "Other / not sure yet" },
];

const serviceLabelById = new Map(
  quoteServiceOptions.map((service) => [service.value, service.label])
);

const legacyServiceAliases = new Map([
  ["oil_change_standard", "oil_change"],
  ["oil_change_european", "oil_change"],
  ["oil_change_diesel", "oil_change"],
  ["brakes_front", "brakes"],
  ["battery", "battery_replacement"],
  ["battery_no_start", "battery_replacement"],
  ["diagnostic", "diagnostics"],
]);

export function normalizeServiceId(serviceId: unknown) {
  if (typeof serviceId !== "string") {
    return "";
  }

  const normalized = legacyServiceAliases.get(serviceId) ?? serviceId;
  return serviceLabelById.has(normalized) ? normalized : "";
}

export function getServiceLabel(serviceId: unknown) {
  const normalized = normalizeServiceId(serviceId);
  return normalized ? serviceLabelById.get(normalized) ?? normalized : "";
}

export function getServiceMenuItem(serviceId: unknown) {
  const normalized = normalizeServiceId(serviceId);
  return serviceMenu.find((service) => service.id === normalized);
}
