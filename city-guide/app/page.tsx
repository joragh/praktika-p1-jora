import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <header className="site-header">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span>Qyteti i Lipjanit</Link>
        <nav aria-label="Main navigation">
          <Link className="nav-link active" href="/">Home</Link>
          <Link className="nav-link" href="/places">Places</Link>
          <a className="nav-link" href="#about">About</a>
        </nav>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Qyteti yt, më i thjeshtë</p>
          <h1 id="hero-title">Gjeje vendin tënd të radhës<br /><em>të preferuar.</em></h1>
          <p className="subtitle">Një udhëzues i përzgjedhur me kujdes për vendet që ta bëjnë qytetin të ndihet si shtëpi.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/places">Eksploro vendet <span aria-hidden="true">→</span></Link>
            <a className="text-button" href="#about">Si funksionon <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-stats" aria-label="Guide highlights"><div><strong>9</strong><span>kategori</span></div><div><strong>∞</strong><span>mundësi</span></div><div><strong>1.</strong><span>udhëzues qyteti</span></div></div>
      </section>
      <section className="home-about" id="about"><p className="eyebrow"><span /> Zbulo me lehtësi</p><p>Shfleto vendet sipas kategorive dhe gjej saktësisht atë që të nevojitet, kurdo që të të nevojitet.</p></section>
    </main>
  );
}
