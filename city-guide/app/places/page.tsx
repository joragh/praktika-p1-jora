
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./places.css";

const categories = [
  { name: "Markete dhe dyqane ushqimore", icon: "⌂" },
  { name: "Restorante dhe ushqim i shpejtë", icon: "✦" },
  { name: "Kafene dhe ëmbëltore", icon: "☕" },
  { name: "Arsim", icon: "⌘" },
  { name: "Shëndetësi dhe farmaci", icon: "✚" },
  { name: "Emergjenca", icon: "!" },
  { name: "Institucione publike", icon: "⌁" },
  { name: "Sport, kulturë dhe rekreacion", icon: "◉" },
  { name: "Shërbime të tjera", icon: "⋯" },
];

type Place = {
  name: string;
  category:
    | "Markete dhe dyqane ushqimore"
    | "Restorante dhe ushqim i shpejtë";
  type: string;
  address: string;
  hours: string;
  phone: string;
  mapsQuery: string;
  rating: string;
  description: string;
};

// Të dhëna shembull: këto mund t'i zëvendësosh me biznese reale.
const places: Place[] = [
  {
    name: "FreshMart Qendra",
    category: "Markete dhe dyqane ushqimore",
    type: "Market",
    address: "Rr. Dëshmorët e Kombit, Qendër",
    hours: "07:00 – 22:00",
    phone: "+383 44 000 101",
    mapsQuery: "FreshMart Qendra Pristina",
    rating: "4.8",
    description:
      "Furnizime të përditshme, fruta të freskëta dhe produkte lokale.",
  },
  {
    name: "Green Basket Market",
    category: "Markete dhe dyqane ushqimore",
    type: "Dyqan ushqimor",
    address: "Rr. Nënë Tereza, Qendër",
    hours: "08:00 – 21:00",
    phone: "+383 44 000 102",
    mapsQuery: "Green Basket Market Pristina",
    rating: "4.6",
    description:
      "Një zgjedhje e kujdesshme me produkte të freskëta për shtëpi.",
  },
  {
    name: "Market 24",
    category: "Markete dhe dyqane ushqimore",
    type: "Mini-market",
    address: "Rr. Bulevardi i Paqes, Lagjja e Re",
    hours: "Hapur 24 orë",
    phone: "+383 44 000 103",
    mapsQuery: "Market 24 Pristina",
    rating: "4.5",
    description:
      "Zgjidhje e shpejtë për blerjet e vona dhe nevojat e përditshme.",
  },
  {
    name: "Bio Shtëpia",
    category: "Markete dhe dyqane ushqimore",
    type: "Ushqime bio",
    address: "Rr. Lidhja e Prizrenit, Qendër",
    hours: "09:00 – 20:00",
    phone: "+383 44 000 104",
    mapsQuery: "Bio Shtëpia Pristina",
    rating: "4.9",
    description:
      "Produkte bio, ushqime të shëndetshme dhe zgjedhje pa gluten.",
  },
  {
    name: "Sofra e Qytetit",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant tradicional",
    address: "Rr. UÇK, Qendër",
    hours: "10:00 – 23:00",
    phone: "+383 44 000 201",
    mapsQuery: "Sofra e Qytetit Pristina",
    rating: "4.9",
    description:
      "Shije tradicionale, gatime shtëpie dhe ambient i ngrohtë.",
  },
  {
    name: "Urban Bite",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Ushqim i shpejtë",
    address: "Rr. Adem Jashari, Qendër",
    hours: "09:00 – 00:00",
    phone: "+383 44 000 202",
    mapsQuery: "Urban Bite Pristina",
    rating: "4.7",
    description:
      "Burgerë, tortilla dhe ushqim i shpejtë për çdo moment të ditës.",
  },
  {
    name: "Pasta Verde",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant italian",
    address: "Rr. Mbretëresha Teutë, Lagjja e Re",
    hours: "11:00 – 22:30",
    phone: "+383 44 000 203",
    mapsQuery: "Pasta Verde Pristina",
    rating: "4.8",
    description:
      "Pasta e freskët, pica artizanale dhe receta italiane moderne.",
  },
];

