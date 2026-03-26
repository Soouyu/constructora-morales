import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    details: [
      { label: "Llamar", href: "tel:+593995833779", text: "+593 99 583 3779" },
      { label: "WhatsApp", href: "https://wa.me/593995833779?text=" + encodeURIComponent("Hola Constructora Morales, me gustaría obtener más información sobre sus servicios."), text: "WhatsApp" },
    ],
    color: "#7ec96e",
    bg: "rgba(126,201,110,0.12)",
  },
  {
    icon: Mail,
    title: "Correo Electrónico",
    details: [
      { label: "Email", href: "mailto:constructoramorales952@gmail.com", text: "constructoramorales952@gmail.com" },
    ],
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
  },
  {
    icon: MapPin,
    title: "Dirección",
    details: [
      { label: "", href: "", text: "Quito, Ecuador" },
    ],
    color: "#f87171",
    bg: "rgba(248,113,113,0.12)",
  },
  {
    icon: Clock,
    title: "Horario de Atención",
    details: [
      { label: "", href: "", text: "Lunes a Viernes: 8:00 – 17:00" },
      { label: "", href: "", text: "Sábado: 8:00 – 12:00" },
    ],
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.12)",
  },
];

const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Mensaje enviado!", {
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              ✦ Contacto
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
              style={{ color: "#fdfdfb" }}>
              Estamos Aquí{" "}
              <br />
              para{" "}
              <span style={{ color: "#7ec96e" }}>Ayudarte</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#fdfdfb99" }}>
              ¿Tienes un proyecto en mente? Nuestro equipo de expertos te asesorará
              sin compromiso. Estamos listos para hacer realidad tu visión.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* LEFT: Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="mb-8">
                <h2 className="text-2xl font-black mb-2" style={{ color: "#fdfdfb" }}>
                  Información de Contacto
                </h2>
                <p className="text-sm" style={{ color: "#fdfdfb60" }}>
                  Comunícate con nosotros por el medio que prefieras.
                </p>
              </div>

              {contactInfo.map((item, index) => (
                <div key={index}
                  className="rounded-2xl p-5 flex gap-4 items-start transition-all duration-300 hover:-translate-y-0.5 group cursor-default"
                  style={{
                    backgroundColor: "#111f11",
                    border: "1px solid #ffffff0d",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.border = `1px solid ${item.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px -5px ${item.color}15`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid #ffffff0d";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bg }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: "#fdfdfb" }}>
                      {item.title}
                    </h3>
                    {item.details.map((detail, idx) => (
                      detail.href ? (
                        <a key={idx} href={detail.href}
                          target={detail.href.startsWith("http") ? "_blank" : undefined}
                          rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm block transition-colors duration-200 hover:opacity-100"
                          style={{ color: item.color, opacity: 0.75 }}>
                          {detail.text}
                        </a>
                      ) : (
                        <p key={idx} className="text-sm" style={{ color: "#fdfdfb60" }}>
                          {detail.text}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* Quick CTA */}
              <div className="rounded-2xl p-6 mt-4"
                style={{
                  background: "linear-gradient(135deg, #1a3a1a, #2a4a2a)",
                  border: "1px solid #4e753e40"
                }}>
                <MessageSquare className="w-8 h-8 mb-3" style={{ color: "#7ec96e" }} />
                <p className="text-sm font-semibold mb-1" style={{ color: "#fdfdfb" }}>
                  Respuesta en menos de 24h
                </p>
                <p className="text-xs" style={{ color: "#fdfdfb60" }}>
                  Nuestro equipo está disponible para atenderte de lunes a sábado.
                </p>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl p-8 md:p-10"
                style={{
                  backgroundColor: "#111f11",
                  border: "1px solid #ffffff0d",
                }}>
                <h2 className="text-2xl font-black mb-1" style={{ color: "#fdfdfb" }}>
                  Envíanos un Mensaje
                </h2>
                <p className="text-sm mb-8" style={{ color: "#fdfdfb60" }}>
                  Completa el formulario y te responderemos en menos de 24 horas.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: "#fdfdfb80" }}>
                        Nombre Completo *
                      </label>
                      <Input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        className="h-12 rounded-xl text-sm"
                        style={{
                          backgroundColor: "#0d1a0d",
                          border: "1px solid #ffffff15",
                          color: "#fdfdfb",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: "#fdfdfb80" }}>
                        Correo Electrónico *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className="h-12 rounded-xl text-sm"
                        style={{
                          backgroundColor: "#0d1a0d",
                          border: "1px solid #ffffff15",
                          color: "#fdfdfb",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: "#fdfdfb80" }}>
                        Teléfono
                      </label>
                      <Input
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+593 98 765 4321"
                        className="h-12 rounded-xl text-sm"
                        style={{
                          backgroundColor: "#0d1a0d",
                          border: "1px solid #ffffff15",
                          color: "#fdfdfb",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: "#fdfdfb80" }}>
                        Asunto *
                      </label>
                      <Input
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        placeholder="¿En qué te podemos ayudar?"
                        required
                        className="h-12 rounded-xl text-sm"
                        style={{
                          backgroundColor: "#0d1a0d",
                          border: "1px solid #ffffff15",
                          color: "#fdfdfb",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-2"
                      style={{ color: "#fdfdfb80" }}>
                      Mensaje *
                    </label>
                    <Textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu proyecto..."
                      required
                      rows={6}
                      className="rounded-xl text-sm resize-none"
                      style={{
                        backgroundColor: "#0d1a0d",
                        border: "1px solid #ffffff15",
                        color: "#fdfdfb",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 mt-2"
                    style={{
                      backgroundColor: "#4e753e",
                      color: "#fdfdfb",
                      boxShadow: "0 8px 30px #4e753e50",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#5e8a4e";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px #4e753e70";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#4e753e";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px #4e753e50";
                    }}
                  >
                    Enviar Mensaje
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contacto;
