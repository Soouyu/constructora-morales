import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Home, Building, Factory, Wrench, Ruler, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01",
    icon: Home,
    title: "Construcción Residencial",
    description: "Diseñamos y construimos tu casa desde cero con materiales certificados ISO, renders 3D previos y garantía estructural de 10 años.",
    tag: "Popular",
    metric: "320+",
    metricLabel: "casas construidas",
  },
  {
    num: "02",
    icon: Building,
    title: "Construcción Comercial",
    description: "Oficinas, locales y complejos empresariales que maximizan el espacio útil y proyectan la imagen que tu empresa merece.",
    tag: "",
    metric: "80+",
    metricLabel: "edificios entregados",
  },
  {
    num: "03",
    icon: Factory,
    title: "Construcción Industrial",
    description: "Galpones, bodegas y plantas de alta especificación. Estructuras robustas para operaciones intensivas con máximo aprovechamiento.",
    tag: "",
    metric: "60+",
    metricLabel: "plantas industriales",
  },
  {
    num: "04",
    icon: Wrench,
    title: "Remodelaciones",
    description: "Transformamos tu espacio sin interrumpir tu vida. Soluciones creativas que respetan la estructura y elevan el valor de tu propiedad.",
    tag: "",
    metric: "200+",
    metricLabel: "remodelaciones",
  },
  {
    num: "05",
    icon: Ruler,
    title: "Diseño Arquitectónico",
    description: "Renders 3D fotorrealistas y planos técnicos detallados. Ve cada rincón de tu obra antes de que exista una sola piedra.",
    tag: "Nuevo",
    metric: "150+",
    metricLabel: "proyectos diseñados",
  },
  {
    num: "06",
    icon: FileText,
    title: "Gestión de Permisos",
    description: "IRM, aprobaciones municipales y trámites legales completos. Nos encargamos de toda la burocracia para que tú te concentres en lo tuyo.",
    tag: "",
    metric: "100%",
    metricLabel: "tasa de éxito",
  },
];

