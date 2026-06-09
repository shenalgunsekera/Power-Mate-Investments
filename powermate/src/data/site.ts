/**
 * Language-neutral site data.
 *
 * ⚠️ PLACEHOLDER DATA — replace phone numbers, addresses, email, and branch
 * coordinates with the real Power Mate Investment details (the Facebook page
 * could not be scraped automatically). Structure and types are production-ready.
 */

export const company = {
  name: "Power Mate Investment",
  tagline: "Strengthening Your Financial Power",
  phone: "011 2080 8888",
  phoneHref: "tel:+941120808888",
  hotline: "011 2080 8888",
  email: "info@powermate.lk",
  whatsapp: "070 708 0033",
  whatsappHref: "https://wa.me/94707080033",
  facebook: "https://www.facebook.com/powermateinvestments",
  address: "973/3A, Oruwala, Athurugiriya, Colombo",
  hoursWeekday: "8:30 AM – 5:00 PM",
  hoursSaturday: "8:30 AM – 1:00 PM",
  established: 2020,
  branchCount: 6,
  customersServed: "10,000+",
} as const;

export type ProductKey =
  | "micro"
  | "sme"
  | "agriculture"
  | "gold"
  | "leasing"
  | "insurance";

/** Stable ordering + icon mapping. Labels/descriptions live in the dictionaries. */
export const productOrder: ProductKey[] = [
  "micro",
  "sme",
  "agriculture",
  "gold",
  "leasing",
  "insurance",
];

export const productIcon: Record<ProductKey, string> = {
  micro: "Sprout",
  sme: "Store",
  agriculture: "Tractor",
  gold: "Gem",
  leasing: "Car",
  insurance: "ShieldCheck",
};

/** Indicative rates/terms shown by the loan calculator, per product. */
export const productTerms: Record<
  ProductKey,
  { minRate: number; maxAmount: number; maxMonths: number }
> = {
  micro: { minRate: 18, maxAmount: 500_000, maxMonths: 24 },
  sme: { minRate: 14, maxAmount: 10_000_000, maxMonths: 60 },
  agriculture: { minRate: 12, maxAmount: 2_000_000, maxMonths: 48 },
  gold: { minRate: 9, maxAmount: 5_000_000, maxMonths: 12 },
  leasing: { minRate: 13, maxAmount: 8_000_000, maxMonths: 60 },
  insurance: { minRate: 0, maxAmount: 0, maxMonths: 0 },
};

export interface Branch {
  id: string;
  city: string;
  district: string;
  province: string;
  /** TODO: replace with real street address */
  address: string;
  phone: string;
  /** lat,lng — TODO: replace with real coordinates (current = district centroids) */
  lat: number;
  lng: number;
}

/** Branch network — currently Central and Uva provinces. (Coordinates are
 *  approximate town centroids; refine with exact branch locations when available.) */
export const branches: Branch[] = [
  { id: "nuwara-eliya", city: "Nuwara Eliya", district: "Nuwara Eliya", province: "Central", address: "126/6, Hawa Eliya, Nuwara Eliya", phone: "071 128 0033", lat: 6.9497, lng: 80.7891 },
  { id: "kandy", city: "Kandy", district: "Kandy", province: "Central", address: "No. 97, Sri Dhamma Dassi Mawatha, Kandy", phone: "071 411 0033", lat: 7.2906, lng: 80.6337 },
  { id: "matale", city: "Matale", district: "Matale", province: "Central", address: "92 F, Kandy Road, Matale", phone: "070 771 0033", lat: 7.4675, lng: 80.6234 },
  { id: "welimada", city: "Welimada", district: "Badulla", province: "Uva", address: "No. 04, Nuwara Eliya Road, Welimada", phone: "070 411 0033", lat: 6.9056, lng: 80.9136 },
  { id: "bandarawela", city: "Bandarawela", district: "Badulla", province: "Uva", address: "Badulla Road, Bindunuwewa, Bandarawela", phone: "057 212 1008", lat: 6.8329, lng: 80.987 },
  { id: "mahiyanganaya", city: "Mahiyanganaya", district: "Badulla", province: "Uva", address: "No. 38, Upper Floor, Public Market, Mahiyanganaya", phone: "055 225 7367", lat: 7.3281, lng: 81.001 },
];

export const provinces = ["Central", "Uva"] as const;
