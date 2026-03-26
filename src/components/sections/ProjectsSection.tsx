import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowUpRight, Building2, Layers, Grid3X3, Move } from "lucide-react";
import img1 from "@/assets/proyecto1.jpg";
import img2 from "@/assets/proyecto2.jpg";
import img3 from "@/assets/proyecto3.jpg";
import img4 from "@/assets/proyecto4.jpg";

const projects = [
  {
    title: "Villa Los Arrayanes",
    category: "Residencial",
    location: "Quito, Pichincha",
    area: "320 m²",
    year: "2024",
    description: "Casa de dos plantas con diseño bioclimático integrado al paisaje andino. Materiales locales, ventilación natural y vistas privilegiadas al volcán.",
    image: img1,
    accentColor: "#c8a050",
    index: "01",
  },
  {
    title: "Centro Empresarial Norte",
    category: "Comercial",
    location: "Quito, Pichincha",
    area: "1,800 m²",
    year: "2024",
    description: "Complejo de oficinas con certificación verde LEED, paneles solares y sistema de captación de aguas lluvia. Eficiencia energética clase A+.",
    image: img2,
    accentColor: "#7ec96e",
    index: "02",
  },
  {
    title: "Bodega Logística Tababela",
    category: "Industrial",
    location: "Tababela, Pichincha",
    area: "4,200 m²",
    year: "2023",
    description: "Bodega de alta especificación para operaciones logísticas aeroportuarias. Estructura metálica, piso de concreto reforzado y sistema contra incendios.",
    image: img3,
    accentColor: "#d4c8a0",
    index: "03",
  },
  {
    title: "Condominio Las Palmas",
    category: "Residencial",
    location: "Cumbayá, Pichincha",
    area: "980 m²",
    year: "2023",
    description: "4 unidades de vivienda premium con jardines privativos, áreas comunales diseñadas y piscina compartida en entorno de naturaleza.",
    image: img4,
    accentColor: "#7ec96e",
    index: "04",
  },
];

