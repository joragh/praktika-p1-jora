
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
    name: "Restorant Berlin",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant tradicional",
    address: "Shën Flori",
    hours: "07:00 – 00:00",
    phone: "+383 44 848 481",
    mapsQuery: "https://maps.app.goo.gl/hzAX8yqzpvtbtLW6A",
    rating: "4.6",
    description:
      "Shije tradicionale, gatime shtëpie dhe ambient i ngrohtë.",
  },
  {
    name: "Centrum",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorantmodern",
    address: "Rr. Fehmi Agani",
    hours: "07:00 – 23:00",
    phone: "+383 45 456 565",
    mapsQuery: "https://maps.app.goo.gl/F2zjMsqRfFaaPqqp6",
    rating: "4.6",
    description:
      "Restoranti Centrum ofron një ambient të këndshëm për të shijuar ushqime të shijshme dhe për të kaluar momente të bukura me familjen dhe miqtë.",
  },
  {
    name: " Restaurant Marigona-J",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant",
    address: "Rr: Gjergj Kastrioti-Skënderbeu",
    hours: "07:00 – 23:00",
    phone: "+383 45 885 555",
    mapsQuery: "https://maps.app.goo.gl/Yv82skATaRALtio59",
    rating: "4.7",
    description:
      "Restoranti Marigona-J ofron ushqime të shijshme në një ambient të këndshëm, të përshtatshëm për dreka, darka dhe takime me familjen apo miqtë.",
  },
  {
    name: "Home Restorant",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Fine dining restorant",
    address: "Nje Maji",
    hours: "07:00 – 23:00",
    phone: "+383 4 911 15 72",
    mapsQuery: "https://maps.app.goo.gl/U8dTqSqEfJiZfxWX7",
    rating: "4.3",
    description: "Restoranti Home ofron ushqime të shijshme në një ambient të rehatshëm dhe mikpritës, ideal për të shijuar një vakt të mirë me familjen dhe miqtë.",
  },
  {
    name: "Golden day",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant",
    address: "78 Skenderbeu",
    hours: "07:00 – 23:30",
    phone: "+383 44 206 532",
    mapsQuery: "https://maps.app.goo.gl/t8D7oFswEZBsQ5Cq7",
    rating: "3.8",
    description: "Restoranti Golden Day ofron një ambient të këndshëm dhe një përzgjedhje ushqimesh të shijshme, ideal për dreka, darka dhe momente të bukura me familjen apo shoqërinë.",
  },
  {
    name: "Zaziki Fast Food",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Fast food",
    address: "78 Skenderbeu",
    hours: "Orët e hapjës nuk janë publikuar",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/Tjufi2sHp4UFtsJSA",
    rating: "3.7",
    description: "Zaziki Fast Food ofron ushqime të shpejta dhe të shijshme, ideale për një vakt të shpejtë gjatë ditës, me mundësi për të shijuar ushqimin e preferuar në një ambient të përshtatshëm.",
  },
  {
    name: "Proper Pizza",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Piceri",
    address: "Hajredin Bajrami",
    hours: "10:00 – 02:00",
    phone: "+383 45 208 283",
    mapsQuery: "https://maps.app.goo.gl/RKZs2R7CEXhK3oTG7",
    rating: "3.9",
    description: "Proper Pizza ofron një shumëllojshmëri picash me përbërës të ndryshëm dhe shije të veçanta, preferueshme për një vakt të shpejtë e të shijshëm me familjen ose shoqërinë.",
  },
  {
    name: "MENAM Resorant & Steakhouse",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant dhe Steakhouse",
    address: "Hajredin Bajrami",
    hours: "07:00 – 23:00",
    phone: "+383 49 100 073",
    mapsQuery: "https://maps.app.goo.gl/GidhRWxrsQxQcXdLA",
    rating: "4.3",
    description: "Menam Restaurant & Steakhouse ofron një përzgjedhje të mishrave të përgatitur në skarë dhe specialiteteve të ndryshme, në një ambient modern ku mund të shijoni ushqim të mirë me familjen dhe shoqërinë.",
  },
  {
    name: "Restorant Anija",
    category: "Restorante dhe ushqim i shpejtë",
    type: "Restorant",
    address: "Janjev Lipjan dardania 11",
    hours: "07:00 – 23:45",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/fHq8ixkCy7ZYzEKNA",
    rating: "4.3",
    description: "Restoranti Anija ofron një ambient të këndshëm dhe një përzgjedhje ushqimesh të shijshme, duke u bërë një vend i preferuar për dreka, darka dhe takime me familjen apo miqtë.",
  },
   {
    name: "Sach Coffee",
    category: "Kafene dhe ëmbëltore",
    type: "Coffee shop",
    address: "Komandant Kumanova",
    hours: "Orët e hapjës nuk janë publikuar",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/dQe8xipHWQHDoD9C8",
    rating: "3.9",
    description: "Sach Kafe ofron kafe aromatike dhe pije të ndryshme në një ambient të këndshëm e relaksues, ku mund të kaloni momente të bukura me shoqërinë ose të shijoni një pushim gjatë ditës.",
  },
  {
    name: "Room Cafe",
    category: "Kafene dhe ëmbëltore",
    type: "Bar",
    address: "Rr Sheshi Adem Jashari",
    hours: "07:00 – 23:00",
    phone: "+383 49 288 885",
    mapsQuery: "https://maps.app.goo.gl/KYdyiq6Hch4Lu7My5",
    rating: "No rating",
    description: "Room Cafe ofron kafe të shijshme dhe pije të ndryshme në një ambient modern e të rehatshëm, ku mund të kaloni kohë të këndshme me shoqërinë dhe të shijoni një pushim nga rutina e përditshme.",
  },
  {
    name: "Le Bon",
    category: "Kafene dhe ëmbëltore",
    type: "Cafe",
    address: "Rr. Hamez Jashari",
    hours: "07:00 – 23:00",
    phone: "+383 44 510 805",
    mapsQuery: "https://maps.app.goo.gl/abgQniLPSshETxpw5",
    rating: "4.9",
    description: "Le Bon është një kafene me ambient modern dhe atmosferë të këndshme, ku mund të shijoni pije të ndryshme dhe të kaloni kohë me shoqërinë.",
  },
  {
    name: "Nana e Bakllava",
    category: "Kafene dhe ëmbëltore",
    type: "Bakllavë dhe ëmbëltore",
    address: "Rr. Shqipëria Lidhja e Prizerenit",
    hours: "10:00 – 23:00",
    phone: "+383 45 102 486",
    mapsQuery: "https://maps.app.goo.gl/3vnL7MCGBTqEJ3y36",
    rating: "5.0",
    description: "Nana e Bakllava ofron një përzgjedhje të bukura bakllavash dhe ëmbëltoreve në një ambient të këndshëm, ku mund të shijoni ushqim të mirë me familjen dhe shoqërinë.",
  },
  {
    name: "Ice Caffe Centrum",
    category: "Kafene dhe ëmbëltore",
    type: "Cafe",
    address: "Rr. Skenderbeu",
    hours: "08:00 – 21:00",
    phone: "+383 44 876 356",
    mapsQuery: "https://maps.app.goo.gl/oxnob8uHHVtz7sbB6",
    rating: "5.0",
    description: "Ice Caffe Centrum ofron kafe të shijshme dhe pije të ndryshme në një ambient modern e të rehatshëm, ku mund të kaloni kohë të këndshme me shoqërinë dhe të shijoni një pushim nga rutina e përditshme.",
  },
  {
    name: "Home Restorant",
    category: "Kafene dhe ëmbëltore",
    type: "Kafe dhe restorant",
    address: "Nje Maji",
    hours: "07:00 – 23:00",
    phone: "+383 4 911 15 72",
    mapsQuery: "https://maps.app.goo.gl/J7zgPEkmWJW4gtJj7",
    rating: "4.3",
    description: "Home Restorant ofron ushqim dhe kafe të mirë dhe pije të shijshme në një ambient të këndshëm, ku mund të kaloni kohë të këndshme me familjen dhe shoqërinë.",
  },
  {
    name: "n'Lagje Restorant",
    category: "Kafene dhe ëmbëltore",
    type: "Kafe dhe restorant",
    address: "Haxhi Klecka",
    hours: "07:00 – 23:00",
    phone: "+383 49 883 554",
    mapsQuery: "https://maps.app.goo.gl/wxNPoFMFXyEDxLqp7",
    rating: "4.9",
    description: "N’Lagje është një kafene ku mund të shijoni pije të ndryshme në një ambient të rehatshëm dhe të kaloni kohë të këndshme me shoqërinë.",
  },
  {
    name: "eL Caffe",
    category: "Kafene dhe ëmbëltore",
    type: "Bar",
    address: "25 Fatmir Reqica",
    hours: "Orët e hapjës nuk janë publikuar",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/7gzESQnEsyr4hYGv9",
    rating: "5.0",
    description: "eL Caffe ofron një përzgjedhje pijesh të ndryshme në një ambient të këndshëm dhe mikpritës, ku mund të shijoni një pushim të qetë dhe të kaloni kohë me shoqërinë.",
  },
  {
    name: "Premium Lounge Bar",
    category: "Kafene dhe ëmbëltore",
    type: "Bar",
    address: "Adem Jashari 64",
    hours: "08:00 – 23:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/ACAQcE7RL3DVhX5i8",
    rating: "4.5",
    description: "Premium Lounge Bar ofron pije të ndryshme në një ambient modern dhe elegant, ku mund të relaksoheni, të dëgjoni muzikë dhe të kaloni mbrëmje të këndshme me shoqërinë.",
  },
  {
    name: " SHFMU Vëllezërit Frashëri Lipjan ",
    category: "Arsim",
    type: "Shkollë",
    address: "11 Gjergj Fishta",
    hours: "Orët e hapjës nuk janë publikuar",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/z52zukpaRZo3D3tS7",
    rating: "No rating",
    description: "Shkolla “Vëllezërit Frashëri” është institucion arsimor që ofron mësim dhe edukim për nxënësit, duke i ndihmuar ata të fitojnë njohuri, të zhvillojnë aftësitë e tyre dhe të përgatiten për të ardhmen.",
  },
  {
    name: "Gjimnazi Ulpiana",
    category: "Arsim",
    type: "Shkollë",
    address: "Komandant Kumanova",
    hours: "08:00 – 18:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/hr5b3kK2thXcXetX7",
    rating: "No rating",
    description: "Gjimnazi “Ulpiana” është institucion i arsimit të mesëm që u ofron nxënësve njohuri në fusha të ndryshme, duke i përgatitur për studime të mëtejshme dhe për sfidat e së ardhmes.",
  },
  {
    name: "SHFMU Ismail Luma",
    category: "Arsim",
    type: "Shkollë",
    address: "Hajredin Bajrami",
    hours: "08:00 – 18:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/odP8FtFytgvny4kv8",
    rating: "No rating",
    description: "Shkolla “Ismail Luma” është institucion arsimor që u ofron nxënësve mësim dhe edukim, duke i ndihmuar të zhvillojnë njohuritë, aftësitë dhe përgjegjësitë e tyre për të ardhmen.",
  },
  {
    name: "Shkolla Digjitale Lipjan",
    category: "Arsim",
    type: "Kurs",
    address: "Rr. Rrugë Avdi Kelmendi",
    hours: "09:00 – 21:00",
    phone: "+383 48 532 222",
    mapsQuery: "https://maps.app.goo.gl/SVP5g1euw2EvRcNK7",
    rating: "5.0",
    description: "Shkolla Digjitale ofron kurse dhe trajnime në fushën e teknologjisë dhe programimit, duke u ndihmuar fëmijëve dhe të rinjve të zhvillojnë aftësi digjitale dhe të mësojnë përmes praktikës.",
  },
  {
    name: "Qendra e Gjuhes Gjermane ‘Start DEUTSCH’",
    category: "Arsim",
    type: "Kurs",
    address: "100 Zylfie Gashi",
    hours: "08:30 – 20:30",
    phone: "+383 48 161 618",
    mapsQuery: "https://maps.app.goo.gl/o32n1MmuqtKjXmVf6",
    rating: "No rating",
    description: "Qendra e Gjuhës Gjermane “Start DEUTSCH” ofron kurse të gjuhës gjermane për nivele të ndryshme, duke i ndihmuar kursantët të përmirësojnë komunikimin dhe të përgatiten për studime, punë apo mundësi të reja në vendet gjermanishtfolëse.",
  },
  {
    name: "Inter-Language",
    category: "Arsim",
    type: "Kurs",
    address: "Skenderbeu",
    hours: "08:00 – 21:00",
    phone: "+383 44 557 539",
    mapsQuery: "https://maps.app.goo.gl/WLb6U6JUcP7eLgzW9",
    rating: "No rating",
    description: "Inter-Language ofron kurse të gjuhëve të huaja për nivele të ndryshme, duke ndihmuar kursantët të përmirësojnë aftësitë e komunikimit dhe të zgjerojnë mundësitë për studime, punë dhe zhvillim personal.",
  },
  {
    name: "Mara Education",
    category: "Arsim",
    type: "Kurs",
    address: "78 Skenderbeu",
    hours: "17:00 – 19:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/5YF4TDFedxQE5kgM7",
    rating: "No rating",
    description: "Mara Education ofron mundësi për mësim dhe zhvillim të njohurive përmes kurseve dhe aktiviteteve edukative, duke i ndihmuar nxënësit të përmirësojnë aftësitë e tyre dhe të përgatiten për sfida të reja.",
  },
  {
    name: "Mehmet Akif School",
    category: "Arsim",
    type: "Shkollë",
    address: "Mehmet Akif College, Banullë",
    hours: "08:30 – 17:00",
    phone: "+383 49 770 514",
    mapsQuery: "https://maps.app.goo.gl/64cZhDBu4NQHuUAw8",
    rating: "No rating",
    description: "Shkolla Mehmet Akif ofron arsimim dhe edukim për nxënësit në një mjedis mësimor që mbështet zhvillimin e njohurive, aftësive dhe vlerave të tyre për të ardhmen."
  },
  {
    name: "International Maarif Schools of Kosova",
    category: "Arsim",
    type: "Shkollë",
    address: "Rr Tomorri",
    hours: "07:00 – 19:00",
    phone: "+377 44 614 021",
    mapsQuery: "https://maps.app.goo.gl/QtimJ2UXMoHnWwut6",
    rating: "No rating",
    description: "International Maarif Schools of Kosova ofron arsimim përmes një programi mësimor ndërkombëtar, duke nxitur zhvillimin akademik, aftësitë gjuhësore dhe përgatitjen e nxënësve për mundësi të mëtejshme në arsim.",
  },
    {
    name: "Riga Pharm 17",
    category: "Shëndetësi dhe farmaci",
    type: "Barnatore",
    address: "21 Rruga Adem Jashari",
    hours: "08:00 – 23:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/h5ie9ycNZeop6V236",
    rating: "5.0",
    description: "Riga Pharm 17 është barnatore që ofron barna, produkte farmaceutike dhe artikuj për kujdesin personal, duke u shërbyer banorëve me produkte të nevojshme për kujdesin ndaj shëndetit.",
  },
   {
    name: "Rapid Pharm",
    category: "Shëndetësi dhe farmaci",
    type: "Barnatore",
    address: "320, Llugaxhi",
    hours: "Orët e hapjës nuk janë publikuar",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/fb2doUepi7YuAJyk6",
    rating: "5.0",
    description: "Rapid Pharmacy ofron barna, produkte farmaceutike dhe artikuj për kujdesin shëndetësor, duke ndihmuar banorët të gjejnë produktet e nevojshme për kujdesin e tyre të përditshëm.",
  },
   {
    name: "Valon Pharm",
    category: "Shëndetësi dhe farmaci",
    type: "Barnatore",
    address: "Tahir Sinani",
    hours: "07:00 – 21:00",
    phone: "+383 48 408 804",
    mapsQuery: "https://maps.app.goo.gl/z4z2P3pRvn8NGDhn9",
    rating: "5.0",
    description: "Valon Pharm ofron barna, produkte farmaceutike dhe artikuj për kujdesin personal, duke u mundësuar banorëve të gjejnë produkte të ndryshme për nevojat e tyre shëndetësore.",
  },
   {
    name: "Barnatorja LINDI PHARM",
    category: "Shëndetësi dhe farmaci",
    type: "Barnatore",
    address: "Tahir Sinani",
    hours: "08:00 – 20:00",
    phone: "+383 44 776 500",
    mapsQuery: "https://maps.app.goo.gl/ZaAdbjAcekZXBuVJ7",
    rating: "5.0",
    description: "Barnatorja “Lindi Pharm” ofron barna, produkte farmaceutike dhe artikuj për kujdesin personal, duke u shërbyer banorëve me produkte të nevojshme për shëndetin dhe mirëqenien e tyre.",
  },
   {
    name: "Qendra per Hixhame",
    category: "Shëndetësi dhe farmaci",
    type: "Hixhame",
    address: "Rr. Haxhi Kleqka",
    hours: "09:00 – 18:00",
    phone: "+383 44 698 592",
    mapsQuery: "https://maps.app.goo.gl/RYRYPhNGp4MdF1wx8",
    rating: "4.8",
    description: "Qendra për Hixhame ofron shërbime të hixhames, një praktikë tradicionale që përdoret nga disa persona për kujdesin dhe mirëqenien e trupit.",
  },
   {
    name: "Pumi Dent",
    category: "Shëndetësi dhe farmaci",
    type: "Stomatologji",
    address: "Tahir Sinani",
    hours: "09:00 – 18:00",
    phone: "+381 38 581 468",
    mapsQuery: "https://maps.app.goo.gl/Bj1taJzxSQXKq3ar7",
    rating: "4.8",
    description: "Pumi Dent ofron shërbime stomatologjike për kujdesin dhe mirëmbajtjen e dhëmbëve, duke ndihmuar në ruajtjen e shëndetit oral dhe të buzëqeshjes.",
  },
   {
    name: "Kabineti Radiologjik ALFA MED",
    category: "Shëndetësi dhe farmaci",
    type: "Radiologji",
    address: "Rruga, Nr.33 Bashkim Krasniqi",
    hours: "13:00 – 19:00",
    phone: "+383 44 372 414",
    mapsQuery: "https://maps.app.goo.gl/aYzPMSbBC9HhP58W8",
    rating: "No rating",
    description: "Kabineti Radiologjik “ALFA MED” ofron shërbime të radiologjisë dhe ekzaminime diagnostikuese, duke ndihmuar në vlerësimin e gjendjes shëndetësore përmes imazherisë mjekësore.",
  },
   {
    name: "Ordinanca ORTOPEDIA",
    category: "Shëndetësi dhe farmaci",
    type: "Ortopedi",
    address: "Bashkim Krasniqi",
    hours: "16:00 – 20:00",
    phone: "+383 44 201 577",
    mapsQuery: "https://maps.app.goo.gl/dZwCeqJZHW78M7Sn9",
    rating: "No rating",
    description: "Ordinanca “ORTOPEDIA” ofron shërbime për diagnostikimin dhe trajtimin e problemeve të kockave, nyjeve dhe sistemit muskuloskeletor, duke u fokusuar në përmirësimin e lëvizshmërisë dhe shëndetit fizik.",
  },
   {
    name: "Poliklinika Shpeb Med",
    category: "Shëndetësi dhe farmaci",
    type: "Poliklinik",
    address: "Nr. 19 Rr. Shën Lauri",
    hours: "08:00 – 20:00",
    phone: "+383 44 318 555",
    mapsQuery: "https://maps.app.goo.gl/SVcP58nbAbDCNUzd8",
    rating: "5.0",
    description: "Poliklinika Shpeb Med ofron shërbime të ndryshme mjekësore për kontrolle dhe vlerësime shëndetësore, duke u kujdesur për nevojat e pacientëve në një ambient profesional.",
  },
    {
    name: "Ambulanca",
    category: "Emergjenca",
    type: "Emergjenca",
    address: "72 Tahir Sinani",
    hours: "Hapur 24 orë",
    phone: "194",
    mapsQuery: "https://maps.app.goo.gl/J25RbvAvaJ1QTY7H6",
    rating: "No rating",
    description: "Ambulanca ofron shërbime bazë shëndetësore, kontrolle mjekësore dhe kujdes për pacientët, duke ndihmuar në vlerësimin dhe trajtimin fillestar të problemeve shëndetësore.",
  },
      {
    name: "Stacioni Policor Lipjan",
    category: "Emergjenca",
    type: "Polici",
    address: "Rr Shqiperia",
    hours: "Hapur 24 orë",
    phone: "192",
    mapsQuery: "https://maps.app.goo.gl/DMMdVKEVdi3AzvhS8",
    rating: "No rating",
    description: "Policia kujdeset për ruajtjen e rendit dhe sigurisë publike, parandalimin e veprave penale dhe mbrojtjen e qytetarëve, duke kontribuar në krijimin e një mjedisi të sigurt për të gjithë.",
  },
      {
    name: "Ordinanca specialistike e pediatrisë BLITRIDI",
    category: "Emergjenca",
    type: "Pulmonolog pediatrik",
    address: "Lipjan Isa Olluri",
    hours: "15:00 – 20:00",
    phone: "+383 49 820 503",
    mapsQuery: "https://maps.app.goo.gl/jEcQGVe934NwiP4E7",
    rating: "5.0",
    description: "Ordinanca Specialistike e Pediatrisë “BLITRIDI” ofron shërbime mjekësore për foshnjat dhe fëmijët, duke përfshirë kontrolle pediatrike dhe përcjelljen e zhvillimit dhe shëndetit të tyre.",
  },
      {
    name: "Poliklinika Etika",
    category: "Emergjenca",
    type: "Rr.Skenderbeu",
    address: "Poliklinik",
    hours: "08:00 – 20:00",
    phone: "+383 45 588 818",
    mapsQuery: "https://maps.app.goo.gl/vSKzamoKcFvkww9b7",
    rating: "No rating",
    description: "Poliklinika Etika ofron shërbime të ndryshme mjekësore dhe kontrolle shëndetësore, duke u kujdesur për nevojat e pacientëve dhe duke kontribuar në diagnostikimin dhe trajtimin e problemeve shëndetësore.",
  },
      {
    name: "Poliklinika Murat Medicus",
    category: "Emergjenca",
    type: "Poliklink",
    address: "Adem Gllavica",
    hours: "16:00 – 20:00",
    phone: "+383 44 919 858",
    mapsQuery: "https://maps.app.goo.gl/HPP6jb4LxCcpx3Xp7",
    rating: "No rating",
    description: "Poliklinika Murat Medicus ofron shërbime mjekësore dhe kontrolle shëndetësore në fusha të ndryshme, duke ndihmuar në vlerësimin, diagnostikimin dhe trajtimin e problemeve shëndetësore.",
  },
      {
    name: "Qendra e Mjekësisë Familjare",
    category: "Emergjenca",
    type: "Poliklink",
    address: "Tahir Sinani",
    hours: "12:00 – 00:00",
    phone: "Numri i telefonit nuk është i publikuar",
    mapsQuery: "https://maps.app.goo.gl/F2hkrSSZL2Sy14LA6",
    rating: "5.0",
    description: "Qendra e Mjekësisë Familjare ofron shërbime bazë shëndetësore, kontrolle mjekësore dhe kujdes parësor për qytetarët, duke ndihmuar në parandalimin, diagnostikimin dhe trajtimin fillestar të problemeve shëndetësore.",
  },
      {
    name: "Klinika Rona",
    category: "Emergjenca",
    type: "Klinik",
    address: "Tahir Sinani",
    hours: "09:00 – 19:00",
    phone: "+383 44 276 064",
    mapsQuery: "https://maps.app.goo.gl/qU3GLEKDqskaqtEe9",
    rating: "5.0",
    description: "Klinika Rona ofron shërbime mjekësore dhe kujdes shëndetësor për pacientët, duke u fokusuar në kontrolle dhe trajtime sipas nevojave të tyre.",
  },
      {
    name: "Fizioterapia NOIL",
    category: "Emergjenca",
    type: "Fizioterapi",
    address: "Adresa nuk është i publikuar",
    hours: "10:00 – 19:00",
    phone: "+383 45 681 189",
    mapsQuery: "https://maps.app.goo.gl/8eiwbrUstbXzunpm8",
    rating: "5.0",
    description: "Fizioterapia NOIL ofron shërbime fizioterapeutike dhe rehabilituese për përmirësimin e lëvizshmërisë, lehtësimin e dhimbjeve dhe rikthimin e funksionit fizik pas lëndimeve apo problemeve të ndryshme shëndetësore.",
  },
      {
    name: "PassionPet",
    category: "Emergjenca",
    type: "Veterinar",
    address: "Hajredin Bajrami",
    hours: "Orët e hapjës nuk janë publikuar",
    phone: "+383 45 465 645",
    mapsQuery: "https://maps.app.goo.gl/vS2Nr7As1o5m4ATx5",
    rating: "3.5",
    description: "PassionPet ofron produkte dhe pajisje për kafshët shtëpiake, duke përfshirë ushqim dhe artikuj për kujdesin e tyre, në mënyrë që pronarët të gjejnë gjërat e nevojshme për miqtë e tyre me katër putra.",
  },
];

