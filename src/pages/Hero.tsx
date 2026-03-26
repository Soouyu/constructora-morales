import { Link } from "react-router-dom";
import { ArrowRight, Building, Users, Award, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/fondo1.png";
import fondo2 from "@/assets/fondo2.jpg";
import fondo3 from "@/assets/fondo3.jpg";
import fondo4 from "@/assets/fondo4.jpg";
import fondo5 from "@/assets/fondo5.jpg";
import constructor from "@/assets/constructor1.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import "../styles/hero.css";

import ServicesSection from "../components/sections/ServicesSection";
import ProcessSection from "../components/sections/ProcessSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import WhyUsSection from "../components/sections/WhyUsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";

// ─── Imágenes del slideshow ───────────────────────────────────────────────────
const bgImages = [heroImage, fondo2, fondo3, fondo4, fondo5];

// ─── Contenido por slide ──────────────────────────────────────────────────────
const slides = [
  {
    lines: [
      { text: "Construimos", color: "#f3f1ea", delay: 0, stroke: false },
      { text: "el Futuro,", color: "#7ec96e", delay: 110, stroke: false },
      { text: "Edificamos", color: "rgba(243,241,234,0.88)", delay: 220, stroke: false },
      { text: "Sueños.", color: "rgba(243,241,234,0.22)", delay: 330, stroke: true },
    ],
    sub: "Expertos en construcción residencial, comercial e industrial con más de 25 años transformando ideas en espacios que perduran.",
    project: { tag: "RESIDENCIAL", title: "Casa Moderna Cumbayá", area: "320 m²", year: "2024" },
    cardAnim: "cardSlideUp",
  },
  {
    lines: [
      { text: "Grandes", color: "#f3f1ea", delay: 0, stroke: false },
      { text: "Alturas,", color: "#7ec96e", delay: 110, stroke: false },
      { text: "Grandes", color: "rgba(243,241,234,0.88)", delay: 220, stroke: false },
      { text: "Resultados.", color: "rgba(243,241,234,0.22)", delay: 330, stroke: true },
    ],
    sub: "Edificios comerciales que maximizan el espacio y proyectan la imagen que tu empresa merece. Desde la primera piedra hasta la entrega.",
    project: { tag: "COMERCIAL", title: "Torre Empresarial Norte", area: "2,400 m²", year: "2024" },
    cardAnim: "cardSlideRight",
  },
  {
    lines: [
      { text: "Arquitectura", color: "#f3f1ea", delay: 0, stroke: false },
      { text: "que", color: "rgba(243,241,234,0.88)", delay: 110, stroke: false },
      { text: "Inspira", color: "#7ec96e", delay: 220, stroke: false },
      { text: "y Perdura.", color: "rgba(243,241,234,0.22)", delay: 330, stroke: true },
    ],
    sub: "Diseño arquitectónico con renders 3D fotorrealistas. Ve cada rincón de tu obra antes de que exista una sola piedra.",
    project: { tag: "DISEÑO", title: "Villa Arquitectónica Sur", area: "480 m²", year: "2024" },
    cardAnim: "cardFade",
  },
  {
    lines: [
      { text: "Tu Ciudad,", color: "#7ec96e", delay: 0, stroke: false },
      { text: "Nuestra", color: "#f3f1ea", delay: 110, stroke: false },
      { text: "Gran", color: "rgba(243,241,234,0.88)", delay: 220, stroke: false },
      { text: "Obra.", color: "rgba(243,241,234,0.22)", delay: 330, stroke: true },
    ],
    sub: "Proyectos urbanos de alto impacto que transforman comunidades. 500+ proyectos construidos en todo Ecuador con garantía total.",
    project: { tag: "URBANO", title: "Complejo Tababela", area: "8,500 m²", year: "2023" },
    cardAnim: "cardScale",
  },
  {
    lines: [
      { text: "Visión", color: "#f3f1ea", delay: 0, stroke: false },
      { text: "Aérea,", color: "#7ec96e", delay: 110, stroke: false },
      { text: "Resultados", color: "rgba(243,241,234,0.88)", delay: 220, stroke: false },
      { text: "Reales.", color: "rgba(243,241,234,0.22)", delay: 330, stroke: true },
    ],
    sub: "Plantas industriales y bodegas de alta especificación. Estructuras robustas para operaciones de máxima exigencia técnica.",
    project: { tag: "INDUSTRIAL", title: "Planta LogiMax", area: "3,500 m²", year: "2023" },
    cardAnim: "cardSlideLeft",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { number: "500+", label: "Proyectos" },
  { number: "25", label: "Años" },
  { number: "150+", label: "Profesionales" },
  { number: "98%", label: "Satisfacción" },
];
const parsedStats = stats.map(s => {
  const match = s.number.match(/^(\d+)([+%]?)$/)!;
  return { value: parseInt(match[1]), suffix: match[2], label: s.label };
});

// ─── Componente ───────────────────────────────────────────────────────────────
const Index = () => {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('loaderShown') === '1');
  const [stage, setStage] = useState(0);
  const [animatedNums, setAnimatedNums] = useState(parsedStats.map(() => 0));
  const [countDone, setCountDone] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [bgNext, setBgNext] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const run = async () => {
      await delay(200); setStage(1);
      await delay(900); setStage(2);
      await delay(1200); setStage(3);
      await delay(900); setStage(4);
      await delay(600); setStage(5);
    };
    run();
  }, [loaded]);

  // Slideshow: cambia imagen cada 7s con crossfade suave
  useEffect(() => {
    if (stage < 1) return;
    const interval = setInterval(() => {
      const next = (bgIndex + 1) % bgImages.length;
      setBgNext(next);
      setTransitioning(true);
      setTimeout(() => {
        setBgIndex(next);
        setBgNext(null);
        setTransitioning(false);
      }, 2000);
    }, 7000);
    return () => clearInterval(interval);
  }, [stage, bgIndex]);

  useEffect(() => {
    if (stage !== 3) return;
    const dur = 2000, t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setAnimatedNums(parsedStats.map(s => Math.floor(s.value * e)));
      if (p < 1) requestAnimationFrame(tick);
      else { setAnimatedNums(parsedStats.map(s => s.value)); setCountDone(true); setTimeout(() => setCountDone(false), 700); }
    };
    requestAnimationFrame(tick);
  }, [stage]);

  const currentSlide = slides[bgIndex];

  return (
    <div style={{ backgroundColor: '#050a04' }}>

      {!loaded && <Loader onDone={() => { sessionStorage.setItem('loaderShown', '1'); setLoaded(true); }} />}

      {/* ═══════════════════ HERO ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        <style>{`
          @keyframes kenBurns {
            from { transform: scale(1.04); }
            to   { transform: scale(1);    }
          }
          .hero-bg-img { animation: kenBurns 14s ease-out forwards; }

          @keyframes sweepRight {
            from { transform: scaleX(0); transform-origin: left; }
            to   { transform: scaleX(1); transform-origin: left; }
          }
          .hero-sweep { animation: sweepRight 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }

          @keyframes sweepFade {
            0%   { opacity: 1; }
            80%  { opacity: 1; }
            100% { opacity: 0; }
          }
          .hero-sweep-fade { animation: sweepFade 1.2s ease forwards; }

          .hero-word {
            display: block;
            transition: transform 1s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease;
          }

          .hero-cta-primary {
            display: inline-flex; align-items: center; gap: 12px;
            padding: 18px 42px;
            background: #7ec96e; color: #050a04;
            font-size: 12px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase;
            position: relative; overflow: hidden;
            transition: gap 0.3s ease;
          }
          .hero-cta-primary::after {
            content: ''; position: absolute; inset: 0;
            background: #f3f1ea;
            transform: translateX(-101%);
            transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          }
          .hero-cta-primary:hover::after { transform: translateX(0); }
          .hero-cta-primary:hover { gap: 20px; }
          .hero-cta-primary > * { position: relative; z-index: 1; }

          .hero-cta-secondary {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 18px 36px;
            border: 1.5px solid rgba(243,241,234,0.25); color: rgba(243,241,234,0.8);
            font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
            background: transparent; transition: all 0.3s ease;
          }
          .hero-cta-secondary:hover {
            border-color: rgba(126,201,110,0.5);
            color: #7ec96e; gap: 18px;
          }

          .hero-stat-item {
            padding: 22px 32px;
            transition: background 0.25s ease;
            cursor: default;
          }
          .hero-stat-item:hover { background: rgba(126,201,110,0.06); }

          @keyframes statSlideUp {
            from { opacity:0; transform: translateY(14px); }
            to   { opacity:1; transform: translateY(0); }
          }
          .stat-animate { animation: statSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

          @keyframes statDone {
            0%   { transform: scale(1);    }
            30%  { transform: scale(1.06); }
            60%  { transform: scale(0.97); }
            100% { transform: scale(1);    }
          }
          .stat-done { animation: statDone 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }

          @keyframes iconPop {
            0%   { transform: scale(1);    }
            40%  { transform: scale(1.25) rotate(-8deg); }
            70%  { transform: scale(0.95) rotate(4deg); }
            100% { transform: scale(1.12) rotate(0deg);  }
          }
          .icon-pop { animation: iconPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

          .hero-scroll-hint {
            animation: statSlideUp 0.8s 0.4s both;
          }

          /* ─── Mini project card animations ─── */
          @keyframes cardSlideUp {
            from { opacity: 0; transform: translateY(22px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes cardSlideRight {
            from { opacity: 0; transform: translateX(22px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes cardFade {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes cardScale {
            from { opacity: 0; transform: scale(0.86); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes cardSlideLeft {
            from { opacity: 0; transform: translateX(-22px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        {/* ── Background slideshow ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: stage >= 1 ? 1 : 0, transition: 'opacity 1.6s ease' }}>

          {/* Imagen activa con Ken Burns */}
          <img
            key={bgIndex}
            src={bgImages[bgIndex]}
            alt=""
            className="hero-bg-img"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          />

          {/* Imagen siguiente (crossfade entrante) */}
          {bgNext !== null && (
            <img
              key={`next-${bgNext}`}
              src={bgImages[bgNext]}
              alt=""
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                zIndex: 2,
                opacity: transitioning ? 1 : 0,
                transition: 'opacity 2s ease-in-out',
                animation: 'kenBurns 12s ease-out forwards',
              }}
            />
          )}

          {/* Gradient overlay izquierda */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            background: 'linear-gradient(108deg, rgba(5,10,4,0.95) 0%, rgba(5,10,4,0.72) 45%, rgba(5,10,4,0.28) 75%, rgba(5,10,4,0.06) 100%)',
          }} />
          {/* Vignette inferior para las stats */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px', zIndex: 3,
            background: 'linear-gradient(to top, rgba(5,10,4,0.97) 0%, transparent 100%)',
          }} />

          {/* Dots indicadores del slideshow */}
          <div style={{
            position: 'absolute', bottom: '120px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: '8px', zIndex: 10,
            opacity: stage >= 5 ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}>
            {bgImages.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  const next = i;
                  setBgNext(next); setTransitioning(true);
                  setTimeout(() => { setBgIndex(next); setBgNext(null); setTransitioning(false); }, 1200);
                }}
                style={{
                  width: i === bgIndex ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === bgIndex ? '#7ec96e' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Sweep line (intro only) ── */}
        {stage === 1 && (
          <div
            className="hero-sweep hero-sweep-fade"
            style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              height: '1.5px', background: 'linear-gradient(90deg, #7ec96e, rgba(126,201,110,0.2))',
              zIndex: 25,
            }}
          />
        )}

        {/* ── Navbar ── */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 55,
          opacity: stage >= 5 ? 1 : 0,
          transform: stage >= 5 ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <Navbar />
        </div>

        {/* ── Constructor character ── */}
        <div className="hero-constructor-wrapper" style={{
          position: 'absolute', right: 0, zIndex: 20,
          opacity: stage >= 4 ? 1 : 0,
          transform: stage >= 4 ? 'translateX(0) scale(1)' : 'translateX(48px) scale(0.97)',
          transition: 'opacity 1.1s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <img
            src={constructor}
            alt="Constructor profesional"
            className="hero-constructor-img"
            style={{
              objectFit: 'contain',
              objectPosition: 'bottom right',
              filter: [
                'drop-shadow(-18px 24px 40px rgba(0,0,0,0.82))',
                'drop-shadow(-6px 8px 16px rgba(0,0,0,0.65))',
                'drop-shadow(-2px 2px 6px rgba(0,0,0,0.45))',
                'brightness(0.86)',
                'contrast(1.08)',
                'saturate(0.90)',
              ].join(' '),
            }}
          />
        </div>

        {/* ── Main content ── */}
        <div className="hero-main-content" style={{
          position: 'relative', zIndex: 30, flexGrow: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(80px,10vw,120px) clamp(28px,6vw,96px) 160px',
        }}>

          {/* Eyebrow */}
          <div style={{ overflow: 'hidden', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '14px',
              transform: stage >= 2 ? 'translateY(0)' : 'translateY(110%)',
              opacity: stage >= 2 ? 1 : 0,
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
            }}>
              <div style={{ width: '40px', height: '1.5px', background: '#7ec96e', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7ec96e' }}>
                Constructora Morales · Ecuador · Desde 2015
              </span>
            </div>
          </div>

          {/* Headline — cada línea sube desde abajo + fade en cambio de slide */}
          <div style={{ marginBottom: '36px', overflow: 'visible' }}>
            {currentSlide.lines.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <h1
                  className="hero-word hero-headline"
                  style={{
                    fontSize: 'clamp(44px, 7.5vw, 96px)',
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: '-0.03em',
                    color: line.color,
                    ...(line.stroke ? { WebkitTextStroke: '1.5px rgba(126,201,110,0.35)' } : {}),
                    transform: stage >= 2 ? 'translateY(0)' : 'translateY(110%)',
                    opacity: (stage >= 2 && !transitioning) ? 1 : 0,
                    transitionDelay: transitioning ? '0ms' : `${200 + line.delay}ms`,
                  }}
                >
                  {line.text}
                </h1>
              </div>
            ))}
          </div>

          {/* Description — cambia con el slide */}
          <p style={{
            fontSize: '16px', lineHeight: 1.75, color: 'rgba(243,241,234,0.6)',
            maxWidth: '440px', marginBottom: '44px',
            opacity: (stage >= 3 && !transitioning) ? 1 : 0,
            transform: stage >= 3 ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {currentSlide.sub}
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '12px', flexWrap: 'wrap',
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            <Link to="/contacto" className="hero-cta-primary">
              <span>Solicitar Cotización</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
            <Link to="/servicios" className="hero-cta-secondary">
              Ver Servicios
            </Link>
          </div>

          {/* Mobile constructor */}
          <div className="hero-mobile-constructor-wrapper">
            <img src={constructor} alt="" className="hero-mobile-constructor" />
          </div>
        </div>

        {/* ── Mini project card (cambia por slide) ── */}
        {!transitioning && stage >= 4 && (
          <div
            key={`card-${bgIndex}`}
            className="hero-mini-card"
            style={{
              position: 'absolute',
              bottom: '170px',
              right: 'clamp(24px, 5vw, 64px)',
              zIndex: 35,
              animation: `${currentSlide.cardAnim} 0.65s cubic-bezier(0.16,1,0.3,1) forwards`,
            }}
          >
            <div style={{
              background: 'rgba(5,10,4,0.82)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(126,201,110,0.18)',
              padding: '16px 20px',
              minWidth: '200px',
              maxWidth: '240px',
            }}>
              {/* Tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                marginBottom: '10px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7ec96e', flexShrink: 0 }} />
                <span style={{
                  fontSize: '9px', fontWeight: 900, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#7ec96e',
                }}>
                  {currentSlide.project.tag}
                </span>
              </div>

              {/* Project title */}
              <p style={{
                fontSize: '14px', fontWeight: 800, color: '#f3f1ea',
                lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '10px',
              }}>
                {currentSlide.project.title}
              </p>

              {/* Meta */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(126,201,110,0.12)',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(171,198,161,0.6)', fontFamily: 'Courier New, monospace' }}>
                  {currentSlide.project.area}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(171,198,161,0.35)', fontFamily: 'Courier New, monospace' }}>
                  {currentSlide.project.year}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Stats bar (bottom) ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
          opacity: stage >= 3 ? 1 : 0,
          transform: stage >= 3 ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
        }}>
          <div className="hero-stats-grid" style={{
            margin: '0 clamp(20px,4vw,40px)',
            borderTop: '1px solid rgba(126,201,110,0.18)',
            background: 'rgba(5,10,4,0.8)',
            backdropFilter: 'blur(20px)',
          }}>
            {stats.map((stat, i) => {
              const icons = [Building, Award, Users, CheckCircle2];
              const Icon = icons[i];
              return (
                <div
                  key={i}
                  className="hero-stat-item stat-animate"
                  style={{
                    borderRight: i < stats.length - 1 ? '1px solid rgba(126,201,110,0.1)' : 'none',
                    animationDelay: `${i * 80}ms`,
                    display: 'flex', flexDirection: 'column', gap: '6px',
                  }}
                >
                  {/* Número + Icono en la misma fila */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Icono grande */}
                    <div
                      className={countDone ? 'icon-pop' : ''}
                      style={{
                        width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: countDone
                          ? 'rgba(126,201,110,0.22)'
                          : 'rgba(126,201,110,0.09)',
                        border: countDone
                          ? '1.5px solid rgba(126,201,110,0.55)'
                          : '1px solid rgba(126,201,110,0.18)',
                        transition: 'background 0.4s ease, border 0.4s ease',
                        boxShadow: countDone
                          ? '0 0 18px rgba(126,201,110,0.2)'
                          : 'none',
                      }}>
                      <Icon style={{
                        width: '26px', height: '26px',
                        color: countDone ? '#7ec96e' : 'rgba(126,201,110,0.5)',
                        transition: 'color 0.4s ease',
                      }} />
                    </div>

                    {/* Número */}
                    <div
                      className={countDone ? 'stat-done' : ''}
                      style={{
                        fontSize: 'clamp(28px, 4vw, 44px)',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                        color: countDone ? '#7ec96e' : '#f3f1ea',
                        transition: 'color 0.4s ease',
                        textShadow: countDone
                          ? '0 0 28px rgba(126,201,110,0.5), 0 0 56px rgba(126,201,110,0.2)'
                          : 'none',
                      }}>
                      {animatedNums[i]}{parsedStats[i].suffix}
                    </div>
                  </div>

                  {/* Label */}
                  <div style={{
                    fontSize: '11px', fontWeight: 700,
                    color: 'rgba(171,198,161,0.5)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" style={{
          position: 'absolute', bottom: '90px', right: 'clamp(24px,4vw,56px)',
          zIndex: 35,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: stage >= 5 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          <div style={{
            writingMode: 'vertical-rl',
            fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(126,201,110,0.45)',
          }}>
            Scroll
          </div>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, rgba(126,201,110,0.5), transparent)',
          }} />
        </div>
      </section>

      {/* ═══════════════════ SECCIONES ══════════════════════════════════════ */}
      <div id="servicios"><ServicesSection /></div>
      <ProcessSection />
      <ProjectsSection />
      <div id="nosotros"><WhyUsSection /></div>
      <TestimonialsSection />
      <CTASection />

    </div>
  );
};

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default Index;
