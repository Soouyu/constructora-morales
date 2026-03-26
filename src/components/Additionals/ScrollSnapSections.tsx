import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Ruler } from 'lucide-react';

// Importa tus videos
import videoFoco from '@/assets/videos/foco.mp4';
import videoPlano1 from '@/assets/videos/plano1.mp4';
import videoPlano2 from '@/assets/videos/plano2.mp4';
import videoCasco from '@/assets/videos/casco.mp4';
import videoRecorrido from '@/assets/videos/fondo-verde.mp4';

const ScrollSnapSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  const colors = {
    section1: '#252018',    // Fondo oscuro para el foco
    section2: '#ffffff',    // Fondo blanco para planos
    section3: '#f3f1ea',    // Fondo beige para casco
    section4: '#517841',    // Fondo verde para recorrido
    textLight: '#f3f1ea',
    textDark: '#252018',
    accent1: '#d3c9b9',
    accent2: '#abc6a1',
    verdePrincipal: '#5a7949',
  };

  // Configurar scroll snapping inmediato
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Forzar scroll snapping preciso
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.floor(scrollTop / sectionHeight);
      setActiveSection(currentSection);

      // Ajuste para snap perfecto
      if (scrollTop % sectionHeight !== 0) {
        const targetScroll = Math.round(scrollTop / sectionHeight) * sectionHeight;
        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    };

    // Configurar touch/mouse wheel para snap inmediato
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sectionHeight = window.innerHeight;
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetSection = Math.max(0, Math.min(3, activeSection + direction));
      
      container.scrollTo({
        top: targetSection * sectionHeight,
        behavior: 'smooth'
      });
      setActiveSection(targetSection);
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection]);

  // Navegar a sección
  const handleDotClick = (index: number) => {
    if (containerRef.current) {
      const sectionHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: index * sectionHeight,
        behavior: 'smooth'
      });
      setActiveSection(index);
    }
  };

  return (
    <div className="relative">
      {/* Navegación por puntos */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index 
                  ? 'scale-125' 
                  : 'opacity-50 hover:opacity-75'
              }`}
              style={{
                backgroundColor: activeSection === index 
                  ? colors.textLight 
                  : colors.accent1
              }}
              aria-label={`Ir a sección ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Contenedor principal */}
      <div 
        ref={containerRef}
        className="snap-container h-screen overflow-y-scroll"
        style={{ 
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory'
        }}
      >
        {/* SECCIÓN 1 - LA IDEA */}
        <section 
          className="snap-section relative"
          style={{ 
            backgroundColor: colors.section1,
            height: '100vh'
          }}
        >
          {/* Video del foco SIN overlay oscuro (ya tiene fondo transparente) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoFoco} type="video/mp4" />
          </video>

          {/* Solo un overlay sutil para legibilidad del texto */}
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(135deg, rgba(37, 32, 24, 0.6) 0%, rgba(37, 32, 24, 0.4) 100%)'
            }}
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
            <div 
              className="inline-block px-6 py-3 rounded-full mb-8"
              style={{ 
                backgroundColor: 'rgba(243, 241, 234, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span 
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ color: colors.textLight }}
              >
                Fase 1 · La Idea
              </span>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: colors.textLight }}
            >
              Donde todo <span style={{ color: colors.accent2 }}>comienza</span>
            </h1>

            <p 
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: colors.accent1 }}
            >
              Capturamos tu visión y la transformamos en el primer trazo hacia la realidad. 
              Cada gran proyecto nace de una chispa de inspiración.
            </p>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce">
                <ArrowDown className="w-6 h-6" style={{ color: colors.accent1 }} />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 - EL DISEÑO */}
        <section 
          className="snap-section relative"
          style={{ 
            backgroundColor: colors.section2,
            height: '100vh'
          }}
        >
          <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center px-4">
            {/* Plano 1 - Izquierda */}
            <div className="lg:w-1/3 h-1/2 lg:h-full flex items-center justify-center p-4">
              <div className="relative w-full max-w-md">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto max-h-[60vh] object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                  }}
                >
                  <source src={videoPlano1} type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Texto en el centro */}
            <div className="lg:w-1/3 h-1/3 lg:h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-md">
                <div className="mb-4">
                  <span 
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{ color: colors.verdePrincipal }}
                  >
                    Fase 2 · El Diseño
                  </span>
                  <div className="w-16 h-0.5 mt-2 mx-auto" style={{ backgroundColor: colors.accent1 }} />
                </div>

                <h2 
                  className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  style={{ color: colors.textDark }}
                >
                  Del concepto al <span style={{ color: colors.verdePrincipal }}>plano detallado</span>
                </h2>

                <p 
                  className="text-base md:text-lg mb-6 leading-relaxed"
                  style={{ color: colors.verdePrincipal }}
                >
                  Transformamos ideas en planos precisos con tecnología 3D. 
                  Visualiza cada detalle antes de la construcción.
                </p>

                {/* Elemento decorativo */}
                <div 
                  className="inline-flex p-3 rounded-lg shadow-lg"
                  style={{ 
                    backgroundColor: 'rgba(90, 121, 73, 0.05)',
                    border: `1px solid ${colors.accent1}`
                  }}
                >
                  <Ruler className="w-6 h-6" style={{ color: colors.verdePrincipal }} />
                </div>
              </div>
            </div>

            {/* Plano 2 - Derecha */}
            <div className="lg:w-1/3 h-1/2 lg:h-full flex items-center justify-center p-4">
              <div className="relative w-full max-w-md">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto max-h-[60vh] object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                  }}
                >
                  <source src={videoPlano2} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 - EL CASO */}
        <section 
          className="snap-section relative"
          style={{ 
            backgroundColor: colors.section3,
            height: '100vh'
          }}
        >
          {/* Video del casco SIN caja circular */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          >
            <source src={videoCasco} type="video/mp4" />
          </video>

          {/* Overlay sutil para legibilidad */}
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(135deg, rgba(243, 241, 234, 0.7) 0%, rgba(243, 241, 234, 0.5) 100%)'
            }}
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
            <div 
              className="inline-block px-6 py-3 rounded-full mb-8"
              style={{ 
                backgroundColor: 'rgba(90, 121, 73, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span 
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ color: colors.verdePrincipal }}
              >
                Fase 3 · Materialización
              </span>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: colors.textDark }}
            >
              Donde la visión toma <span style={{ color: colors.verdePrincipal }}>forma</span>
            </h1>

            <p 
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#887e72' }}
            >
              Tecnología de punta y métodos tradicionales se unen para crear 
              estructuras que perduran en el tiempo.
            </p>
          </div>
        </section>

        {/* SECCIÓN 4 - LA EXPERIENCIA (SIN CAMBIOS - ESTÁ PERFECTO) */}
        <section 
          className="snap-section relative"
          style={{ 
            backgroundColor: colors.section4,
            height: '100vh'
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src={videoRecorrido} type="video/mp4" />
          </video>

          {/* Elemento decorativo rotatorio */}
          <div className="absolute top-20 right-8 md:top-1/4 md:right-1/4">
            <div className="rotating-element">
              <div 
                className="w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center opacity-60"
                style={{ 
                  backgroundColor: 'rgba(243, 241, 234, 0.2)',
                  border: '2px dashed rgba(243, 241, 234, 0.4)'
                }}
              >
                <span className="text-2xl md:text-4xl">🏠</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-3xl">
              <div 
                className="inline-block px-6 py-3 rounded-full mb-8"
                style={{ 
                  backgroundColor: 'rgba(243, 241, 234, 0.15)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span 
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: colors.textLight }}
                >
                  Fase 4 · La Experiencia
                </span>
              </div>

              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: colors.textLight }}
              >
                Vive el espacio <span style={{ color: colors.accent2 }}>antes de construirlo</span>
              </h1>

              <p 
                className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                style={{ color: colors.accent2 }}
              >
                Recorridos virtuales inmersivos que te transportan dentro de tu futuro hogar o proyecto comercial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm md:text-base"
                  style={{ 
                    backgroundColor: colors.textLight,
                    color: colors.section4
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8e8e6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.textLight;
                  }}
                >
                  Solicitar Recorrido Virtual
                </button>
                <button 
                  className="px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all duration-300 border text-sm md:text-base"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: colors.textLight,
                    borderColor: colors.textLight
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(243, 241, 234, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Ver Proyectos Terminados
                </button>
              </div>
            </div>
          </div>

          {/* Indicador de fin */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p 
              className="text-sm mb-2"
              style={{ color: colors.accent2 }}
            >
              Continúa para ver más
            </p>
            <div className="animate-bounce">
              <ArrowDown className="w-5 h-5 md:w-6 md:h-6 mx-auto" style={{ color: colors.accent2 }} />
            </div>
          </div>
        </section>
      </div>

      {/* Estilos CSS mejorados */}
      <style>{`
        .snap-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory !important;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        .snap-section {
          min-height: 100vh;
          height: 100vh;
          scroll-snap-align: start !important;
          scroll-snap-stop: always !important;
          position: relative;
          overflow: hidden;
        }
        
        /* Fuerza el snap perfecto */
        html {
          scroll-snap-type: y mandatory;
        }
        
        .rotating-element {
          animation: suave-rotacion 2s cubic-bezier(.4, 0, 1, 1) infinite alternate;
        }
        
        @keyframes suave-rotacion {
          to { transform: rotate(3deg); }
        }
        
        /* Ocultar scrollbar pero mantener funcionalidad */
        .snap-container::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
        
        .snap-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Mejora el scroll en móviles */
        @media (max-width: 768px) {
          .snap-container {
            scroll-snap-type: y mandatory;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollSnapSections;