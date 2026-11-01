export type Owner = { id: string; firstName: string; lastName: string; email: string; premium: boolean };
export type Business = { id: string; ownerId: string; name: string; category: string; mapsUrl: string; phone: string; address: string; description: string; hours: string; website: string; premium: boolean; createdAt: string };
const SESSION = "city-guide-session";
export const getCurrentOwner = (): Owner | null => { if (typeof window === "undefined") return null; try { return JSON.parse(localStorage.getItem(SESSION) ?? "null") as Owner | null; } catch { return null; } };
export const setSession = (owner: Owner) => localStorage.setItem(SESSION, JSON.stringify(owner));
export const logout = () => localStorage.removeItem(SESSION);
export async function getBusinesses() { const response = await fetch("/api/businesses", { cache: "no-store" }); if (!response.ok) throw new Error("Nuk u lexuan bizneset."); return response.json() as Promise<Business[]>; }
export async function saveBusiness(ownerId: string, business: Omit<Business, "id" | "ownerId" | "premium" | "createdAt">, id?: string) { const response = await fetch(id ? `/api/businesses/${id}` : "/api/businesses", { method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json", "x-owner-id": ownerId }, body: JSON.stringify(business) }); const payload = await response.json(); if (!response.ok) throw new Error(payload.message ?? "Biznesi nuk u ruajt."); return payload as Business; }
export async function removeBusiness(ownerId: string, id: string) { const response = await fetch(`/api/businesses/${id}`, { method: "DELETE", headers: { "x-owner-id": ownerId } }); if (!response.ok) { const payload = await response.json(); throw new Error(payload.message ?? "Biznesi nuk u fshi."); } }
