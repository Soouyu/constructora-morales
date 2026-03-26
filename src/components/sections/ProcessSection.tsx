import { useEffect, useRef, useState } from "react";
import { Phone, Ruler, HardHat, CheckCircle2, ArrowRight, Compass, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Consulta Inicial",
    subtitle: "Sin costo · Sin compromiso",
    description: "Nos reunimos contigo para entender tu visión, presupuesto y plazos. Hacemos preguntas inteligentes para que el proyecto nazca bien desde el primer día.",
    detail: "Incluye evaluación del terreno, análisis de factibilidad y estimación preliminar.",
    color: "#7ec96e",
    bg: "#f5f0e8",
  },
  {
    num: "02",
    icon: Ruler,
    title: "Diseño y Planos",
    subtitle: "Renders 3D · Planos técnicos",
    description: "Nuestros arquitectos desarrollan renders fotorrealistas y planos técnicos detallados. Ves cada rincón de tu obra antes de que exista una sola piedra.",
    detail: "Hasta 3 rondas de revisión incluidas en el precio.",
    color: "#c8a050",
    bg: "#3a3632",
  },
  {
    num: "03",
    icon: HardHat,
    title: "Construcción",
    subtitle: "Supervisión diaria · Materiales ISO",
    description: "Ejecutamos con materiales certificados y un ingeniero residente en obra todos los días. Recibes reportes fotográficos semanales para estar siempre al tanto.",
    detail: "96% de nuestras obras se entrega en la fecha acordada.",
    color: "#7ec96e",
    bg: "#f5f0e8",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Entrega y Garantía",
    subtitle: "Garantía estructural 10 años",
    description: "Entregamos el proyecto llave en mano con todos los documentos legales al día. La garantía estructural de 10 años es nuestro compromiso más grande contigo.",
    detail: "Incluye manual de mantenimiento y visita de seguimiento a los 6 meses.",
    color: "#c8a050",
    bg: "#3a3632",
  },
];

