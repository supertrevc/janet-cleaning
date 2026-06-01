// Single source of truth for Janet's Cleaning business constants.
// Used across the UI, JSON-LD, sitemap, and metadata.
//
// NOTE: This is a home-based business — we intentionally DO NOT publish a street
// address. Only the Denver metro service area is exposed publicly and in schema.

export const business = {
  name: "Janet's Cleaning",
  owner: "Janet Liliana",
  // Phone is the priority conversion channel.
  phoneDisplay: "(720) 690-9613",
  phoneHref: "tel:+17206909613",
  email: "lilianajanet041582@gmail.com",
  emailHref: "mailto:lilianajanet041582@gmail.com",
  city: "Denver",
  region: "CO",
  regionName: "Colorado",
  areaServed: "Denver Metro",
  yearsInBusiness: "8+",
  // Used only for LocalBusiness foundingDate (≈8+ years of service as of 2026).
  foundingDate: "2017",
  // Service-area cities within the Denver metro (no street address — home-based).
  serviceCities: [
    "Denver",
    "Aurora",
    "Lakewood",
    "Centennial",
    "Englewood",
    "Littleton",
    "Arvada",
    "Westminster",
    "Thornton",
    "Wheat Ridge",
    "Commerce City",
    "Glendale",
  ],
  priceRange: "$$",
  // Hours are unknown — do NOT invent them. The UI surfaces a clearly-marked
  // placeholder, and JSON-LD omits openingHoursSpecification until confirmed.
  hours: null as null | { day: string; open: string; close: string }[],
  // Update with real handles before launch.
  social: {
    nextdoor: "",
    google: "",
    facebook: "",
  },
} as const;

// Service identifiers — copy lives in the localized dictionaries, keyed by slug.
export const serviceSlugs = [
  "recurring",
  "deep",
  "moveInOut",
  "office",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const addOnKeys = ["fridge", "oven", "windows", "laundry"] as const;

export type AddOnKey = (typeof addOnKeys)[number];
