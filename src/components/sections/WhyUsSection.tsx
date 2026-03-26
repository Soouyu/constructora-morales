import { useEffect, useRef, useState } from "react";
import { Shield, Award, CheckCircle2, Zap, FileText, Users, Home, Wrench, Star, HardHat, Ruler, Building } from "lucide-react";

const keyStats = [
  { value: 96, suffix: "%", label: "Obras entregadas en plazo", detail: "Sobre 500 proyectos ejecutados" },
  { value: 25, suffix: "+", label: "Años de trayectoria", detail: "Desde 1999 construyendo el Ecuador" },
  { value: 10, suffix: "", label: "Años de garantía", detail: "Garantía estructural incluida" },
  { value: 98, suffix: "%", label: "Clientes satisfechos", detail: "Validado por encuesta interna" },
];

const allBenefits = [
  {
    category: "Calidad",
    color: "#7ec96e",
    items: [
      { icon: Shield, title: "Materiales Certificados ISO", desc: "Solo usamos proveedores con certificación ISO. Cada material es verificado antes de ingresar a obra." },
      { icon: Award, title: "25 Años de Trayectoria", desc: "Dos décadas y media resolviendo cada tipo de reto constructivo imaginable." },
      { icon: CheckCircle2, title: "Supervisión Diaria", desc: "Un ingeniero residente en obra todos los días. Reportes fotográficos semanales para el cliente." },
    ],
  },
  {
    category: "Proceso",
    color: "#c8a050",
    items: [
      { icon: Zap, title: "Cumplimiento de Plazos", desc: "Cronogramas reales y respetados. El 96% de nuestras obras se entrega en la fecha acordada." },
      { icon: FileText, title: "Transparencia Total", desc: "Presupuestos detallados sin letra pequeña. Cada cambio documentado y aprobado." },
      { icon: Users, title: "Equipo 100% Propio", desc: "No subcontratamos la obra. Todo nuestro equipo, misma calidad de principio a fin." },
    ],
  },
  {
    category: "Sostenibilidad",
    color: "#abc6a1",
    items: [
      { icon: Home, title: "Diseño Bioclimático", desc: "Orientamos las edificaciones para aprovechar luz y ventilación natural, reduciendo costos energéticos." },
      { icon: Wrench, title: "Materiales Locales", desc: "Priorizamos proveedores nacionales. Menos huella de carbono, más apoyo a la economía local." },
      { icon: Star, title: "Certificación Verde", desc: "Asesoramos en procesos de certificación ambiental LEED y equivalentes para proyectos que lo requieran." },
    ],
  },
];

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return value;
}

