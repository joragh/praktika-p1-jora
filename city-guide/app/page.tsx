export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home">City Guide</a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#places">Places</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main id="home" className="hero">
        <div className="hero-content">
          <p className="eyebrow">Explore your city</p>
          <h1>City Guide</h1>
          <p className="subtitle">
            Discover great places around the city, from local favorites to your
            next memorable stop.
          </p>
        </div>
      </main>
    </>
  );
}
