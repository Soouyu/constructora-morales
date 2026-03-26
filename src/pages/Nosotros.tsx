import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Users, Award, CheckCircle2, TrendingUp } from "lucide-react";

const stats = [
  { value: "25+", label: "Años de experiencia" },
  { value: "500+", label: "Proyectos completados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "120+", label: "Profesionales en equipo" },
];

const values = [
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos comprometemos con cada proyecto como si fuera propio, entregando siempre lo mejor.",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Buscamos la perfección en cada detalle, superando las expectativas de nuestros clientes.",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
  },
  {
    icon: Users,
    title: "Trabajo en Equipo",
    description: "Nuestro éxito se basa en la colaboración y el talento de nuestro equipo profesional.",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
  },
  {
    icon: CheckCircle2,
    title: "Integridad",
    description: "Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales.",
    color: "#7ec96e",
    bg: "rgba(126,201,110,0.1)",
  },
];

const timeline = [
  {
    year: "1999",
    title: "Fundación",
    description: "Iniciamos operaciones con un pequeño equipo de 5 personas con una gran visión.",
    milestone: "5 personas"
  },
  {
    year: "2005",
    title: "Expansión",
    description: "Ampliamos nuestros servicios a construcción comercial e industrial.",
    milestone: "Sector comercial"
  },
  {
    year: "2012",
    title: "Certificación",
    description: "Obtuvimos certificaciones ISO en calidad y seguridad laboral.",
    milestone: "ISO certificado"
  },
  {
    year: "2024",
    title: "Liderazgo Nacional",
    description: "Más de 500 proyectos completados con presencia en toda la república.",
    milestone: "+500 proyectos"
  },
];

const Nosotros = () => {
  return (
    <div className="overflow-hidden" style={{ backgroundColor: "#0d1a0d" }}>

      {/* ── PAGE HERO ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #4e753e 0%, transparent 70%)" }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ backgroundColor: "#4e753e20", color: "#7ec96e", border: "1px solid #4e753e40" }}>
              ✦ Sobre Nosotros
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
              style={{ color: "#fdfdfb" }}>
              25 Años{" "}
              <span style={{ color: "#7ec96e" }}>Construyendo</span>
              <br />Confianza
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#fdfdfb99" }}>
              Desde 1999, somos sinónimo de calidad, innovación y compromiso.
              Nuestra historia la escriben miles de familias y empresas que confían en nosotros.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ backgroundColor: "#111f11", borderTop: "1px solid #ffffff0d", borderBottom: "1px solid #ffffff0d" }}>
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl md:text-5xl font-black mb-2 transition-colors duration-300"
                  style={{ color: "#7ec96e" }}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium uppercase tracking-wide" style={{ color: "#fdfdfb60" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="rounded-3xl p-10 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#111f11",
                border: "1px solid #ffffff0d",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid #4e753e50";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px -10px #4e753e25";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid #ffffff0d";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"
                style={{ backgroundColor: "#4e753e" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                  style={{ backgroundColor: "#4e753e20" }}>
                  <Target className="w-7 h-7" style={{ color: "#7ec96e" }} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7ec96e" }}>
                  Nuestra Misión
                </div>
                <h2 className="text-2xl font-black mb-4" style={{ color: "#fdfdfb" }}>
                  Construir Espacios de Calidad Excepcional
                </h2>
                <p className="leading-relaxed" style={{ color: "#fdfdfb70" }}>
                  Construir espacios de calidad excepcional que superen las expectativas de nuestros
                  clientes, utilizando las mejores prácticas de la industria, materiales de primera
                  y un equipo altamente capacitado, contribuyendo al desarrollo urbano sostenible.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="rounded-3xl p-10 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#111f11",
                border: "1px solid #ffffff0d",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid #4e753e50";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px -10px #4e753e25";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid #ffffff0d";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"
                style={{ backgroundColor: "#4e753e" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                  style={{ backgroundColor: "#4e753e20" }}>
                  <Eye className="w-7 h-7" style={{ color: "#7ec96e" }} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7ec96e" }}>
                  Nuestra Visión
                </div>
                <h2 className="text-2xl font-black mb-4" style={{ color: "#fdfdfb" }}>
                  Ser la Constructora Líder en México
                </h2>
                <p className="leading-relaxed" style={{ color: "#fdfdfb70" }}>
                  Ser reconocidos como la constructora líder en México, distinguida por la excelencia
                  en cada proyecto, la innovación constante y el impacto positivo en las comunidades
                  donde operamos, estableciendo nuevos estándares en la industria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-padding" style={{ backgroundColor: "#0a150a" }}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ backgroundColor: "#4e753e20", color: "#7ec96e", border: "1px solid #4e753e40" }}>
              ✦ Nuestros Valores
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#fdfdfb" }}>
              Los Principios que Nos Guían
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#fdfdfb60" }}>
              Cada decisión, cada acto, cada proyecto está guiado por estos valores fundamentales.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <div key={index}
                className="rounded-3xl p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                style={{
                  backgroundColor: "#111f11",
                  border: "1px solid #ffffff0d",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${value.color}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px -10px ${value.color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid #ffffff0d";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: value.bg }}>
                  <value.icon className="w-8 h-8" style={{ color: value.color }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#fdfdfb" }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#fdfdfb60" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ backgroundColor: "#4e753e20", color: "#7ec96e", border: "1px solid #4e753e40" }}>
              ✦ Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#fdfdfb" }}>
              Un Camino de Crecimiento
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="group flex gap-8 pb-16 last:pb-0">
                {/* left: year + line */}
                <div className="flex flex-col items-center flex-shrink-0 w-20">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: "#4e753e",
                      color: "#fdfdfb",
                      boxShadow: "0 0 25px #4e753e50"
                    }}>
                    {item.year.slice(2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-px flex-1 mt-4" style={{ backgroundColor: "#4e753e30" }} />
                  )}
                </div>

                {/* right: content */}
                <div className="flex-1 pt-1 pb-4">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-sm font-bold" style={{ color: "#7ec96e" }}>{item.year}</span>
                    <span className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#4e753e20", color: "#7ec96e" }}>
                      {item.milestone}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2" style={{ color: "#fdfdfb" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#fdfdfb60" }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #1a3a1a 100%)" }} />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-6" style={{ color: "#a8d88a" }} />
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: "#fdfdfb" }}>
              ¿Quieres Conocer{" "}
              <span style={{ color: "#a8d88a" }}>Más</span>{" "}
              Sobre Nosotros?
            </h2>
            <p className="text-lg mb-10" style={{ color: "#fdfdfb80" }}>
              Visítanos en nuestras oficinas o contáctanos para conocer más sobre nuestro trabajo y proyectos.
            </p>
            <Link to="/contacto"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#fdfdfb",
                color: "#1a3a1a",
                boxShadow: "0 10px 40px rgba(253,253,251,0.15)"
              }}
            >
              Contáctanos Ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nosotros;