export default function PlacesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [query, setQuery] = useState("");

  const shownCategories = useMemo(
    () =>
      categories.filter(({ name }) =>
        name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ),
    [query]
  );

  const selectedPlaces = places.filter(
    (place) => place.category === selected
  );

  function chooseCategory(category: string) {
    setSelected(category);

    const firstPlace =
      places.find((place) => place.category === category) ?? null;

    setSelectedPlace(firstPlace);
  }

  function closeLocations() {
    setSelected(null);
    setSelectedPlace(null);
  }

  return (
    <main className="places-page">
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            C
          </span>
          Udhëzuesi i Qytetit
        </Link>

        <nav aria-label="Navigimi kryesor">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link active" href="/places">
            Places
          </Link>
          <Link className="nav-link" href="/#about">
            About Us
          </Link>
        </nav>
      </header>

      <section className="places-shell" aria-labelledby="places-title">
        <div className="places-intro">
          <div>
            <p className="eyebrow">
              <span />
              Eksploro qytetin
            </p>

            <h1 id="places-title">
              Zgjidh një <em>kategori.</em>

            </h1>
          </div>

          <p>
            Gjeje llojin e vendit që të nevojitet me vetëm disa klikime.
            Zgjidh një kategori për t'i parë lokacionet.
          </p>
        </div>

        <label className="search-box" aria-label="Kërko kategori">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Kërko një kategori..."
          />
        </label>

        <div className="category-head">
          <h2>Të gjitha kategoritë</h2>
          <span>
            {shownCategories.length} nga {categories.length} kategori
          </span>
        </div>

        <div className="category-grid">
          {shownCategories.map((category, index) => (
            <button
              className={`category-button ${
                selected === category.name ? "selected" : ""
              }`}
              style={{ animationDelay: `${index * 45}ms` }}
              key={category.name}
              type="button"
              onClick={() => chooseCategory(category.name)}
              aria-pressed={selected === category.name}
            >
              <span className="category-icon" aria-hidden="true">
                {category.icon}
              </span>

              <span className="category-name">{category.name}</span>

              <span className="category-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>

        <section
          className="locations-panel"
          aria-live="polite"
          aria-labelledby="locations-title"
        >
          {!selected ? (
            <div className="locations-empty">
              <div className="panel-icon" aria-hidden="true">
                ✦
              </div>

              <h2 id="locations-title">
                Zgjidh një kategori për të filluar
              </h2>

              <p>
                Zgjidh kategorinë e marketeve ose restoranteve për t'i
                eksploruar lokacionet shembull dhe hartat e tyre.
              </p>
            </div>
          ) : selectedPlaces.length && selectedPlace ? (
            <div className="locations-content">
              <div className="locations-heading">
                <div>
                  <p className="locations-kicker">VENDE TË SUGJERUARA</p>

                  <h2 id="locations-title">{selected}</h2>

                  <p>
                    {selectedPlaces.length} lokacione shembull — kliko
                    mbi një kartelë për ta parë vendin në hartë.
                  </p>
                </div>

                <button
                  className="close-locations"
                  type="button"
                  onClick={closeLocations}
                >
                  Mbyll ×
                </button>
              </div>

              <div className="directory-layout">
                <div className="location-list">
                  {selectedPlaces.map((place) => (
                    <button
                      className={`location-card ${
                        selectedPlace.name === place.name
                          ? "location-card-active"
                          : ""
                      }`}
                      type="button"
                      onClick={() => setSelectedPlace(place)}
                      key={place.name}
                      aria-pressed={selectedPlace.name === place.name}
                    >
                      <div className="location-card-top">
                        <span className="place-type">{place.type}</span>

                        <span className="rating">
                          ★ {place.rating}
                        </span>
                      </div>

                      <h3>{place.name}</h3>

                      <p className="place-address">
                        ⌖ {place.address}
                      </p>

                      <p className="place-description">
                        {place.description}
                      </p>

                      <span className="select-place">
                        Shiko hartën{" "}
                        <span aria-hidden="true">→</span>
                      </span>
                    </button>
                  ))}
                </div>

                <aside
                  className="map-card"
                  aria-label={`Harta për ${selectedPlace.name}`}
                >
                  <div className="map-frame">
                    <iframe
                      title={`Harta e Google për ${selectedPlace.name}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        selectedPlace.mapsQuery
                      )}&z=15&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div className="map-details">
                    <div>
                      <span className="place-type">
                        {selectedPlace.type}
                      </span>

                      <h3>{selectedPlace.name}</h3>

                      <p>⌖ {selectedPlace.address}</p>
                    </div>

                    <div className="detail-grid">
                      <span>
                        <b>Orari</b>
                        {selectedPlace.hours}
                      </span>

                      <span>
                        <b>Telefoni</b>
                        {selectedPlace.phone}
                      </span>
                    </div>

                    <a
                      className="maps-link"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedPlace.mapsQuery
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Hape në Google Maps{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            <div className="locations-empty">
              <div className="panel-icon" aria-hidden="true">
                ⌖
              </div>

              <h2 id="locations-title">{selected}</h2>

              <p>
                Vendet për këtë kategori do të shtohen së shpejti.
              </p>

              <button
                className="close-locations"
                type="button"
                onClick={closeLocations}
              >
                Mbyll ×
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
