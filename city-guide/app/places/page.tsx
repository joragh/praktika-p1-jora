"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const categories = [
  { name: "Markete dhe dyqane ushqimore", icon: "⌂" }, { name: "Restorante dhe fast food", icon: "✦" }, { name: "Kafene dhe ëmbëltore", icon: "☕" }, { name: "Arsim", icon: "⌘" }, { name: "Shëndetësi dhe farmaci", icon: "✚" }, { name: "Emergjenca", icon: "!" }, { name: "Institucione publike", icon: "⌁" }, { name: "Sport, kulturë dhe rekreacion", icon: "◉" }, { name: "Shërbime të tjera", icon: "⋯" },
];

export default function PlacesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const shownCategories = useMemo(() => categories.filter(({ name }) => name.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [query]);
  return <main className="places-page"><header className="site-header"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">C</span>City Guide</Link><nav aria-label="Main navigation"><Link className="nav-link" href="/">Home</Link><Link className="nav-link active" href="/places">Places</Link><Link className="nav-link" href="/#about">About</Link></nav></header><section className="places-shell" aria-labelledby="places-title"><div className="places-intro"><div><p className="eyebrow"><span /> Explore the city</p><h1 id="places-title">Choose a <em>category.</em></h1></div><p>Find the kind of place you need in just a few clicks. Select a category to view its locations.</p></div><label className="search-box" aria-label="Search categories"><span className="search-icon" aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a category..." /></label><div className="category-head"><h2>All categories</h2><span>{shownCategories.length} of {categories.length} categories</span></div><div className="category-grid">{shownCategories.map((category, index) => <button className={`category-button ${selected === category.name ? "selected" : ""}`} style={{ animationDelay: `${index * 45}ms` }} key={category.name} type="button" onClick={() => setSelected(category.name)} aria-pressed={selected === category.name}><span className="category-icon" aria-hidden="true">{category.icon}</span><span className="category-name">{category.name}</span><span className="category-arrow" aria-hidden="true">→</span></button>)}</div><section className="locations-panel" aria-live="polite"><div><div className="panel-icon" aria-hidden="true">{selected ? "⌖" : "✦"}</div><h2>{selected ?? "Select a category to begin"}</h2><p>{selected ? `Locations for ${selected} will appear here soon.` : "Choose one of the categories above. This area is ready for the locations you add next."}</p><span className="panel-note">Locations coming soon</span></div></section></section></main>;
}
