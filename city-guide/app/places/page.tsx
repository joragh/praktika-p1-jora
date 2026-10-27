
"use client";
/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BUSINESS_CATEGORIES } from "../lib/categories";
import { getBusinesses } from "../lib/owner-store";
import "./places.css";

const categoryVisuals = [
  { name: "Markete dhe dyqane ushqimore", icon: "⌂" },
  { name: "Restorante dhe ushqim i shpejtë", icon: "✦" },
  { name: "Kafene dhe ëmbëltore", icon: "☕" },
  { name: "Arsim", icon: "⌘" },
  { name: "Shëndetësi dhe farmaci", icon: "✚" },
  { name: "Emergjenca", icon: "!" },
  { name: "Institucione publike", icon: "⌁" },
  { name: "Sport, kulturë dhe rekreacion", icon: "◉" },
  { name: "Shërbime të tjera", icon: "⋯" },
] as const;
const categories = BUSINESS_CATEGORIES.map((name, index) => ({ name, icon: categoryVisuals[index].icon }));

type Category = (typeof categories)[number]["name"];

type Place = {
  name: string;
  category: Category;
  type: string;
  address: string;
  hours: string;
  phone: string;
  mapsQuery: string;
  rating: string;
  description: string;
  promoted?: boolean;
};

// Nga 9 vendmbajtëse për secilën kategori. Zëvendësoji me lokacionet reale.
const placeholderCategories: Array<{
  category: Category;
  label: string;
  type: string;
  hours: string;
  phone: string;
}> = [
  {
    category: "Kafene dhe ëmbëltore",
    label: "Kafene / ëmbëltore",
    type: "Kafene",
    hours: "08:00 – 22:00",
    phone: "+383 44 000 301",
  },
  {
    category: "Arsim",
    label: "Institucion arsimor",
    type: "Arsim",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 401",
  },
  {
    category: "Shëndetësi dhe farmaci",
    label: "Qendër shëndetësore / farmaci",
    type: "Shëndetësi",
    hours: "08:00 – 20:00",
    phone: "+383 44 000 501",
  },
  {
    category: "Emergjenca",
    label: "Shërbim emergjent",
    type: "Emergjencë",
    hours: "Hapur 24 orë",
    phone: "+383 44 000 601",
  },
  {
    category: "Institucione publike",
    label: "Institucion publik",
    type: "Shërbim publik",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 701",
  },
  {
    category: "Sport, kulturë dhe rekreacion",
    label: "Qendër sportive / kulturore",
    type: "Rekreacion",
    hours: "09:00 – 21:00",
    phone: "+383 44 000 801",
  },
  {
    category: "Shërbime të tjera",
    label: "Shërbim tjetër",
    type: "Shërbim",
    hours: "09:00 – 17:00",
    phone: "+383 44 000 901",
  },
];

const placeholderPlaces: Place[] = placeholderCategories.flatMap((place) =>
  Array.from({ length: 9 }, (_, index) => ({
    name: `${place.label} ${index + 1}`,
    category: place.category,
    type: place.type,
    address: `Adresa e lokacionit ${index + 1}, Qendër`,
    hours: place.hours,
    phone: place.phone,
    mapsQuery: `${place.label} ${index + 1} Pristina`,
    rating: "—",
    description: "Vendmbajtëse: zëvendëso këtë informacion me lokacionin real.",
  }))
);

