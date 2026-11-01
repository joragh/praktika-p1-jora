"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BUSINESS_CATEGORIES } from "../lib/categories";
import {
  Business,
  getBusinesses,
  getCurrentOwner,
  logout,
  Owner,
  removeBusiness,
  saveBusiness,
} from "../lib/owner-store";
import "../owner.css";

const blank = () => ({
  name: "",
  category: BUSINESS_CATEGORIES[0],
  mapsUrl: "",
  phone: "",
  address: "",
  description: "",
  hours: "",
  website: "",
});

export default function DashboardPage() {
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [editing, setEditing] = useState<Business | null>(null);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      const currentOwner = getCurrentOwner();
      if (!currentOwner) {
        router.replace("/auth");
        return;
      }

      if (active) setOwner(currentOwner);

      try {
        const allBusinesses = await getBusinesses();
        if (active) {
          setBusinesses(
            allBusinesses.filter((business) => business.ownerId === currentOwner.id),
          );
        }
      } catch (error) {
        if (active) {
          setNotice(
            error instanceof Error ? error.message : "Bizneset nuk u ngarkuan.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDashboard();
    return () => {
      active = false;
    };
  }, [router]);

  const activeOwner = owner;

  async function refresh(ownerId: string) {
    const allBusinesses = await getBusinesses();
    setBusinesses(allBusinesses.filter((business) => business.ownerId === ownerId));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeOwner) return;

    const formData = new FormData(event.currentTarget);
    const details = {
      name: String(formData.get("name") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      mapsUrl: String(formData.get("mapsUrl") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      hours: String(formData.get("hours") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    setSaving(true);
    setNotice("");
    try {
      await saveBusiness(activeOwner.id, details, editing?.id);
      await refresh(activeOwner.id);
      setEditing(null);
      setAdding(false);
      setNotice(
        editing
          ? "Biznesi u përditësua."
          : "Biznesi u shtua dhe tani shfaqet te Places.",
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Biznesi nuk u ruajt.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteBusiness(business: Business) {
    if (
      !activeOwner ||
      !window.confirm(`Ta fshijmë ${business.name}?`)
    ) {
      return;
    }

    try {
      await removeBusiness(activeOwner.id, business.id);
      await refresh(activeOwner.id);
      setNotice("Biznesi u fshi.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Biznesi nuk u fshi.");
    }
  }

  function signOut() {
    logout();
    router.replace("/");
  }

  if (loading) {
    return (
      <main className="owner-page">
        <p className="notice" role="status">Duke ngarkuar panelin...</p>
      </main>
    );
  }

  if (!activeOwner) return null;

  const form = editing ?? (adding ? blank() : null);

  return (
    <main className="owner-page">
      <header className="owner-header">
        <Link className="brand" href="/">
          <span className="brand-mark">C</span>Udhezuesi i Qytetit
        </Link>
        <div className="header-actions">
          <Link className="corner-home" href="/">Home</Link>
          <button className="sign-out" onClick={signOut}>Dil</button>
        </div>
      </header>

      <section className="dashboard-shell">
        <div className="dashboard-intro">
          <div>
            <p className="eyebrow"><span /> PANELI I PRONARIT</p>
            <h1>Pershendetje, {activeOwner.firstName}.</h1>
            <p>Menaxho bizneset qe shfaqen ne udhezues.</p>
          </div>
        </div>

        {notice && <p className="notice" role="status">{notice}</p>}

        <div className="dashboard-bar">
          <h2>Bizneset e mia <small>{businesses.length}</small></h2>
          <button
            className="owner-button"
            onClick={() => {
              setAdding(true);
              setEditing(null);
              setNotice("");
            }}
          >
            + Shto biznes
          </button>
        </div>

        {form && (
          <form className="business-form" onSubmit={submit}>
            <div className="form-top">
              <div>
                <p className="eyebrow"><span /> {editing ? "PERDITESO" : "BIZNES I RI"}</p>
                <h2>{editing ? "Perditeso biznesin" : "Shto biznesin"}</h2>
              </div>
              <button
                type="button"
                className="close-form"
                onClick={() => {
                  setAdding(false);
                  setEditing(null);
                }}
              >
                Mbyll ×
              </button>
            </div>

            <div className="form-grid">
              <label>
                Emri i biznesit
                <input name="name" required maxLength={160} defaultValue={form.name} />
              </label>
              <label>
                Kategoria
                <select name="category" required defaultValue={form.category}>
                  {BUSINESS_CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Linku i Google Maps
                <input
                  name="mapsUrl"
                  required
                  type="url"
                  maxLength={2048}
                  placeholder="https://maps.google.com/..."
                  defaultValue={form.mapsUrl}
                />
              </label>
              <label>
                Numri i telefonit
                <input name="phone" required type="tel" maxLength={50} defaultValue={form.phone} />
              </label>
              <label>
                Adresa
                <input name="address" required maxLength={255} defaultValue={form.address} />
              </label>
              <label>
                Orari
                <input
                  name="hours"
                  maxLength={140}
                  placeholder="p.sh. Hen-Sht 08:00-22:00"
                  defaultValue={form.hours}
                />
              </label>
              <label className="wide">
                Pershkrimi
                <textarea
                  name="description"
                  required
                  maxLength={5000}
                  rows={3}
                  defaultValue={form.description}
                />
              </label>
              <label className="wide">
                Faqja e internetit (opsionale)
                <input
                  name="website"
                  type="url"
                  maxLength={2048}
                  placeholder="https://..."
                  defaultValue={form.website}
                />
              </label>
            </div>

            <button className="owner-button" disabled={saving} type="submit">
              {saving
                ? "Duke ruajtur..."
                : editing
                  ? "Ruaj ndryshimet"
                  : "Krijo biznesin"}
            </button>
          </form>
        )}

        <div className="business-grid">
          {businesses.length === 0 ? (
            <div className="empty-business">
              <h3>Ende nuk ke biznes</h3>
              <p>Shto biznesin tend te pare per ta shfaqur ne udhezues.</p>
            </div>
          ) : (
            businesses.map((business) => (
              <article className="business-card" key={business.id}>
                <span>{business.category}</span>
                <h3>{business.name}</h3>
                <p>{business.address}</p>
                <p>{business.phone}</p>
                <div>
                  <button
                    onClick={() => {
                      setEditing(business);
                      setAdding(false);
                    }}
                  >
                    Perditeso
                  </button>
                  <button
                    className="delete"
                    onClick={() => void deleteBusiness(business)}
                  >
                    Fshi
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
