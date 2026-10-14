"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./places.module.css";

const categories = [
  { name: "Markete dhe dyqane ushqimore", icon: "⌂" }, { name: "Restorante dhe fast food", icon: "✦" }, { name: "Kafene dhe ëmbëltore", icon: "☕" }, { name: "Arsim", icon: "⌘" }, { name: "Shëndetësi dhe farmaci", icon: "✚" }, { name: "Emergjenca", icon: "!" }, { name: "Institucione publike", icon: "⌁" }, { name: "Sport, kulturë dhe rekreacion", icon: "◉" }, { name: "Shërbime të tjera", icon: "⋯" },
];

type Place = { name: string; category: "Markete dhe dyqane ushqimore" | "Restorante dhe fast food"; type: string; address: string; hours: string; phone: string; mapsQuery: string; rating: string; description: string };

// Sample data: replace these values with real businesses whenever you are ready.
const places: Place[] = [
  { name: "FreshMart Qendra", category: "Markete dhe dyqane ushqimore", type: "Market", address: "Rr. Dëshmorët e Kombit, Qendër", hours: "07:00 – 22:00", phone: "+383 44 000 101", mapsQuery: "FreshMart Qendra Pristina", rating: "4.8", description: "Furnizime të përditshme, fruta të freskëta dhe produkte lokale." },
  { name: "Green Basket Market", category: "Markete dhe dyqane ushqimore", type: "Dyqan ushqimor", address: "Rr. Nënë Tereza, Qendër", hours: "08:00 – 21:00", phone: "+383 44 000 102", mapsQuery: "Green Basket Market Pristina", rating: "4.6", description: "Një zgjedhje e kujdesshme me produkte të freskëta për shtëpi." },
  { name: "Market 24", category: "Markete dhe dyqane ushqimore", type: "Mini-market", address: "Rr. Bulevardi i Paqes, Lagjja e Re", hours: "Hapur 24 orë", phone: "+383 44 000 103", mapsQuery: "Market 24 Pristina", rating: "4.5", description: "Zgjidhje e shpejtë për blerjet e vona dhe nevojat e përditshme." },
  { name: "Bio Shtëpia", category: "Markete dhe dyqane ushqimore", type: "Ushqime bio", address: "Rr. Lidhja e Prizrenit, Qendër", hours: "09:00 – 20:00", phone: "+383 44 000 104", mapsQuery: "Bio Shtëpia Pristina", rating: "4.9", description: "Produkte bio, ushqime të shëndetshme dhe zgjedhje pa gluten." },
  { name: "Sofra e Qytetit", category: "Restorante dhe fast food", type: "Restorant tradicional", address: "Rr. UÇK, Qendër", hours: "10:00 – 23:00", phone: "+383 44 000 201", mapsQuery: "Sofra e Qytetit Pristina", rating: "4.9", description: "Shije tradicionale, gatime shtëpie dhe ambient i ngrohtë." },
  { name: "Urban Bite", category: "Restorante dhe fast food", type: "Fast food", address: "Rr. Adem Jashari, Qendër", hours: "09:00 – 00:00", phone: "+383 44 000 202", mapsQuery: "Urban Bite Pristina", rating: "4.7", description: "Burgera, wrap-e dhe ushqim i shpejtë për çdo moment të ditës." },
  { name: "Pasta Verde", category: "Restorante dhe fast food", type: "Restorant italian", address: "Rr. Mbretëresha Teutë, Lagjja e Re", hours: "11:00 – 22:30", phone: "+383 44 000 203", mapsQuery: "Pasta Verde Pristina", rating: "4.8", description: "Pasta e freskët, pica artizanale dhe receta italiane moderne." },
];

export default function PlacesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [query, setQuery] = useState("");
  const shownCategories = useMemo(() => categories.filter(({ name }) => name.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [query]);
  const selectedPlaces = places.filter((place) => place.category === selected);

  function chooseCategory(category: string) {
    setSelected(category);
    const firstPlace = places.find((place) => place.category === category) ?? null;
    setSelectedPlace(firstPlace);
  }

  function closeLocations() { setSelected(null); setSelectedPlace(null); }

  return <main className="places-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">C</span>City Guide</Link><nav aria-label="Main navigation"><Link className="nav-link" href="/">Home</Link><Link className="nav-link active" href="/places">Places</Link><Link className="nav-link" href="/#about">About</Link></nav></header>
    <section className="places-shell" aria-labelledby="places-title">
      <div className="places-intro"><div><p className="eyebrow"><span /> Explore the city</p><h1 id="places-title">Choose a <em>category.</em></h1></div><p>Find the kind of place you need in just a few clicks. Select a category to view its locations.</p></div>
      <label className="search-box" aria-label="Search categories"><span className="search-icon" aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a category..." /></label>
      <div className="category-head"><h2>All categories</h2><span>{shownCategories.length} of {categories.length} categories</span></div>
      <div className="category-grid">{shownCategories.map((category, index) => <button className={`category-button ${selected === category.name ? "selected" : ""}`} style={{ animationDelay: `${index * 45}ms` }} key={category.name} type="button" onClick={() => chooseCategory(category.name)} aria-pressed={selected === category.name}><span className="category-icon" aria-hidden="true">{category.icon}</span><span className="category-name">{category.name}</span><span className="category-arrow" aria-hidden="true">→</span></button>)}</div>
      <section className="locations-panel" aria-live="polite" aria-labelledby="locations-title">
        {!selected ? <div className="locations-empty"><div className="panel-icon" aria-hidden="true">✦</div><h2 id="locations-title">Select a category to begin</h2><p>Choose Markets or Restaurants to explore sample locations and their map previews.</p></div> : selectedPlaces.length && selectedPlace ? <div className="locations-content"><div className="locations-heading"><div><p className="locations-kicker">LOCAL PICKS</p><h2 id="locations-title">{selected}</h2><p>{selectedPlaces.length} sample locations — click a card to view it on the map.</p></div><button className="close-locations" type="button" onClick={closeLocations}>Close ×</button></div><div className="directory-layout"><div className="location-list">{selectedPlaces.map((place) => <button className={`location-card ${selectedPlace.name === place.name ? "location-card-active" : ""}`} type="button" onClick={() => setSelectedPlace(place)} key={place.name} aria-pressed={selectedPlace.name === place.name}><div className="location-card-top"><span className="place-type">{place.type}</span><span className="rating">★ {place.rating}</span></div><h3>{place.name}</h3><p className="place-address">⌖ {place.address}</p><p className="place-description">{place.description}</p><span className="select-place">View map <span aria-hidden="true">→</span></span></button>)}</div><aside className="map-card" aria-label={`Map for ${selectedPlace.name}`}><div className="map-frame"><iframe title={`Google Map: ${selectedPlace.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(selectedPlace.mapsQuery)}&z=15&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="map-details"><div><span className="place-type">{selectedPlace.type}</span><h3>{selectedPlace.name}</h3><p>⌖ {selectedPlace.address}</p></div><div className="detail-grid"><span><b>Orari</b>{selectedPlace.hours}</span><span><b>Telefon</b>{selectedPlace.phone}</span></div><a className="maps-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.mapsQuery)}`} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a></div></aside></div></div> : <div className="locations-empty"><div className="panel-icon" aria-hidden="true">⌖</div><h2 id="locations-title">{selected}</h2><p>Locations for this category will be added soon.</p><button className="close-locations" type="button" onClick={closeLocations}>Close ×</button></div>}
      </section>
    </section>
  </main>;
}