export default function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
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
    <section ref={sectionRef} style={{ backgroundColor: '#0c1409', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* ── Reveal ── */
        .svc3-reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .svc3-reveal.in { opacity: 1; transform: translateY(0); }

        /* ── Row ── */
        .svc3-row {
          position: relative;
          display: grid;
          grid-template-columns: 72px 1fr auto;
          align-items: start;
          gap: 0 32px;
          padding: 36px 0;
          border-bottom: 1px solid rgba(126,201,110,0.08);
          cursor: pointer;
          overflow: hidden;
          transition: padding 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .svc3-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(126,201,110,0.04);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          border-left: 2px solid #7ec96e;
        }
        .svc3-row:hover::before,
        .svc3-row.active::before { transform: scaleX(1); }

        /* Number */
        .svc3-num {
          font-size: 12px;
          font-family: 'Courier New', monospace;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(126,201,110,0.25);
          padding-top: 6px;
          padding-left: 8px;
          transition: color 0.3s ease;
          position: relative; z-index: 1;
        }
        .svc3-row:hover .svc3-num,
        .svc3-row.active .svc3-num { color: #7ec96e; }

        /* Title */
        .svc3-title {
          font-size: clamp(20px, 2.4vw, 30px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: rgba(240,237,230,0.6);
          line-height: 1.1;
          transition: color 0.3s ease;
          position: relative; z-index: 1;
        }
        .svc3-row:hover .svc3-title,
        .svc3-row.active .svc3-title { color: #f0ede6; }

        /* Description */
        .svc3-desc {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(171,198,161,0.55);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.35s ease,
                      margin-top 0.35s ease;
          opacity: 0;
          margin-top: 0;
          position: relative; z-index: 1;
        }
        .svc3-row:hover .svc3-desc,
        .svc3-row.active .svc3-desc {
          max-height: 120px;
          opacity: 1;
          margin-top: 14px;
        }

        /* Tag */
        .svc3-tag {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 3px 8px;
          background: rgba(126,201,110,0.12);
          color: #7ec96e;
          border: 1px solid rgba(126,201,110,0.25);
          margin-left: 14px;
          vertical-align: middle;
          position: relative; top: -1px;
        }

        /* Right col */
        .svc3-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          padding-top: 4px;
          position: relative; z-index: 1;
        }
        .svc3-metric-num {
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: rgba(126,201,110,0.18);
          line-height: 1;
          transition: color 0.35s ease;
          font-variant-numeric: tabular-nums;
        }
        .svc3-row:hover .svc3-metric-num,
        .svc3-row.active .svc3-metric-num { color: rgba(126,201,110,0.55); }

        .svc3-metric-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(171,198,161,0.25);
          text-align: right;
          transition: color 0.35s ease;
        }
        .svc3-row:hover .svc3-metric-label,
        .svc3-row.active .svc3-metric-label { color: rgba(171,198,161,0.5); }

        /* Arrow */
        .svc3-arrow {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(126,201,110,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          color: rgba(126,201,110,0.3);
        }
        .svc3-row:hover .svc3-arrow,
        .svc3-row.active .svc3-arrow {
          background: #7ec96e;
          border-color: #7ec96e;
          color: #0c1409;
          transform: rotate(0deg) scale(1.1);
        }

        /* Icon box */
        .svc3-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(126,201,110,0.08);
          border: 1px solid rgba(126,201,110,0.12);
          margin-right: 12px;
          flex-shrink: 0;
          transition: all 0.3s ease;
          vertical-align: middle;
          position: relative; top: -2px;
        }
        .svc3-row:hover .svc3-icon,
        .svc3-row.active .svc3-icon {
          background: rgba(126,201,110,0.16);
          border-color: rgba(126,201,110,0.3);
        }

        /* Row entry animation */
        .svc3-row-anim {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .svc3-row-anim.in { opacity: 1; transform: translateX(0); }

        /* Oversize bg text */
        .svc3-bg-text {
          position: absolute;
          right: -20px; top: 50%;
          transform: translateY(-50%);
          font-size: clamp(160px, 22vw, 280px);
          font-weight: 900;
          letter-spacing: -0.06em;
          color: rgba(126,201,110,0.025);
          pointer-events: none;
          user-select: none;
          line-height: 1;
          white-space: nowrap;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .svc3-row {
            grid-template-columns: 40px 1fr;
            gap: 0 12px;
            padding: 24px 0;
          }
          .svc3-right { display: none; }
          .svc3-title { font-size: 18px; }
          .svc3-bg-text { display: none; }
        }

        /* CTA */
        .svc3-cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 40px;
          background: transparent;
          border: 1px solid rgba(126,201,110,0.25);
          color: rgba(240,237,230,0.7);
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.2em; text-transform: uppercase;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }
        .svc3-cta-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: #7ec96e;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .svc3-cta-btn:hover::after { transform: translateX(0); }
        .svc3-cta-btn:hover { color: #0c1409; border-color: #7ec96e; gap: 20px; }
        .svc3-cta-btn > * { position: relative; z-index: 1; }
      `}</style>

      {/* Oversize background word */}
      <div className="svc3-bg-text">06</div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: '112px', paddingBottom: '72px', borderBottom: '1px solid rgba(126,201,110,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }} className="lg:grid-cols-2 lg:items-end">

            {/* Left */}
            <div>
              <div className={`svc3-reveal ${visible ? 'in' : ''}`}>
                <p style={{
                  fontSize: '10px', fontWeight: 800, letterSpacing: '0.32em',
                  textTransform: 'uppercase', color: '#7ec96e', marginBottom: '28px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <span style={{ width: '32px', height: '1px', background: '#7ec96e', display: 'inline-block', flexShrink: 0 }} />
                  Nuestros Servicios
                </p>
              </div>
              <div className={`svc3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '80ms' }}>
                <h2 style={{
                  fontSize: 'clamp(48px, 7.5vw, 92px)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.035em',
                  color: '#f0ede6',
                }}>
                  Todo lo<br />
                  que tu<br />
                  <span style={{
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(126,201,110,0.5)',
                  }}>proyecto</span><br />
                  <span style={{ color: '#7ec96e' }}>necesita.</span>
                </h2>
              </div>
            </div>

            {/* Right */}
            <div className={`svc3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '160ms' }}>
              <p style={{
                fontSize: '15px', lineHeight: 1.8,
                color: 'rgba(171,198,161,0.6)',
                marginBottom: '36px',
              }}>
                Desde la primera consulta hasta la entrega final con garantía, cubrimos cada etapa constructiva con la misma dedicación y excelencia técnica.
              </p>
              <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(126,201,110,0.1)' }}>
                {[['500+', 'proyectos'], ['25', 'años de exp.'], ['6', 'especialidades']].map(([n, l], i) => (
                  <div key={i} style={{
                    flex: 1, padding: '20px 0',
                    borderRight: i < 2 ? '1px solid rgba(126,201,110,0.1)' : 'none',
                    paddingRight: i < 2 ? '24px' : '0',
                    paddingLeft: i > 0 ? '24px' : '0',
                  }}>
                    <div style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 900, color: '#7ec96e', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(171,198,161,0.35)', marginTop: '4px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Services list ── */}
        <div>
          {services.map((s, i) => (
            <div
              key={i}
              className={`svc3-row svc3-row-anim ${visible ? 'in' : ''} ${activeIdx === i ? 'active' : ''}`}
              style={{ transitionDelay: `${180 + i * 70}ms` }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Number */}
              <span className="svc3-num">{s.num}</span>

              {/* Center: icon + title + desc */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                  <div className="svc3-icon">
                    <s.icon style={{ width: '14px', height: '14px', color: '#7ec96e' }} />
                  </div>
                  <span className="svc3-title">{s.title}</span>
                  {s.tag && <span className="svc3-tag">{s.tag}</span>}
                </div>
                <p className="svc3-desc">{s.description}</p>
              </div>

              {/* Right: metric + arrow */}
              <div className="svc3-right">
                <div className="svc3-arrow">
                  <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="svc3-metric-num">{s.metric}</div>
                  <div className="svc3-metric-label">{s.metricLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA bar ── */}
        <div
          className={`svc3-reveal ${visible ? 'in' : ''}`}
          style={{
            transitionDelay: '640ms',
            padding: '60px 0',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '32px',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '24px' }}>
            <p style={{
              fontSize: '15px', lineHeight: 1.65,
              color: 'rgba(171,198,161,0.5)',
              maxWidth: '420px',
            }}>
              ¿Tu proyecto no encaja en estas categorías? Cuéntanos y diseñamos la solución perfecta.
            </p>
            <Link to="/contacto" className="svc3-cta-btn">
              <span>Solicitar Cotización</span>
              <ArrowUpRight style={{ width: '15px', height: '15px' }} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
