import { Link } from "react-router-dom";
import { Building, HardHat, Wrench, Ruler, Factory, Home, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Construcción Residencial",
    description: "Diseñamos y construimos hogares que combinan confort, estética y funcionalidad. Desde casas unifamiliares hasta desarrollos habitacionales completos.",
    features: ["Casas unifamiliares", "Departamentos", "Condominios", "Fraccionamientos"],
    gradient: "from-emerald-500/20 to-green-600/10",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Building,
    title: "Construcción Comercial",
    description: "Edificios comerciales y corporativos diseñados para maximizar la productividad y proyectar la imagen de tu empresa.",
    features: ["Oficinas corporativas", "Centros comerciales", "Locales comerciales", "Hoteles"],
    gradient: "from-amber-500/20 to-orange-600/10",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Factory,
    title: "Construcción Industrial",
    description: "Infraestructura industrial robusta y eficiente para plantas de producción, bodegas y centros de distribución.",
    features: ["Naves industriales", "Bodegas", "Plantas de producción", "Centros logísticos"],
    gradient: "from-slate-500/20 to-zinc-600/10",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-400",
  },
  {
    icon: Wrench,
    title: "Remodelaciones",
    description: "Transformamos espacios existentes para adaptarlos a tus nuevas necesidades, mejorando su funcionalidad y estética.",
    features: ["Remodelación integral", "Ampliaciones", "Modernización", "Restauración"],
    gradient: "from-teal-500/20 to-cyan-600/10",
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-400",
  },
  {
    icon: Ruler,
    title: "Diseño Arquitectónico",
    description: "Nuestro equipo de arquitectos crea diseños innovadores que equilibran belleza, funcionalidad y sustentabilidad.",
    features: ["Diseño conceptual", "Planos ejecutivos", "Renders 3D", "Maquetas virtuales"],
    gradient: "from-violet-500/20 to-purple-600/10",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: HardHat,
    title: "Supervisión de Obra",
    description: "Garantizamos que tu proyecto se ejecute conforme a los planes, presupuestos y tiempos establecidos.",
    features: ["Control de calidad", "Seguimiento de obra", "Gestión de proveedores", "Reportes periódicos"],
    gradient: "from-rose-500/20 to-red-600/10",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
  },
];

const steps = [
  { step: "01", title: "Consulta Inicial", desc: "Analizamos tus necesidades, objetivos y presupuesto en una reunión sin costo.", icon: "💬" },
  { step: "02", title: "Diseño y Planeación", desc: "Creamos planos ejecutivos, renders y presupuestos detallados para tu aprobación.", icon: "📐" },
  { step: "03", title: "Construcción", desc: "Ejecutamos cada etapa con calidad, precisión y cumplimiento de tiempos.", icon: "🏗️" },
  { step: "04", title: "Entrega y Garantía", desc: "Verificamos cada detalle antes de la entrega con garantía de satisfacción.", icon: "🏆" },
];

const Servicios = () => {
  return (
    <div className="overflow-hidden" style={{ backgroundColor: "#0d1a0d" }}>

      {/* ── PAGE HERO ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* background grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }}
        />
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #4e753e 0%, transparent 70%)" }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ backgroundColor: "#4e753e20", color: "#7ec96e", border: "1px solid #4e753e40" }}>
              ✦ Nuestros Servicios
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
              style={{ color: "#fdfdfb" }}>
              Soluciones{" "}
              <span style={{ color: "#7ec96e" }}>Completas</span>
              <br />en Construcción
            </h1>
            <p className="text-lg leading-relaxed max-w-xl"
              style={{ color: "#fdfdfb99" }}>
              Portafolio integral de servicios para proyectos de cualquier escala.
              Desde la conceptualización hasta la entrega final.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES BENTO GRID ── */}
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div key={index}
                className={`group relative rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1`}
                style={{
                  backgroundColor: "#111f11",
                  border: "1px solid #ffffff0d",
                  boxShadow: "0 0 0 0 transparent",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid #4e753e50";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px -10px #4e753e30";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid #ffffff0d";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                }}
              >
                {/* gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                {/* top-right arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                  <ArrowUpRight className="w-5 h-5" style={{ color: "#7ec96e" }} />
                </div>

                <div className="relative z-10">
                  {/* icon */}
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: "#fdfdfb" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#fdfdfb70" }}>
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm" style={{ color: "#fdfdfb90" }}>
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#7ec96e" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section-padding" style={{ backgroundColor: "#0a150a" }}>
        <div className="container-custom">

          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ backgroundColor: "#4e753e20", color: "#7ec96e", border: "1px solid #4e753e40" }}>
              ✦ Nuestro Proceso
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#fdfdfb" }}>
              Cómo Trabajamos
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#fdfdfb60" }}>
              Un proceso claro y estructurado que garantiza resultados excepcionales.
            </p>
          </div>

          {/* steps */}
          <div className="relative">
            {/* connector line desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-px" style={{ backgroundColor: "#4e753e30" }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  {/* step circle */}
                  <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 z-10"
                    style={{ backgroundColor: "#4e753e", boxShadow: "0 0 30px #4e753e60" }}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  {/* step number */}
                  <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#4e753e" }}>
                    Paso {item.step}
                  </span>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#fdfdfb" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#fdfdfb60" }}>{item.desc}</p>
                </div>
              ))}
            </div>
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
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: "#fdfdfb" }}>
              ¿Tienes un{" "}
              <span style={{ color: "#a8d88a" }}>Proyecto</span>
              {" "}en Mente?
            </h2>
            <p className="text-lg mb-10" style={{ color: "#fdfdfb80" }}>
              Cuéntanos sobre tu proyecto y recibe una cotización personalizada sin compromiso.
            </p>
            <Link to="/contacto"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#fdfdfb",
                color: "#1a3a1a",
                boxShadow: "0 10px 40px rgba(253,253,251,0.15)"
              }}
            >
              Solicitar Cotización
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Servicios;
