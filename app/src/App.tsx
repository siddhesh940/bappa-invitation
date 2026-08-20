import { useState, useEffect, useRef, useCallback } from "react";
import { invitationData } from "./data/invitationData";
import "./App.css";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function FloatingPetals({ count = 8 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 6}s`,
    size: `${8 + Math.random() * 6}px`,
    color:
      i % 3 === 0
        ? "var(--saffron-light)"
        : i % 3 === 1
        ? "var(--antique-gold)"
        : "var(--muted-red)",
  }));

  return (
    <div className="floating-petals">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

function SectionFadeIn({
  children,
  className = "",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const { ref, visible } = useInView(threshold);
  return (
    <div
      ref={ref}
      className={`fade-in-up ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ==================== OPENING SCREEN ==================== */
function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    setFadeOut(true);
    setTimeout(onOpen, 800);
  };

  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: `${8 + Math.random() * 8}px`,
    color:
      i % 3 === 0
        ? "var(--saffron-light)"
        : i % 3 === 1
        ? "var(--antique-gold)"
        : "rgba(192,57,43,0.3)",
  }));

  return (
    <div className={`opening-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="opening-rangoli" />
      {petals.map((p) => (
        <div
          key={p.id}
          className="opening-petal"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: `${5 + Math.random() * 4}s`,
          }}
        />
      ))}
      <div className="opening-content">
        <div className="opening-om">॥ श्री गणेशाय नमः ॥</div>
        <div className="opening-divider" />
        <div className="opening-title">गणपती बाप्पा मोरया</div>
        <div className="opening-subtitle">🙏</div>
        <button className="opening-btn" onClick={handleOpen}>
          आमंत्रण उघडा
        </button>
      </div>
    </div>
  );
}

/* ==================== HERO SECTION ==================== */
function HeroSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <section className="invitation-section hero-section">
      <div className="hero-glow" />
      <FloatingPetals count={6} />
      <div className="section-inner">
        <SectionFadeIn>
          <div className="hero-text-om">॥ श्री गणेशाय नमः ॥</div>
        </SectionFadeIn>

        <div
          ref={ref}
          className={`hero-image-wrapper ${visible ? "visible" : ""}`}
        >
          <img
            src={invitationData.bappaImages.hero}
            alt="श्री गणपती बाप्पा"
            loading="eager"
          />
        </div>

        <SectionFadeIn className="delay-1">
          <div className="hero-text-title">गणपती बाप्पा मोरया 🙏</div>
        </SectionFadeIn>

        <SectionFadeIn className="delay-2">
          <div className="hero-family-intro">
            {invitationData.familyName}च्या वतीने
            <br />
            आपले हार्दिक स्वागत आहे
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== DECORATIVE TRANSITION ==================== */
function DecorativeTransition() {
  const { ref, visible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`decorative-transition ${visible ? "visible" : ""}`}
    >
      <img
        src={invitationData.bappaImages.decorative}
        alt="सजावट"
        loading="lazy"
      />
      <div className="decorative-overlay" />
    </div>
  );
}

/* ==================== BAPPA FULL PHOTO ==================== */
function BappaFullSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <section className="invitation-section bappa-full-section">
      <div className="section-inner">
        <div className="floral-corner top-left" />
        <div className="floral-corner top-right" />
        <div className="floral-corner bottom-left" />
        <div className="floral-corner bottom-right" />

        <SectionFadeIn>
          <div className="section-divider" />
        </SectionFadeIn>

        <div
          ref={ref}
          className={`bappa-full-image ${visible ? "visible" : ""}`}
        >
          <img
            src={invitationData.bappaImages.full}
            alt="श्री गणपती बाप्पा — संपूर्ण प्रतिमा"
            loading="lazy"
          />
        </div>

        <SectionFadeIn className="delay-1">
          <div className="shloka">
            वक्रतुंड महाकाय
            <br />
            सूर्यकोटि समप्रभ।
            <br />
            निर्विघ्नं कुरु मे देव
            <br />
            शुभकार्येषु सर्वदा॥
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== FAMILY INTRO ==================== */
function FamilyIntro() {
  return (
    <section className="invitation-section family-intro-section">
      <FloatingPetals count={6} />
      <div className="section-inner">
        <SectionFadeIn>
          <div className="section-divider" />
        </SectionFadeIn>
        <SectionFadeIn className="delay-1">
          <div className="family-name-heading">
            {invitationData.familyName}
          </div>
        </SectionFadeIn>
        <SectionFadeIn className="delay-2">
          <div className="family-subtext">
            बाप्पांच्या आगमनाचा
            <br />
            आनंद आमच्या परिवारासोबत साजरा करा
          </div>
        </SectionFadeIn>
        <SectionFadeIn className="delay-3">
          <div className="section-divider" />
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== MEMBER SECTION ==================== */
function MemberSection({
  image,
  index,
}: {
  image: string;
  index: number;
}) {
  const { ref, visible } = useInView(0.1);

  return (
    <section className="invitation-section member-section">
      <div className="section-inner">
        <div
          ref={ref}
          className={`member-image-wrapper ${visible ? "visible" : ""}`}
        >
          <img
            src={image}
            alt={`${invitationData.familyName} — सदस्य ${index + 1}`}
            loading="lazy"
          />
          <div className="member-image-border" />
        </div>

        <SectionFadeIn className="delay-1">
          {index === 0 && (
            <div className="section-heading" style={{ color: "var(--antique-gold)" }}>
              {invitationData.familyName}
            </div>
          )}
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== CLOSE-UP BAPPA ==================== */
function CloseUpSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <section className="invitation-section closeup-section">
      <FloatingPetals count={5} />
      <div className="section-inner">
        <SectionFadeIn>
          <div className="section-divider" />
        </SectionFadeIn>

        <div
          ref={ref}
          className={`closeup-image-wrapper ${visible ? "visible" : ""}`}
        >
          <img
            src={invitationData.bappaImages.closeUp}
            alt="बाप्पांचे चरणी नमन"
            loading="lazy"
          />
        </div>

        <SectionFadeIn className="delay-1">
          <div className="closeup-text">
            बाप्पांच्या चरणी
            <br />
            मनःपूर्वक नमन 🙏
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== INVITATION MESSAGE ==================== */
function InvitationMessage() {
  return (
    <section className="invitation-section invitation-card-section">
      <div className="section-inner">
        <SectionFadeIn>
          <div className="invitation-card">
            <div className="card-om">॥ श्री गणेशाय नमः 🙏 ॥</div>
            <div className="section-divider" />
            <div className="card-text">
              आमच्या {invitationData.familyName}च्या घरी
              <br />
              विघ्नहर्ता, मंगलमूर्ती
              <br />
              श्री गणपती बाप्पांचे आगमन होत आहे.
              <br />
              <br />
              या मंगलमय सोहळ्यास आपल्या परिवारासह
              <br />
              उपस्थित राहून बाप्पांचे आशीर्वाद घ्यावेत,
              <br />
              ही नम्र विनंती.
            </div>
            <div className="card-closing">
              गणपती बाप्पा मोरया! ❤️
            </div>
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== EVENT DETAILS ==================== */
function EventDetails() {
  return (
    <section className="invitation-section events-section">
      <div className="section-inner">
        <SectionFadeIn>
          <div className="section-heading">मंगल सोहळ्याचे निमंत्रण</div>
          <div className="section-divider" />
        </SectionFadeIn>

        <div className="event-cards">
          <SectionFadeIn className="delay-1">
            <div className="event-card">
              <span className="event-icon">🪔</span>
              <div className="event-label">स्थापना</div>
              <div className="event-value">
                {invitationData.installationDate}
              </div>
            </div>
          </SectionFadeIn>

          <SectionFadeIn className="delay-2">
            <div className="event-card">
              <span className="event-icon">🕐</span>
              <div className="event-label">महाआरती</div>
              <div className="event-value">{invitationData.aartiTime}</div>
            </div>
          </SectionFadeIn>

          <SectionFadeIn className="delay-3">
            <div className="event-card">
              <span className="event-icon">📍</span>
              <div className="event-label">ठिकाण</div>
              <div className="event-value">{invitationData.address}</div>
            </div>
          </SectionFadeIn>
        </div>
      </div>
    </section>
  );
}

/* ==================== MAP SECTION ==================== */
function MapSection() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${invitationData.mapLat},${invitationData.mapLng}`;

  return (
    <section className="invitation-section map-section">
      <div className="section-inner">
        <SectionFadeIn>
          <div className="section-subheading">
            आमच्या घरी जरूर या 🙏
          </div>
          <div className="section-divider" />
        </SectionFadeIn>

        <SectionFadeIn className="delay-1">
          <div className="map-container">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                invitationData.mapLng - 0.01
              }%2C${invitationData.mapLat - 0.01}%2C${
                invitationData.mapLng + 0.01
              }%2C${invitationData.mapLat + 0.01}&layer=mapnik&marker=${
                invitationData.mapLat
              }%2C${invitationData.mapLng}`}
              title="नकाशा"
              loading="lazy"
            />
          </div>
        </SectionFadeIn>

        <SectionFadeIn className="delay-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
          >
            मार्ग पहा
          </a>
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== FINAL BLESSING ==================== */
function FinalBlessing() {
  const { ref, visible } = useInView(0.1);

  return (
    <section className="invitation-section final-section">
      <FloatingPetals count={8} />
      <div className="section-inner">
        <SectionFadeIn>
          <div className="section-divider" />
        </SectionFadeIn>

        <SectionFadeIn className="delay-1">
          <div
            className="section-subheading"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-body)",
            }}
          >
            आपली उपस्थिती
            <br />
            हीच आमच्यासाठी आशीर्वाद आहे ❤️
          </div>
        </SectionFadeIn>

        <div
          ref={ref}
          className={`final-image-wrapper ${visible ? "visible" : ""}`}
        >
          <img
            src={invitationData.bappaImages.final}
            alt="बाप्पांचा आशीर्वाद"
            loading="lazy"
          />
        </div>

        <SectionFadeIn className="delay-2">
          <div className="final-blessing-text">
            बाप्पांचा आशीर्वाद
            <br />
            सदैव आपल्या सर्वांवर राहो 🙏
          </div>
        </SectionFadeIn>

        <SectionFadeIn className="delay-3">
          <div className="final-moraya">गणपती बाप्पा मोरया! 🙏</div>
        </SectionFadeIn>

        <SectionFadeIn className="delay-4">
          <div className="final-family">{invitationData.familyName}</div>
        </SectionFadeIn>

        <SectionFadeIn className="delay-5">
          <div className="section-divider" />
        </SectionFadeIn>
      </div>
    </section>
  );
}

/* ==================== AUDIO CONTROL ==================== */
function AudioControl({
  musicSrc,
  started,
}: {
  musicSrc: string;
  started: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!started) return;
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [started, musicSrc]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  return (
    <button
      className={`audio-toggle ${started ? "visible" : ""}`}
      onClick={toggle}
      aria-label={playing ? "संगीत थांबवा" : "संगीत चालू करा"}
      title={playing ? "संगीत थांबवा" : "संगीत चालू करा"}
    >
      {playing ? (
        <div className="audio-bars">
          <div className="audio-bar" />
          <div className="audio-bar" />
          <div className="audio-bar" />
          <div className="audio-bar" />
        </div>
      ) : (
        <span className="audio-bars paused">
          <div className="audio-bar" />
          <div className="audio-bar" />
          <div className="audio-bar" />
          <div className="audio-bar" />
        </span>
      )}
    </button>
  );
}

/* ==================== FOOTER ==================== */
function Footer() {
  return (
    <footer className="invitation-footer">
      <div className="footer-text">
        {invitationData.familyName} — श्री गणपती बाप्पा मोरया 🙏
      </div>
    </footer>
  );
}

/* ==================== MAIN APP ==================== */
function App() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {!opened && <OpeningScreen onOpen={() => setOpened(true)} />}

      {opened && (
        <main>
          <HeroSection />
          <DecorativeTransition />
          <BappaFullSection />
          <FamilyIntro />
          {invitationData.familyImages.map((img, i) => (
            <MemberSection key={i} image={img} index={i} />
          ))}
          <DecorativeTransition />
          <CloseUpSection />
          <InvitationMessage />
          <EventDetails />
          <MapSection />
          <FinalBlessing />
          <Footer />
          <AudioControl
            musicSrc={invitationData.musicSrc}
            started={opened}
          />
        </main>
      )}
    </>
  );
}

export default App;
