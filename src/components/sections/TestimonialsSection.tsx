import { useEffect, useRef, useState } from "react";
import { Plus, Minus, HardHat, FileText, Clock, Shield, DollarSign, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    icon: DollarSign,
    category: "Presupuesto",
    question: "¿Cómo se calcula el costo de una construcción?",
    answer: "El costo depende del tipo de proyecto, los materiales seleccionados, el área a construir y la ubicación. Ofrecemos una estimación preliminar gratuita en la primera reunión. Los proyectos residenciales parten desde $350/m² con materiales estándar y hasta $650/m² con acabados premium. Siempre entregamos un presupuesto detallado y por etapas antes de firmar cualquier contrato.",
    color: "#c8a050",
  },
  {
    icon: Clock,
    category: "Tiempos",
    question: "¿Cuánto tiempo toma construir una casa?",
    answer: "Una casa de 150–200 m² toma entre 7 y 10 meses desde la aprobación de planos. El tiempo varía según la complejidad del diseño, los acabados elegidos y la obtención de permisos municipales. El 96% de nuestras obras se entrega en la fecha acordada. Puedes ver el avance en tiempo real con los reportes fotográficos semanales que enviamos a cada cliente.",
    color: "#7ec96e",
  },
  {
    icon: FileText,
    category: "Permisos",
    question: "¿Ustedes gestionan todos los permisos y trámites?",
    answer: "Sí, totalmente. Nos encargamos del IRM (Informe de Regulación Metropolitana), aprobación de planos en el municipio, permiso de construcción, inspecciones y declaratoria de propiedad horizontal si aplica. Tenemos una tasa de éxito del 100% en gestión de permisos en los últimos 5 años. Tú solo firmas los documentos necesarios.",
    color: "#4a7c3f",
  },
  {
    icon: Shield,
    category: "Garantía",
    question: "¿Qué cubre la garantía estructural de 10 años?",
    answer: "Cubre defectos en la estructura principal: cimentación, columnas, vigas, losas y muros portantes. Adicionalmente, ofrecemos 1 año de garantía en instalaciones eléctricas, hidráulicas y sanitarias, y 6 meses en acabados. Cada entrega incluye un manual de mantenimiento y una visita de seguimiento a los 6 meses para verificar el estado de la obra.",
    color: "#c8a050",
  },
  {
    icon: Ruler,
    category: "Diseño",
    question: "¿Puedo ver cómo quedará mi obra antes de construirla?",
    answer: "Sí. Desarrollamos renders 3D fotorrealistas y recorridos virtuales de tu proyecto antes de iniciar la obra. Incluimos hasta 3 rondas de revisión en el precio del diseño. También entregamos planos técnicos completos: arquitectónicos, estructurales, eléctricos e hidrosanitarios. Puedes ver cada rincón de tu obra antes de que exista una sola piedra.",
    color: "#7ec96e",
  },
  {
    icon: HardHat,
    category: "Equipo",
    question: "¿Ustedes subcontratan la mano de obra?",
    answer: "No. Todo nuestro equipo —albañiles, maestros, electricistas, plomeros— es propio y trabaja exclusivamente para Constructora Morales. Esto nos permite mantener estándares de calidad uniformes en cada obra. Tenemos un ingeniero residente en cada proyecto todos los días de trabajo, y realizamos reuniones semanales de avance que puedes seguir desde nuestra app de clientes.",
    color: "#4a7c3f",
  },
];

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#f5f0e8', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes faqFloatA {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes faqFloatB {
          0%,100% { transform: translateY(0) rotate(10deg); }
          50%      { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes faqFloatC {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(8px,-16px) scale(1.04); }
        }
        .faq-fa { animation: faqFloatA 8s ease-in-out infinite; }
        .faq-fb { animation: faqFloatB 10s ease-in-out infinite; }
        .faq-fc { animation: faqFloatC 7s ease-in-out infinite; }

        /* Reveal */
        .faq-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .faq-reveal.in { opacity: 1; transform: translateY(0); }

        /* Accordion row */
        .faq-row {
          border-bottom: 1px solid rgba(58,54,50,0.1);
          cursor: pointer;
          transition: background 0.25s ease;
        }
        .faq-row:first-child { border-top: 1px solid rgba(58,54,50,0.1); }
        .faq-row:hover { background: rgba(58,54,50,0.02); }

        .faq-header {
          display: grid;
          grid-template-columns: 48px 1fr auto;
          align-items: center;
          gap: 20px;
          padding: 28px 0;
        }

        .faq-icon-box {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.35s ease;
        }

        .faq-question {
          font-size: clamp(15px, 1.8vw, 18px);
          font-weight: 700;
          color: #3a3632;
          line-height: 1.3;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .faq-row:hover .faq-question { color: #2a2620; }

        .faq-toggle {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(58,54,50,0.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        .faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.16,1,0.3,1);
          padding-left: 68px;
        }
        .faq-body.open { grid-template-rows: 1fr; }
        .faq-body-inner { overflow: hidden; }
        .faq-body-text {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(58,54,50,0.6);
          padding-bottom: 28px;
          max-width: 680px;
        }

        /* Category chip */
        .faq-cat {
          font-size: 9px; font-weight: 900;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 4px;
        }

        /* Row entry anim */
        .faq-entry {
          opacity: 0; transform: translateX(-16px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .faq-entry.in { opacity: 1; transform: translateX(0); }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .faq-header {
            grid-template-columns: 40px 1fr auto;
            gap: 12px;
            padding: 22px 0;
          }
          .faq-body { padding-left: 52px; }
          .faq-body-text { font-size: 14px; }
          .faq-icon-box { width: 36px; height: 36px; }
        }

        /* CTA btn */
        .faq-cta {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 18px 44px;
          background: #3a3632;
          color: #f5f0e8;
          font-size: 11px; font-weight: 900;
          letter-spacing: 0.2em; text-transform: uppercase;
          position: relative; overflow: hidden;
          transition: gap 0.3s ease;
          text-decoration: none;
        }
        .faq-cta::after {
          content: ''; position: absolute; inset: 0;
          background: #4a7c3f;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .faq-cta:hover::after { transform: translateX(0); }
        .faq-cta:hover { gap: 22px; }
        .faq-cta > * { position: relative; z-index: 1; }
      `}</style>

      {/* Floating icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="faq-fa" style={{ position: 'absolute', top: '6%', right: '5%', opacity: 0.05 }}>
          <Shield style={{ width: '110px', height: '110px', color: '#3a3632' }} />
        </div>
        <div className="faq-fb" style={{ position: 'absolute', bottom: '12%', left: '3%', opacity: 0.05 }}>
          <HardHat style={{ width: '90px', height: '90px', color: '#4a7c3f' }} />
        </div>
        <div className="faq-fc" style={{ position: 'absolute', top: '45%', right: '3%', opacity: 0.04 }}>
          <FileText style={{ width: '80px', height: '80px', color: '#3a3632' }} />
        </div>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(58,54,50,0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: '112px', paddingBottom: '72px' }}>
          <div className={`faq-reveal ${visible ? 'in' : ''}`}>
            <p style={{
              fontSize: '10px', fontWeight: 800, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: '#4a7c3f', marginBottom: '28px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ width: '28px', height: '1.5px', background: '#4a7c3f', display: 'inline-block', flexShrink: 0 }} />
              Preguntas Frecuentes
            </p>
          </div>

          <div style={{ display: 'grid', gap: '40px' }} className="lg:grid-cols-2 lg:items-end">
            <div className={`faq-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '80ms' }}>
              <h2 style={{
                fontSize: 'clamp(48px, 7.5vw, 92px)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                color: '#3a3632',
              }}>
                Todo lo que<br />
                <span style={{ color: '#4a7c3f' }}>necesitas</span><br />
                <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(58,54,50,0.15)' }}>saber.</span>
              </h2>
            </div>
            <div className={`faq-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '160ms' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(58,54,50,0.55)', marginBottom: '28px' }}>
                Construir es una de las decisiones más importantes de tu vida. Aquí respondemos las preguntas que más nos hacen nuestros clientes antes de empezar.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Presupuesto', 'Tiempos', 'Permisos', 'Garantía'].map((tag, i) => (
                  <span key={i} style={{
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', padding: '6px 12px',
                    background: 'rgba(58,54,50,0.06)',
                    color: 'rgba(58,54,50,0.45)',
                    border: '1px solid rgba(58,54,50,0.1)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Accordion ── */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`faq-row faq-entry ${visible ? 'in' : ''}`}
                style={{ transitionDelay: `${220 + i * 80}ms` }}
                onClick={() => toggle(i)}
              >
                <div className="faq-header">
                  {/* Icon */}
                  <div
                    className="faq-icon-box"
                    style={{
                      background: isOpen ? `${faq.color}18` : 'rgba(58,54,50,0.06)',
                      border: `1.5px solid ${isOpen ? faq.color + '35' : 'rgba(58,54,50,0.1)'}`,
                      transition: 'all 0.35s ease',
                    }}
                  >
                    <faq.icon style={{
                      width: '18px', height: '18px',
                      color: isOpen ? faq.color : 'rgba(58,54,50,0.35)',
                      transition: 'color 0.3s ease',
                    }} />
                  </div>

                  {/* Question + category */}
                  <div>
                    <div style={{
                      fontSize: '9px', fontWeight: 900,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: isOpen ? faq.color : 'rgba(58,54,50,0.3)',
                      marginBottom: '4px',
                      transition: 'color 0.3s ease',
                    }}>
                      {faq.category}
                    </div>
                    <p className="faq-question" style={{ color: isOpen ? '#1e1c18' : '#3a3632' }}>
                      {faq.question}
                    </p>
                  </div>

                  {/* Toggle button */}
                  <div
                    className="faq-toggle"
                    style={{
                      background: isOpen ? faq.color : 'transparent',
                      borderColor: isOpen ? faq.color : 'rgba(58,54,50,0.18)',
                    }}
                  >
                    {isOpen
                      ? <Minus style={{ width: '15px', height: '15px', color: '#f5f0e8' }} />
                      : <Plus style={{ width: '15px', height: '15px', color: 'rgba(58,54,50,0.5)' }} />
                    }
                  </div>
                </div>

                {/* Expandable answer */}
                <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                  <div className="faq-body-inner">
                    <p className="faq-body-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div
          className={`faq-reveal ${visible ? 'in' : ''}`}
          style={{
            transitionDelay: '700ms',
            padding: '64px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '28px',
          }}
        >
          <div>
            <p style={{ fontSize: '20px', fontWeight: 800, color: '#3a3632', marginBottom: '6px', letterSpacing: '-0.01em' }}>
              ¿Tienes más preguntas?
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(58,54,50,0.5)', lineHeight: 1.6 }}>
              Habla con uno de nuestros ingenieros. Primera consulta sin costo ni compromiso.
            </p>
          </div>
          <Link to="/contacto" className="faq-cta">
            <span>Consultar Gratis</span>
            <HardHat style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>

      </div>
    </section>
  );
}
