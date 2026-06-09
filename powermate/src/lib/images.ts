/**
 * Verified free Unsplash images.
 * All confirmed as standard Unsplash License (free, not Unsplash+).
 */

const BASE = "https://images.unsplash.com/photo-";

export const img = {
  // Sri Lanka — bustling local market: the traders and small businesses Power Mate backs
  marketLife: `${BASE}1548285788-6b5c92110fee`,
  // Sri Lanka — Nine Arches Bridge, Ella (Gemma Fjam)
  nineArches: `${BASE}1574611122955-5baa61496637`,
  // Sri Lanka — tea plantation, Nuwara Eliya hill country (Central Province)
  teaCountry: `${BASE}1760533852055-724d3a50dcbd`,
  // Sri Lanka — misty highland hills (Uva)
  hillCountry: `${BASE}1585171353887-4a6caf1e852e`,
  // Sri Lanka — Blue train at Nine Arches Bridge (Hendrik Cornelissen)
  blueTrain: `${BASE}1566296314736-6eaac1ca0cb9`,
  // Sri Lanka — Mirissa beach, Coconut Tree Hill (Dinuka Lankaloka)
  mirisssaBeach: `${BASE}1580910527739-556eb89f9d65`,
  // Sri Lanka — Kandy temple community (Tharaka Jayasuriya)
  kandyCommunity: `${BASE}1558871624-7b507467240f`,
  // Sri Lanka — Elephants (Alex Azabache)
  elephants: `${BASE}1571406761758-9a3eed5338ef`,
  // Sri Lanka — Mirissa beach people (Daniel Klein)
  mirisssaPeople: `${BASE}1519566335946-e6f65f0f4fdf`,
  // Sri Lanka — Tuk-tuks with surfboards (Jura)
  tukTuks: `${BASE}1583155381750-1c5d2634bd3f`,
  // Sri Lanka — Tuk-tuk at Galle Fort (Matt Dany)
  galleTukTuk: `${BASE}1704797390325-b057758d8c3d`,
  // SE Asia — Rice planting (Eduardo Prim)
  ricePlanting: `${BASE}1505471768190-275e2ad7b3f9`,
  // Gold jewelry — rings & necklace (Segal Jewelry)
  goldJewelry: `${BASE}1633934542430-0905ccb5f050`,
} as const;

/** Build a sized Unsplash CDN URL. */
export function sized(
  id: string,
  opts: { w?: number; h?: number; q?: number; fit?: string } = {},
): string {
  const { w = 1600, q = 80, fit = "crop" } = opts;
  const params = new URLSearchParams({ auto: "format", fit, w: String(w), q: String(q) });
  if (opts.h) params.set("h", String(opts.h));
  return `${id}?${params}`;
}

/** Product card images — one per product, all free verified. */
import type { ProductKey } from "@/data/site";

export const productCardImages: Record<ProductKey, { src: string; alt: string }> = {
  micro: {
    src: sized(img.mirisssaPeople, { w: 640, h: 380, q: 80 }),
    alt: "Sri Lankan community at Mirissa beach — the people Power Mate serves",
  },
  sme: {
    src: sized(img.tukTuks, { w: 640, h: 380, q: 80 }),
    alt: "Tuk-tuks in Sri Lanka — the small businesses Power Mate helps grow",
  },
  agriculture: {
    src: sized(img.ricePlanting, { w: 640, h: 380, q: 80 }),
    alt: "Person planting rice in a paddy field — agriculture loans support Sri Lanka's farmers",
  },
  gold: {
    src: sized(img.goldJewelry, { w: 640, h: 380, q: 80 }),
    alt: "Gold rings and necklace — gold loan facility with same-day release",
  },
  leasing: {
    src: sized(img.galleTukTuk, { w: 640, h: 380, q: 80 }),
    alt: "Tuk-tuk parked at Galle Fort, Sri Lanka — vehicle leasing for every journey",
  },
  insurance: {
    src: sized(img.mirisssaBeach, { w: 640, h: 380, q: 80 }),
    alt: "Coconut Tree Hill, Mirissa, Sri Lanka — protecting what you've worked hard to build",
  },
};