export default function ProjectsSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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
    <section ref={sectionRef} style={{ backgroundColor: '#1c1810', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* Floating decorative icons */
        @keyframes floatX {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          33%      { transform: translate(8px,-16px) rotate(5deg); }
          66%      { transform: translate(-4px,-8px) rotate(-3deg); }
        }
        @keyframes floatY {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          50%      { transform: translate(-10px,-20px) rotate(-6deg); }
        }
        @keyframes floatZ {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-14px) scale(1.04); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .proj3-float-x { animation: floatX 9s ease-in-out infinite; }
        .proj3-float-y { animation: floatY 7s ease-in-out infinite; }
        .proj3-float-z { animation: floatZ 11s ease-in-out infinite; }
        .proj3-rotate  { animation: rotateSlow 24s linear infinite; }

        /* Reveal */
        .proj3-reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .proj3-reveal.in { opacity: 1; transform: translateY(0); }

        /* Card */
        .proj3-card {
          position: relative; overflow: hidden; cursor: pointer;
          display: block;
        }
        .proj3-bg-layer {
          position: absolute; inset: 0;
          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .proj3-card:hover .proj3-bg-layer { transform: scale(1.07); }

        /* Grain texture overlay */
        .proj3-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .proj3-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 24px;
        }
        .proj3-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.55) 40%, rgba(10,8,5,0.08) 75%, transparent 100%);
          transition: background 0.5s ease;
        }
        .proj3-card:hover .proj3-grad {
          background: linear-gradient(to top, rgba(10,8,5,0.99) 0%, rgba(10,8,5,0.75) 50%, rgba(10,8,5,0.2) 80%, transparent 100%);
        }

        /* Description reveal */
        .proj3-desc {
          font-size: 13px; line-height: 1.65;
          color: rgba(212,200,160,0.7);
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
          margin-bottom: 12px;
        }
        .proj3-card:hover .proj3-desc { max-height: 90px; opacity: 1; }

        /* Category badge */
        .proj3-badge {
          font-size: 9px; font-weight: 900; letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 4px 10px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(212,200,160,0.8);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .proj3-card:hover .proj3-badge {
          border-color: rgba(212,200,160,0.3);
          color: #d4c8a0;
          background: rgba(0,0,0,0.6);
        }

        /* Arrow button */
        .proj3-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }
        .proj3-card:hover .proj3-arrow {
          transform: rotate(45deg) scale(1.1);
        }

        /* Card slide-in */
        .proj3-slide {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .proj3-slide.in { opacity: 1; transform: translateY(0); }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .proj3-grid { grid-template-columns: 1fr !important; }
          .proj3-featured { grid-row: auto !important; min-height: 340px !important; }
          .proj3-small { min-height: 240px !important; }
        }

        /* Portfolio link */
        .proj3-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212,200,160,0.45);
          border-bottom: 1px solid rgba(212,200,160,0.15);
          padding-bottom: 3px;
          transition: all 0.3s ease;
        }
        .proj3-link:hover { color: #d4c8a0; border-color: rgba(212,200,160,0.4); gap: 14px; }
      `}</style>

      {/* Floating decorative icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="proj3-float-x" style={{ position: 'absolute', top: '12%', right: '4%', opacity: 0.06 }}>
          <Grid3X3 style={{ width: '100px', height: '100px', color: '#d4c8a0' }} />
        </div>
        <div className="proj3-float-y" style={{ position: 'absolute', top: '50%', left: '3%', opacity: 0.05 }}>
          <Layers style={{ width: '80px', height: '80px', color: '#7ec96e' }} />
        </div>
        <div className="proj3-rotate" style={{ position: 'absolute', bottom: '15%', right: '8%', opacity: 0.04 }}>
          <Move style={{ width: '64px', height: '64px', color: '#d4c8a0' }} />
        </div>
        <div className="proj3-float-z" style={{ position: 'absolute', bottom: '5%', left: '12%', opacity: 0.03 }}>
          <Building2 style={{ width: '120px', height: '120px', color: '#7ec96e' }} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className="px-6 md:px-10 lg:px-20" style={{ paddingTop: '112px', paddingBottom: '64px' }}>
            <div className={`proj3-reveal ${visible ? 'in' : ''}`}>
              <p style={{
                fontSize: '10px', fontWeight: 800, letterSpacing: '0.32em',
                textTransform: 'uppercase', color: '#c8a050', marginBottom: '28px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ width: '28px', height: '1.5px', background: '#c8a050', display: 'inline-block', flexShrink: 0 }} />
                Portafolio
              </p>
            </div>
            <div style={{ display: 'grid', gap: '40px', alignItems: 'end' }} className="lg:grid-cols-2">
              <div className={`proj3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '80ms' }}>
                <h2 style={{
                  fontSize: 'clamp(52px, 9vw, 104px)',
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: '-0.035em',
                  color: '#f5f0e8',
                }}>
                  Obras que<br />
                  <span style={{ color: '#c8a050' }}>hablan</span><br />
                  <span style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(212,200,160,0.2)',
                  }}>por sí solas</span>
                </h2>
              </div>
              <div className={`proj3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '160ms', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(212,200,160,0.45)', maxWidth: '320px' }}>
                  Cada proyecto es un reflejo de nuestra obsesión por la calidad y los detalles que hacen la diferencia real.
                </p>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,200,160,0.35)' }}>
                  500+ proyectos entregados en Ecuador
                </span>
              </div>
            </div>
          </div>

          {/* ── Grid ── */}
          <div
            className="proj3-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              gap: '3px',
            }}
          >
            {/* Featured card — col 1, span 2 rows */}
            <div
              className={`proj3-card proj3-slide proj3-featured ${visible ? 'in' : ''}`}
              style={{ gridRow: '1 / 3', minHeight: '560px', transitionDelay: '240ms' }}
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="proj3-bg-layer"
                style={{
                  backgroundImage: `url(${projects[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="proj3-grad" />
              <div className="proj3-overlay">
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="proj3-badge">{projects[0].category}</span>
                  <div className="proj3-arrow" style={{ borderColor: `rgba(${projects[0].accentColor === '#c8a050' ? '200,160,80' : '126,201,110'},0.3)` }}>
                    <ArrowUpRight style={{ width: '14px', height: '14px', color: projects[0].accentColor }} />
                  </div>
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p className="proj3-desc">{projects[0].description}</p>
                  <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                    {projects[0].title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(212,200,160,0.5)' }}>
                      <MapPin style={{ width: '11px', height: '11px' }} />{projects[0].location}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: projects[0].accentColor, letterSpacing: '-0.02em' }}>{projects[0].area}</span>
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(212,200,160,0.3)', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>
                      {projects[0].index} · {projects[0].year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards 2, 3, 4 */}
            {projects.slice(1).map((p, i) => (
              <div
                key={i}
                className={`proj3-card proj3-slide proj3-small ${visible ? 'in' : ''}`}
                style={{ minHeight: '278px', transitionDelay: `${320 + i * 80}ms` }}
                onMouseEnter={() => setHoveredIdx(i + 1)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className="proj3-bg-layer"
                  style={{
                    backgroundImage: `url(${p.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="proj3-grad" />
                <div className="proj3-overlay">
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="proj3-badge">{p.category}</span>
                    <div className="proj3-arrow" style={{ borderColor: `rgba(${p.accentColor === '#c8a050' ? '200,160,80' : '126,201,110'},0.25)` }}>
                      <ArrowUpRight style={{ width: '13px', height: '13px', color: p.accentColor }} />
                    </div>
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p className="proj3-desc">{p.description}</p>
                    <h3 style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: '8px' }}>
                      {p.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(212,200,160,0.45)' }}>
                        <MapPin style={{ width: '10px', height: '10px' }} />{p.location}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: p.accentColor, letterSpacing: '-0.01em' }}>{p.area}</span>
                    </div>
                    <div style={{ marginTop: '6px', fontSize: '10px', color: 'rgba(212,200,160,0.25)', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>
                      {p.index} · {p.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: '80px' }} />
        </div>
      </div>
    </section>
  );
}