function getPlacesForCategory(category: Category, ownerPlaces: Place[]) {
  const categoryPlaces = [...places, ...ownerPlaces].filter(
    (place) =>
      place.category === category &&
      place.name.trim() &&
      place.address.trim() &&
      place.mapsQuery.trim()
  );

  return categoryPlaces.length
    ? categoryPlaces
    : placeholderPlaces.filter((place) => place.category === category);
}

export default function PlacesPage() {
  const [selected, setSelected] = useState<Category | null>(null);
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

  const selectedPlaces = selected
    ? getPlacesForCategory(selected, ownerPlaces)
    : [];
  const activePlace =
    selectedPlaces.find((place) => place === selectedPlace) ??
    selectedPlaces[0] ??
    null;

  function chooseCategory(category: Category) {
    setSelected(category);
    setSelectedPlace(getPlacesForCategory(category, ownerPlaces)[0] ?? null);
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
          ) : selectedPlaces.length && activePlace ? (
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
                        activePlace === place
                          ? "location-card-active"
                          : ""
                      }`}
                      type="button"
                      onClick={() => setSelectedPlace(place)}
                      key={place.name}
                      aria-pressed={activePlace === place}
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
                  aria-label={`Harta për ${activePlace.name}`}
                >
                  <div className="map-frame">
                   <iframe
                    title={`Harta e Google për ${activePlace.name}`}
                      src={
                      `https://maps.google.com/maps?q=${encodeURIComponent(
      activePlace.mapsQuery.startsWith("http")
        ? activePlace.address + ", Lipjan, Kosovo"
        : activePlace.mapsQuery
    )}&z=16&output=embed`
  }
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
                  </div>

                  <div className="map-details">
                    <div>
                      <span className="place-type">
                        {activePlace.promoted ? "★ BIZNES PREMIUM" : activePlace.type}
                      </span>

                      <h3>{activePlace.name}</h3>

                      <p>⌖ {activePlace.address}</p>
                    </div>

                    <div className="detail-grid">
                      <span>
                        <b>Orari</b>
                        {activePlace.hours}
                      </span>

                      <span>
                        <b>Telefoni</b>
                        {activePlace.phone}
                      </span>
                    </div>

                    <a
                      className="maps-link"
                      href={activePlace.mapsQuery.startsWith("http") ? activePlace.mapsQuery : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activePlace.mapsQuery)}`}
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