// Të dhëna shembull: këto mund t'i zëvendësosh me biznese reale.
const places: Place[] = [
  {
    name: "Viva Fresh Store",
    category: "Markete dhe dyqane ushqimore",
    type: "Market",
    address: "Rr Komandant Kumanova",
    hours: "07:00 – 23:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1039.5699359567457!2d21.1182781216927!3d42.52666598080294!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135482f4d7af30b3%3A0xb703b8c68e6a412e!2sVFS%20-%2014%20Lipjan!5e0!3m2!1sen!2s!4v1793104143323!5m2!1sen!2s",
    rating: "4.0",
    description:
      "Viva Fresh Store ofron produkte ushqimore të freskëta dhe artikuj të nevojshëm për çdo familje, duke kombinuar cilësinë, shumëllojshmërinë dhe komoditetin në blerje.",
  },
  {
    name: "Interex",
    category: "Markete dhe dyqane ushqimore",
    type: "Market i madhë",
    address: "Rr. Komandant Kumanova",
    hours: "07:00 – 23:00",
    phone: "+383 48 160 700",
    mapsQuery: "https://maps.app.goo.gl/KE37NsqGTGM6RfYP9",
    rating: "4.4",
    description:
      "Interex është një rrjet marketesh që ofron produkte ushqimore, pije dhe artikuj të përditshëm për familje, duke u ofruar klientëve shumëllojshmëri dhe komoditet gjatë blerjeve.",
  },
  {
    name: "Super Viva",
    category: "Markete dhe dyqane ushqimore",
    type: "Market",
    address: "Rr. Skenderbeu",
    hours: "08:00 – 22:00",
    phone: "+381 38 543 038",
    mapsQuery: "https://maps.app.goo.gl/phuLFMr3TeCKExme9",
    rating: "4.3",
    description:
      "Super Viva është market që ofron produkte ushqimore, pije dhe artikuj të nevojshëm për përditshmëri, duke u mundësuar klientëve të bëjnë blerjet e tyre shpejt dhe lehtë.",

  },
  {
    name: "ETC - Elkos Trading Center",
    category: "Markete dhe dyqane ushqimore",
    type: "Dyqan ushqimor",
    address: "Rr. Lidhja e Prizrenit, Qendër",
    hours: "08:00 – 22:30",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/Bh1L1PLb4cZ9qJz56",
    rating: "4.1",
    description:
      "ETC është një market që ofron një shumëllojshmëri produktesh ushqimore, pijesh dhe artikujsh për amvisëri, duke u ofruar klientëve produkte të nevojshme për blerjet e përditshme.",
  },
  {
    name: "KAM market",
    category: "Markete dhe dyqane ushqimore",
    type: "Supermarket",
    address: "Rr. Skenderbeu",
    hours: "08:00 – 22:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/zsuGr8bBCAyeGMTo9",
    rating: "4.5",
    description:
      "KAM Market ofron produkte të ndryshme ushqimore, pije dhe artikuj për amvisëri, duke u bërë një vend praktik për blerjet e përditshme dhe nevojat e familjes.",
  },
  {
    name: "Emona Center",
    category: "Markete dhe dyqane ushqimore",
    type: "Supermarket",
    address: "Lidhja e Prizrenit",
    hours: "08:00 – 23:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/qYeBYxXTNKewQZhW7",
    rating: "4.3",
    description:
      "Emona Center ofron një përzgjedhje të produkteve ushqimore, pijeve dhe artikujve të ndryshëm për shtëpi, duke ofruar mundësi praktike për blerjet e përditshme.",
  },
  {
    name: "Eli-Ab Market",
    category: "Markete dhe dyqane ushqimore",
    type: "Market lokal",
    address: "Rr. Fehmi Agani",
    hours: "08:00 – 23:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/7PUrWi86L9w3utzW7",
    rating: "3.3",
    description:
      "Eli-Ab ofron produkte të ndryshme ushqimore dhe artikuj të nevojshëm për përditshmëri, duke u mundësuar banorëve të gjejnë lehtësisht produktet për nevojat e tyre të përditshme.",
  },
  {
    name: "7 Vëllezerit Center",
    category: "Markete dhe dyqane ushqimore",
    type: "Dyqan dhe market",
    address: "Rr. Hajredin Bajrami",
    hours: "07:00 – 23:00",
    phone: "+383 44 435 984",
    mapsQuery: "https://maps.app.goo.gl/Uxm2Vujy2AtsS8Kw7",
    rating: "4.0",
    description:
      "7 Vëllezërit ofron një shumëllojshmëri produktesh ushqimore, pijesh dhe artikujsh për shtëpi, duke u shërbyer banorëve për blerjet dhe nevojat e përditshme.",
  },
  {
    name: "Daily Stop",
    category: "Markete dhe dyqane ushqimore",
    type: "Market lagjeje",
    address: "Rr. Robert Doll, Arbëri",
    hours: "07:00 – 22:00",
    phone: "+383 44 000 109",
    mapsQuery: "Daily Stop Pristina", 
    rating: "4.6",
    description:
      "Market praktik për nevojat e përditshme dhe blerjet në minutën e fundit.",
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
  {
    name: "Grill House",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant grill",
    address: "Rr. Bulevardi Bill Clinton, Qendër",
    hours: "11:00 – 23:30",
    phone: "+383 44 000 204",
    mapsQuery: "Grill House Pristina",
    rating: "4.7",
    description: "Mishra në skarë, sallata të freskëta dhe menu për familje.",
  },
  {
    name: "Pizza Corner",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Pizzeri",
    address: "Rr. Rexhep Luci, Qendër",
    hours: "10:00 – 00:00",
    phone: "+383 44 000 205",
    mapsQuery: "Pizza Corner Pristina",
    rating: "4.6",
    description: "Pica të pjekura në furrë dhe porosi të shpejta për marrje.",
  },
  {
    name: "Buka & Supa",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Bistro",
    address: "Rr. Luan Haradinaj, Qendër",
    hours: "08:00 – 20:00",
    phone: "+383 44 000 206",
    mapsQuery: "Buka dhe Supa Pristina",
    rating: "4.8",
    description: "Supa ditore, sanduiçe të freskëta dhe gatime të lehta.",
  },
  {
    name: "Taco Ruta",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Ushqim meksikan",
    address: "Rr. Perandori Justinian, Qendër",
    hours: "11:00 – 22:30",
    phone: "+383 44 000 207",
    mapsQuery: "Taco Ruta Pristina",
    rating: "4.5",
    description: "Tacos, burrito dhe shije pikante të përgatitura shpejt.",
  },
  {
    name: "Kuzhina e Shtëpisë",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant familjar",
    address: "Rr. Tirana, Qendër",
    hours: "10:00 – 22:00",
    phone: "+383 44 000 208",
    mapsQuery: "Kuzhina e Shtepise Pristina",
    rating: "4.9",
    description: "Gatime tradicionale dhe menu ditore në një ambient familjar.",
  },
  {
    name: "Noodle Bar",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Kuzhinë aziatike",
    address: "Rr. Fehmi Agani, Qendër",
    hours: "11:00 – 23:00",
    phone: "+383 44 000 209",
    mapsQuery: "Noodle Bar Pristina",
    rating: "4.7",
    description: "Noodles, rice bowls dhe pjata aziatike të përgatitura në çast.",
  },
  ...placeholderPlaces,
];

export default function PlacesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [query, setQuery] = useState("");
  const [ownerPlaces, setOwnerPlaces] = useState<Place[]>([]);
  useEffect(() => { getBusinesses().then((businesses) => setOwnerPlaces(businesses.map((business) => ({
        name: business.name,
        category: business.category as Category,
        type: business.category,
        address: business.address,
        hours: business.hours || "Kontaktoni biznesin",
        phone: business.phone,
        mapsQuery: business.mapsUrl,
        rating: "I ri",
        description: business.description,
        promoted: business.premium,
      })))).catch(() => setOwnerPlaces([])); }, []);

  const shownCategories = useMemo(
    () =>
      categories.filter(({ name }) =>
        name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ),
    [query]
  );

  const selectedPlaces = [...places, ...ownerPlaces].filter(
    (place) => place.category === selected
  );

  function chooseCategory(category: string) {
    setSelected(category);

    const firstPlace =
      [...places, ...ownerPlaces].find((place) => place.category === category) ?? null;

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
                        <span className="place-type">{place.promoted ? "★ REKLAMË" : place.type}</span>

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
                      src={
                      `https://maps.google.com/maps?q=${encodeURIComponent(
      selectedPlace.mapsQuery.startsWith("http")
        ? selectedPlace.address + ", Lipjan, Kosovo"
        : selectedPlace.mapsQuery
    )}&z=16&output=embed`
  }
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
                  </div>

                  <div className="map-details">
                    <div>
                      <span className="place-type">
                        {selectedPlace.promoted ? "★ BIZNES PREMIUM" : selectedPlace.type}
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
                      href={selectedPlace.mapsQuery.startsWith("http") ? selectedPlace.mapsQuery : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.mapsQuery)}`}
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
