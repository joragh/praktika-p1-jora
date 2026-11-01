import { randomUUID } from "crypto";
import { NextRequest } from "next/server";
import { BUSINESS_CATEGORIES } from "../../lib/categories";
import { rows, run, sql } from "../../lib/db";

type Business = { id: string; ownerId: string; name: string; category: string; mapsUrl: string; phone: string; address: string; description: string; hours: string; website: string; premium: boolean; createdAt: string };
const fields = "'id', id, 'ownerId', owner_id, 'name', name, 'category', category, 'mapsUrl', google_maps_url, 'phone', phone, 'address', address, 'description', description, 'hours', COALESCE(opening_hours, ''), 'website', COALESCE(website, ''), 'premium', is_promoted, 'createdAt', created_at";
const all = () => rows<Business>(`SELECT COALESCE(JSON_ARRAYAGG(JSON_OBJECT(${fields})), JSON_ARRAY()) FROM businesses ORDER BY created_at DESC`);
const valid = (body: Record<string, unknown>) => typeof body.name === "string" && typeof body.category === "string" && BUSINESS_CATEGORIES.includes(body.category as (typeof BUSINESS_CATEGORIES)[number]) && ["mapsUrl", "phone", "address", "description"].every((key) => typeof body[key] === "string" && body[key].trim());
export async function GET() { return Response.json(await all()); }
export async function POST(request: NextRequest) {
  const ownerId = request.headers.get("x-owner-id"); const body = await request.json();
  if (!ownerId || !valid(body)) return Response.json({ message: "Ploteso te gjitha fushat e kerkuara dhe zgjidh nje kategori valide." }, { status: 400 });
  const owner = await rows<{ plan: string }>(`SELECT JSON_ARRAYAGG(JSON_OBJECT('plan', plan)) FROM owners WHERE id=${sql(ownerId)}`);
  if (!owner.length) return Response.json({ message: "Sesioni nuk u gjet. Hyr perseri." }, { status: 401 });
  const id = randomUUID(); await run(`INSERT INTO businesses (id, owner_id, name, category, google_maps_url, phone, address, description, opening_hours, website, is_promoted) VALUES (${sql(id)}, ${sql(ownerId)}, ${sql(body.name.trim())}, ${sql(body.category)}, ${sql(body.mapsUrl.trim())}, ${sql(body.phone.trim())}, ${sql(body.address.trim())}, ${sql(body.description.trim())}, ${sql(typeof body.hours === "string" ? body.hours.trim() : "")}, ${sql(typeof body.website === "string" ? body.website.trim() : "")}, ${owner[0].plan === "premium" ? 1 : 0})`);
  return Response.json((await all()).find((business) => business.id === id), { status: 201 });
}
