import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone, Mail, MapPin, HardHat, Ruler, Building2, Compass, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const contacts = [
  { icon: MapPin,  label: "Quito, Ecuador",                   sub: "Dirección disponible próximamente" },
  { icon: Mail,    label: "constructoramorales952@gmail.com", sub: "Respondemos en menos de 24h" },
  { icon: Phone,   label: "+593 99 999 9999",                 sub: "Lun–Vie 8h00 – 18h00" },
];

export default function CTASection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#1a2a0e', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* Floating construction icons */
        @keyframes floatHat {
          0%,100% { transform: translateY(0) rotate(-4deg) scale(1); }
          50%      { transform: translateY(-22px) rotate(2deg) scale(1.04); }
        }
        @keyframes floatRuler {
          0%,100% { transform: translateY(0) rotate(12deg); }
          50%      { transform: translateY(-16px) rotate(6deg); }
        }
        @keyframes floatBuild {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(8px,-18px) scale(1.03); }
          66%      { transform: translate(-4px,-8px) scale(0.98); }
        }
        @keyframes floatCompass {
          0%,100% { transform: rotate(0deg) scale(1); }
          25%      { transform: rotate(15deg) scale(1.06); }
          75%      { transform: rotate(-10deg) scale(0.97); }
        }
        @keyframes floatShield {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-12px) scale(1.05); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes ctaPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(200,160,80,0.15); }
          50%      { box-shadow: 0 0 0 8px rgba(200,160,80,0.04); }
        }

        .cta3-hat     { animation: floatHat 7s ease-in-out infinite; }
        .cta3-ruler   { animation: floatRuler 9s ease-in-out infinite; }
        .cta3-build   { animation: floatBuild 11s ease-in-out infinite; }
        .cta3-compass { animation: floatCompass 8s ease-in-out infinite; }
        .cta3-shield  { animation: floatShield 6s ease-in-out infinite; }

        /* Blueprint grid */
        .cta3-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,160,80,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,160,80,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }
        .cta3-grid-fade {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 50%, transparent 20%, #1a2a0e 80%);
          pointer-events: none;
        }

        /* Reveal */
        .cta3-reveal {
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .cta3-reveal.in { opacity: 1; transform: translateY(0); }

        /* Marquee */
        .cta3-marquee {
          display: flex; white-space: nowrap;
          animation: marquee 22s linear infinite;
          user-select: none; pointer-events: none;
        }
        .cta3-marquee-text {
          font-size: clamp(52px, 10vw, 100px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: rgba(200,160,80,0.06);
          padding-right: 60px;
          line-height: 1;
        }

        /* Main CTA button */
        .cta3-btn-primary {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 20px 48px;
          background: #d4c8a0;
          color: #1a2a0e;
          font-size: 12px; font-weight: 900;
          letter-spacing: 0.2em; text-transform: uppercase;
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cta3-btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: #7ec96e;
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .cta3-btn-primary:hover::after { transform: translateX(0); }
        .cta3-btn-primary:hover { color: #0e1a08; gap: 22px; }
        .cta3-btn-primary > * { position: relative; z-index: 1; }

        /* Secondary CTA */
        .cta3-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 20px 40px;
          border: 1px solid rgba(212,200,160,0.2);
          color: rgba(212,200,160,0.65);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .cta3-btn-secondary:hover {
          border-color: rgba(212,200,160,0.45);
          color: #d4c8a0;
          gap: 16px;
          background: rgba(212,200,160,0.04);
        }

        /* Contact row */
        .cta3-contact {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(212,200,160,0.06);
          transition: all 0.25s ease;
          cursor: default;
        }
        .cta3-contact:first-child { border-top: 1px solid rgba(212,200,160,0.06); }
        .cta3-contact:hover { transform: translateX(8px); }

        .cta3-contact-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: rgba(200,160,80,0.08);
          border: 1px solid rgba(200,160,80,0.15);
          transition: all 0.3s ease;
        }
        .cta3-contact:hover .cta3-contact-icon {
          background: rgba(200,160,80,0.15);
          border-color: rgba(200,160,80,0.3);
        }

        /* Pulse dot */
        @keyframes cta3Pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(126,201,110,0.15); }
          50%      { box-shadow: 0 0 0 7px rgba(126,201,110,0.04); }
        }
        .cta3-pulse-dot {
          display: inline-block;
          width: 8px; height: 8px; border-radius: 50%;
          background: #7ec96e;
          animation: cta3Pulse 2.5s ease-in-out infinite;
        }

        /* ── Mobile ── */
        @media (max-width: 1023px) {
          .cta3-right-col { padding-left: 0 !important; }
          .cta3-left-col  { border-right: none !important; }
        }

        /* Social link */
        .cta3-social {
          font-size: '11px'; font-weight: 700;
          color: rgba(212,200,160,0.35);
          text-decoration: none;
          transition: color 0.2s ease;
          font-size: 11px;
          letter-spacing: 0.05em;
        }
        .cta3-social:hover { color: #d4c8a0; }
      `}</style>

      {/* Blueprint grid background */}
      <div className="cta3-grid" />
      <div className="cta3-grid-fade" />

      {/* Floating construction icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="cta3-hat" style={{ position: 'absolute', top: '10%', right: '8%', opacity: 0.07 }}>
          <HardHat style={{ width: '120px', height: '120px', color: '#d4c8a0' }} />
        </div>
        <div className="cta3-ruler" style={{ position: 'absolute', top: '55%', right: '4%', opacity: 0.05 }}>
          <Ruler style={{ width: '90px', height: '90px', color: '#7ec96e' }} />
        </div>
        <div className="cta3-build" style={{ position: 'absolute', bottom: '20%', left: '4%', opacity: 0.06 }}>
          <Building2 style={{ width: '100px', height: '100px', color: '#d4c8a0' }} />
        </div>
        <div className="cta3-compass" style={{ position: 'absolute', top: '20%', left: '48%', opacity: 0.04 }}>
          <Compass style={{ width: '80px', height: '80px', color: '#7ec96e' }} />
        </div>
        <div className="cta3-shield" style={{ position: 'absolute', bottom: '8%', right: '20%', opacity: 0.05 }}>
          <Shield style={{ width: '70px', height: '70px', color: '#d4c8a0' }} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Marquee text */}
        <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(200,160,80,0.08)', paddingTop: '56px', paddingBottom: '16px' }}>
          <div className="cta3-marquee">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="cta3-marquee-text">
                CONSTRUYE TU FUTURO · MORALES CONSTRUCTORA ·{' '}
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr' }} className="lg:grid-cols-2">

            {/* Left: typographic */}
            <div className="cta3-left-col" style={{ padding: '80px 0', borderRight: '1px solid rgba(200,160,80,0.08)' }}>
              <div className={`cta3-reveal ${visible ? 'in' : ''}`}>
                <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8a050', marginBottom: '32px' }}>
                  — Comienza hoy
                </p>
              </div>
              <div className={`cta3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '80ms' }}>
                <h2 style={{
                  fontSize: 'clamp(48px, 7.5vw, 96px)',
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: '#f5f0e8',
                  marginBottom: '40px',
                }}>
                  TU<br />
                  <span style={{ color: '#c8a050' }}>PROYECTO</span><br />
                  <span style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(200,160,80,0.3)',
                    display: 'block',
                    lineHeight: 1.05,
                  }}>EMPIEZA HOY.</span>
                </h2>
              </div>
              <div className={`cta3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '160ms' }}>
                <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(212,200,160,0.5)', maxWidth: '380px', marginBottom: '44px' }}>
                  Merece las mejores manos. Con 25 años de experiencia y más de 500 proyectos completados, somos la empresa que necesitas para hacer realidad tu visión.
                </p>
              </div>
              <div className={`cta3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '240ms' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
                  <Link to="/contacto" className="cta3-btn-primary">
                    <span>Solicitar Cotización Gratis</span>
                    <ArrowUpRight style={{ width: '17px', height: '17px' }} />
                  </Link>
                  <a href="tel:+593999999999" className="cta3-btn-secondary">
                    <Phone style={{ width: '15px', height: '15px' }} />
                    <span>Llamar Ahora</span>
                  </a>
                </div>
              </div>

              {/* Trust badges */}
              <div className={`cta3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '320ms', marginTop: '56px' }}>
                <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(200,160,80,0.1)' }}>
                  {[
                    { num: '500+', label: 'proyectos', color: '#7ec96e' },
                    { num: '25',   label: 'años',      color: '#c8a050' },
                    { num: '98%',  label: 'satisfacción', color: '#7ec96e' },
                  ].map((badge, i) => (
                    <div key={i} style={{
                      flex: 1, paddingTop: '20px',
                      paddingRight: i < 2 ? '20px' : '0',
                      paddingLeft: i > 0 ? '20px' : '0',
                      borderRight: i < 2 ? '1px solid rgba(200,160,80,0.1)' : 'none',
                    }}>
                      <div style={{ fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900, color: badge.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {badge.num}
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(212,200,160,0.3)', marginTop: '4px' }}>
                        {badge.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: contact info */}
            <div className="cta3-right-col" style={{ padding: '80px 0 80px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
              <div className={`cta3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '200ms' }}>
                <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(212,200,160,0.4)', marginBottom: '28px' }}>
                  Información de Contacto
                </p>
              </div>

              {contacts.map((c, i) => (
                <div
                  key={i}
                  className={`cta3-contact cta3-reveal ${visible ? 'in' : ''}`}
                  style={{ transitionDelay: `${280 + i * 80}ms` }}
                >
                  <div className="cta3-contact-icon">
                    <c.icon style={{ width: '16px', height: '16px', color: '#c8a050' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#f5f0e8', marginBottom: '2px' }}>{c.label}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(212,200,160,0.35)' }}>{c.sub}</p>
                  </div>
                </div>
              ))}

              {/* Availability signal */}
              <div
                className={`cta3-reveal ${visible ? 'in' : ''}`}
                style={{
                  transitionDelay: '520ms',
                  marginTop: '36px',
                  padding: '24px',
                  background: 'rgba(126,201,110,0.05)',
                  border: '1px solid rgba(126,201,110,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span className="cta3-pulse-dot" />
                  <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7ec96e' }}>
                    Disponibles ahora
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(212,200,160,0.45)' }}>
                  Primera consulta sin costo ni compromiso. Respondemos en menos de 24 horas.
                </p>
              </div>

              {/* Social links */}
              <div
                className={`cta3-reveal ${visible ? 'in' : ''}`}
                style={{ transitionDelay: '600ms', marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}
              >
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,200,160,0.25)' }}>
                  Síguenos
                </span>
                {[
                  { name: 'Facebook', href: 'https://www.facebook.com/constructoramoralesec' },
                  { name: 'Instagram', href: 'https://www.instagram.com/morales_constructora/' },
                ].map((net, i) => (
                  <a key={i} href={net.href} target="_blank" rel="noopener noreferrer" className="cta3-social">{net.name}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(200,160,80,0.08)',
          padding: '20px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'rgba(212,200,160,0.25)', fontFamily: 'Courier New, monospace', fontWeight: 600 }}>
            © {new Date().getFullYear()} Constructora Morales · Quito, Ecuador
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(212,200,160,0.2)', fontFamily: 'Courier New, monospace' }}>
            25 años · 500+ proyectos · Ecuador
          </p>
        </div>
      </div>
    </section>
  );
}