function StatCounter({ stat, trigger, delay, accent }: { stat: typeof keyStats[0]; trigger: boolean; delay: number; accent: string }) {
  const [localTrigger, setLocalTrigger] = useState(false);
  useEffect(() => {
    if (trigger) setTimeout(() => setLocalTrigger(true), delay);
  }, [trigger, delay]);
  const value = useCountUp(stat.value, 1800, localTrigger);

  return (
    <div style={{
      padding: '44px 36px',
      borderBottom: '1px solid rgba(212,200,160,0.06)',
      transition: 'background 0.35s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,200,160,0.03)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
    >
      <div style={{
        fontSize: 'clamp(48px, 7vw, 80px)',
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: accent,
        marginBottom: '10px',
        fontVariantNumeric: 'tabular-nums',
        transition: 'color 0.3s ease',
      }}>
        {value}{stat.suffix}
      </div>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f5f0e8', marginBottom: '5px', lineHeight: 1.2 }}>
        {stat.label}
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(212,200,160,0.35)', letterSpacing: '0.02em' }}>
        {stat.detail}
      </div>
    </div>
  );
}

const bars = [
  { label: "Índice de satisfacción",       pct: 98, color: "#7ec96e" },
  { label: "Entregas en plazo acordado",   pct: 96, color: "#c8a050" },
  { label: "Clientes que nos recomiendan", pct: 94, color: "#7ec96e" },
];

export default function WhyUsSection() {
  const [visible, setVisible] = useState(false);
  const [barVals, setBarVals] = useState(bars.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    bars.forEach((bar, i) => {
      const dur = 1400;
      const delay = 400 + i * 200;
      setTimeout(() => {
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setBarVals(prev => {
            const next = [...prev];
            next[i] = Math.round(bar.pct * e);
            return next;
          });
          if (p < 1) requestAnimationFrame(tick);
          else setBarVals(prev => { const n = [...prev]; n[i] = bar.pct; return n; });
        };
        requestAnimationFrame(tick);
      }, delay);
    });
  }, [visible]);

  const statAccents = ['#7ec96e', '#c8a050', '#7ec96e', '#c8a050'];

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#252018', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* Floating icons */
        @keyframes floatP {
          0%,100% { transform: translateY(0) rotate(0deg) scale(1); }
          40%      { transform: translateY(-20px) rotate(8deg) scale(1.03); }
          70%      { transform: translateY(-10px) rotate(-3deg) scale(0.98); }
        }
        @keyframes floatQ {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(-10deg); }
        }
        @keyframes floatR {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(10px,-18px); }
          66%      { transform: translate(-6px,-8px); }
        }
        @keyframes pulseBadge {
          0%,100% { opacity: 0.035; transform: scale(1); }
          50%      { opacity: 0.06; transform: scale(1.05); }
        }
        .why3-float-p { animation: floatP 7s ease-in-out infinite; }
        .why3-float-q { animation: floatQ 9s ease-in-out infinite; }
        .why3-float-r { animation: floatR 11s ease-in-out infinite; }
        .why3-pulse    { animation: pulseBadge 4s ease-in-out infinite; }

        /* Reveal */
        .why3-reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .why3-reveal.in { opacity: 1; transform: translateY(0); }

        /* Benefit row */
        .why3-benefit {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(212,200,160,0.05);
          transition: all 0.3s ease;
          cursor: default;
        }
        .why3-benefit:last-child { border-bottom: none; }
        .why3-benefit:hover { transform: translateX(8px); }

        .why3-icon-box {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .why3-benefit:hover .why3-icon-box { transform: scale(1.12) rotate(-4deg); }

        /* Col */
        .why3-col {
          padding: 44px 36px;
          border-right: 1px solid rgba(212,200,160,0.06);
        }
        .why3-col:last-child { border-right: none; }
        @media (max-width: 1023px) {
          .why3-col { border-right: none; border-bottom: 1px solid rgba(212,200,160,0.06); padding: 36px 20px; }
          .why3-col:last-child { border-bottom: none; }
        }

        /* Category label */
        .why3-cat {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 28px;
        }
        .why3-cat-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .why3-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why3-stat-cell > div { padding: 28px 20px !important; }
        }
        @media (max-width: 480px) {
          .why3-stats-grid { grid-template-columns: 1fr !important; }
        }

        /* Col entry */
        .why3-col-enter {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .why3-col-enter.in { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Floating decorative icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="why3-float-p" style={{ position: 'absolute', top: '8%', right: '5%', opacity: 0.04 }}>
          <HardHat style={{ width: '130px', height: '130px', color: '#c8a050' }} />
        </div>
        <div className="why3-float-q" style={{ position: 'absolute', top: '50%', left: '2%', opacity: 0.035 }}>
          <Ruler style={{ width: '90px', height: '90px', color: '#7ec96e' }} />
        </div>
        <div className="why3-float-r" style={{ position: 'absolute', bottom: '12%', right: '10%', opacity: 0.04 }}>
          <Building style={{ width: '110px', height: '110px', color: '#d4c8a0' }} />
        </div>
        <div className="why3-pulse" style={{ position: 'absolute', bottom: '30%', left: '6%' }}>
          <Shield style={{ width: '80px', height: '80px', color: '#7ec96e' }} />
        </div>
        {/* Decorative grid dots */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(212,200,160,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }} />
      </div>

      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div className="px-6 md:px-10 lg:px-20" style={{ paddingTop: '112px', paddingBottom: '64px' }}>
          <div className={`why3-reveal ${visible ? 'in' : ''}`}>
            <p style={{
              fontSize: '10px', fontWeight: 800, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: '#c8a050', marginBottom: '28px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ width: '28px', height: '1.5px', background: '#c8a050', display: 'inline-block', flexShrink: 0 }} />
              Por Qué Elegirnos
            </p>
          </div>
          <div style={{ display: 'grid', gap: '40px' }} className="lg:grid-cols-2 lg:items-end">
            <div className={`why3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '80ms' }}>
              <h2 style={{
                fontSize: 'clamp(52px, 8vw, 96px)',
                fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.035em',
                color: '#f5f0e8',
              }}>
                Más que<br />
                construir,<br />
                <span style={{ color: '#c8a050' }}>creamos</span>
              </h2>
            </div>
            <div className={`why3-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '160ms' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(212,200,160,0.45)', marginBottom: '24px' }}>
                Cada decisión que tomamos está orientada a entregar más valor del que el cliente espera. Eso es lo que nos ha mantenido 25 años en el mercado ecuatoriano.
              </p>
              {/* Animated progress bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {bars.map((bar, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '7px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(212,200,160,0.45)', letterSpacing: '0.04em' }}>
                        {bar.label}
                      </span>
                      <span style={{
                        fontSize: '16px', fontWeight: 900,
                        color: bar.color,
                        letterSpacing: '-0.02em',
                        fontVariantNumeric: 'tabular-nums',
                        minWidth: '42px', textAlign: 'right',
                        transition: 'color 0.3s ease',
                      }}>
                        {barVals[i]}%
                      </span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(212,200,160,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        borderRadius: '2px',
                        background: bar.color,
                        width: `${barVals[i]}%`,
                        transition: 'width 0.05s linear',
                        boxShadow: `0 0 8px ${bar.color}60`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          className={`why3-reveal why3-stats-grid ${visible ? 'in' : ''}`}
          style={{
            transitionDelay: '240ms',
            borderTop: '1px solid rgba(212,200,160,0.07)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {keyStats.map((s, i) => (
            <div
              key={i}
              className="why3-stat-cell"
              style={{ borderRight: i < keyStats.length - 1 ? '1px solid rgba(212,200,160,0.06)' : 'none' }}
            >
              <StatCounter stat={s} trigger={visible} delay={i * 180} accent={statAccents[i]} />
            </div>
          ))}
        </div>

        {/* ── Benefits 3-col ── */}
        <div
          style={{ borderTop: '1px solid rgba(212,200,160,0.07)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }} className="lg:grid-cols-3">
            {allBenefits.map((cat, ci) => (
              <div
                key={ci}
                className={`why3-col why3-col-enter ${visible ? 'in' : ''}`}
                style={{ transitionDelay: `${360 + ci * 120}ms` }}
              >
                <div className="why3-cat">
                  <div className="why3-cat-dot" style={{ background: cat.color }} />
                  <span style={{
                    fontSize: '10px', fontWeight: 900, letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: cat.color,
                  }}>
                    {cat.category}
                  </span>
                </div>
                {cat.items.map((b, bi) => (
                  <div key={bi} className="why3-benefit">
                    <div
                      className="why3-icon-box"
                      style={{
                        background: `${cat.color}14`,
                        border: `1px solid ${cat.color}22`,
                      }}
                    >
                      <b.icon style={{ width: '17px', height: '17px', color: cat.color }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f5f0e8', marginBottom: '4px', lineHeight: 1.2 }}>
                        {b.title}
                      </h4>
                      <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(212,200,160,0.38)' }}>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '80px' }} />
      </div>
    </section>
  );
}