export default function ProcessSection() {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
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
    <section ref={sectionRef} style={{ backgroundColor: '#f5f0e8', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* Floating decorative icons */
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(-8deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-22px) rotate(4deg); }
          66%      { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes drawLine {
          from { height: 0; }
          to   { height: 100%; }
        }
        .proc3-float-a { animation: floatA 6s ease-in-out infinite; }
        .proc3-float-b { animation: floatB 8s ease-in-out infinite; }
        .proc3-float-c { animation: floatC 10s ease-in-out infinite; }
        .proc3-spin    { animation: spinSlow 20s linear infinite; }

        /* Reveal */
        .proc3-reveal {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .proc3-reveal.in { opacity: 1; transform: translateY(0); }

        /* Step card */
        .proc3-card {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0 36px;
          align-items: start;
          padding: 52px 0;
          border-bottom: 1px solid rgba(58,54,50,0.1);
          cursor: default;
          transition: all 0.3s ease;
          position: relative;
        }
        .proc3-card:last-child { border-bottom: none; }

        /* Num column */
        .proc3-num-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          position: relative;
          padding-top: 4px;
        }
        .proc3-num {
          font-size: 11px;
          font-family: 'Courier New', monospace;
          font-weight: 900;
          letter-spacing: 0.14em;
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(58,54,50,0.2);
          color: rgba(58,54,50,0.4);
          background: transparent;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
          z-index: 1;
          position: relative;
        }
        .proc3-card:hover .proc3-num {
          background: #4a7c3f;
          border-color: #4a7c3f;
          color: #f5f0e8;
          transform: scale(1.1);
        }
        .proc3-connector {
          width: 1px;
          flex-grow: 1;
          background: linear-gradient(to bottom, rgba(58,54,50,0.15) 0%, transparent 100%);
          margin-top: 12px;
        }

        /* Icon orbit */
        .proc3-icon-wrap {
          width: 64px; height: 64px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          flex-shrink: 0;
        }

        /* Step content */
        .proc3-content { padding-top: 0; }
        .proc3-subtitle {
          font-size: 10px; font-weight: 800; letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(58,54,50,0.35);
          margin-bottom: 10px;
          transition: color 0.3s ease;
        }
        .proc3-card:hover .proc3-subtitle { color: #4a7c3f; }

        .proc3-title {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 900;
          letter-spacing: -0.025em;
          color: #3a3632;
          line-height: 1.05;
          margin-bottom: 16px;
          transition: color 0.3s ease;
        }
        .proc3-card:hover .proc3-title { color: #2a2620; }

        .proc3-desc {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(58,54,50,0.6);
          max-width: 560px;
          margin-bottom: 0;
        }
        .proc3-detail {
          font-size: 12px;
          line-height: 1.65;
          color: rgba(58,54,50,0.4);
          max-height: 0; overflow: hidden; opacity: 0;
          border-top: 1px solid rgba(58,54,50,0.08);
          transition: max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease, padding-top 0.3s ease;
          margin-top: 0; padding-top: 0;
          font-style: italic;
        }
        .proc3-card:hover .proc3-detail {
          max-height: 60px; opacity: 1;
          margin-top: 16px; padding-top: 16px;
        }

        /* Big step number bg art */
        .proc3-bg-num {
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          font-size: clamp(100px, 16vw, 180px);
          font-weight: 900;
          letter-spacing: -0.06em;
          color: rgba(58,54,50,0.04);
          user-select: none;
          pointer-events: none;
          line-height: 1;
          transition: color 0.4s ease;
        }
        .proc3-card:hover .proc3-bg-num { color: rgba(74,124,63,0.06); }

        /* Card entry */
        .proc3-entry {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .proc3-entry.in { opacity: 1; transform: translateX(0); }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .proc3-card {
            grid-template-columns: 52px 1fr;
            gap: 0 16px;
            padding: 36px 0;
          }
          .proc3-bg-num { display: none; }
          .proc3-title { font-size: 22px; }
          .proc3-desc { font-size: 14px; }
        }

        /* CTA btn */
        .proc3-cta {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 44px;
          background: #3a3632;
          color: #f5f0e8;
          font-size: 11px; font-weight: 900;
          letter-spacing: 0.2em; text-transform: uppercase;
          position: relative; overflow: hidden;
          transition: gap 0.3s ease;
        }
        .proc3-cta::after {
          content: ''; position: absolute; inset: 0;
          background: #4a7c3f;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .proc3-cta:hover::after { transform: translateX(0); }
        .proc3-cta:hover { gap: 22px; }
        .proc3-cta > * { position: relative; z-index: 1; }
      `}</style>

      {/* Floating background decorative icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="proc3-float-a" style={{ position: 'absolute', top: '8%', right: '6%', opacity: 0.05 }}>
          <Compass style={{ width: '120px', height: '120px', color: '#3a3632' }} />
        </div>
        <div className="proc3-float-b" style={{ position: 'absolute', top: '42%', right: '12%', opacity: 0.04 }}>
          <Layers style={{ width: '80px', height: '80px', color: '#4a7c3f' }} />
        </div>
        <div className="proc3-float-c" style={{ position: 'absolute', bottom: '10%', left: '4%', opacity: 0.04 }}>
          <HardHat style={{ width: '100px', height: '100px', color: '#3a3632' }} />
        </div>
        <div className="proc3-spin" style={{ position: 'absolute', top: '60%', left: '8%', opacity: 0.03 }}>
          <Ruler style={{ width: '64px', height: '64px', color: '#4a7c3f' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: '112px', paddingBottom: '72px' }}>
          <div className={`proc3-reveal ${visible ? 'in' : ''}`}>
            <p style={{
              fontSize: '10px', fontWeight: 800, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: '#4a7c3f', marginBottom: '28px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ width: '28px', height: '1.5px', background: '#4a7c3f', display: 'inline-block', flexShrink: 0 }} />
              Cómo Trabajamos
            </p>
          </div>
          <div style={{ display: 'grid', gap: '40px' }} className="lg:grid-cols-2 lg:items-end">
            <div className={`proc3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '80ms' }}>
              <h2 style={{
                fontSize: 'clamp(52px, 8vw, 96px)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                color: '#3a3632',
              }}>
                Tu proyecto,<br />
                <span style={{ color: '#4a7c3f' }}>paso</span>{' '}
                <span style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(58,54,50,0.2)',
                }}>a paso.</span>
              </h2>
            </div>
            <div className={`proc3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '160ms' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(58,54,50,0.55)', marginBottom: '28px' }}>
                Un proceso claro, sin sorpresas. Sabes exactamente qué sucede en cada etapa y estás siempre informado con reportes en tiempo real.
              </p>
              <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(58,54,50,0.1)' }}>
                {[['4', 'etapas'], ['96%', 'en plazo'], ['25+', 'años']].map(([n, l], i) => (
                  <div key={i} style={{
                    flex: 1, padding: '18px 0',
                    borderRight: i < 2 ? '1px solid rgba(58,54,50,0.1)' : 'none',
                    paddingRight: i < 2 ? '20px' : '0',
                    paddingLeft: i > 0 ? '20px' : '0',
                  }}>
                    <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, color: '#4a7c3f', letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(58,54,50,0.35)', marginTop: '4px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Steps ── */}
        <div style={{ borderTop: '1px solid rgba(58,54,50,0.1)' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`proc3-card proc3-entry ${visible ? 'in' : ''}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Background big number */}
              <span className="proc3-bg-num">{step.num}</span>

              {/* Left: circle number + connector */}
              <div className="proc3-num-col">
                <div className="proc3-num">{step.num}</div>
                {i < steps.length - 1 && (
                  <div className="proc3-connector" style={{
                    background: activeStep === i
                      ? `linear-gradient(to bottom, #4a7c3f 0%, rgba(74,124,63,0.1) 100%)`
                      : 'linear-gradient(to bottom, rgba(58,54,50,0.15) 0%, transparent 100%)',
                    transition: 'background 0.4s ease',
                    minHeight: '60px',
                  }} />
                )}
              </div>

              {/* Right: content */}
              <div className="proc3-content">
                {/* Icon + subtitle row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div
                    className="proc3-icon-wrap"
                    style={{
                      width: '52px', height: '52px',
                      background: activeStep === i ? '#4a7c3f' : 'rgba(58,54,50,0.07)',
                      border: `1.5px solid ${activeStep === i ? '#4a7c3f' : 'rgba(58,54,50,0.12)'}`,
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <step.icon style={{
                      width: '22px', height: '22px',
                      color: activeStep === i ? '#f5f0e8' : 'rgba(58,54,50,0.45)',
                      transition: 'color 0.3s ease',
                    }} />
                  </div>
                  <div className="proc3-subtitle">{step.subtitle}</div>
                </div>

                <h3 className="proc3-title">{step.title}</h3>
                <p className="proc3-desc">{step.description}</p>
                <div className="proc3-detail">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          className={`proc3-reveal ${visible ? 'in' : ''}`}
          style={{
            transitionDelay: '600ms',
            padding: '60px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '24px',
            borderTop: '1px solid rgba(58,54,50,0.1)',
          }}
        >
          <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'rgba(58,54,50,0.5)', maxWidth: '400px' }}>
            ¿Listo para empezar? La primera consulta es sin costo y sin compromiso.
          </p>
          <Link to="/contacto" className="proc3-cta">
            <span>Iniciar mi Proyecto</span>
            <ArrowRight style={{ width: '15px', height: '15px' }} />
          </Link>
        </div>

      </div>
    </section>
  );
}
