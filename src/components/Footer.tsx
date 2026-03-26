import { Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#060f06", borderTop: "1px solid #ffffff0a" }}>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand — wider column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "#4e753e", boxShadow: "0 0 20px #4e753e60" }}>
                <Building2 className="w-5 h-5" style={{ color: "#fdfdfb" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black" style={{ color: "#fdfdfb" }}>Morales</span>
                <span className="text-base font-black" style={{ color: "#7ec96e" }}>Constructora</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#fdfdfb50" }}>
              Más de 25 años construyendo sueños. Especialistas en proyectos
              residenciales, comerciales e industriales con los más altos
              estándares de calidad.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/constructoramoralesec" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/morales_constructora/" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#ffffff08", border: "1px solid #ffffff10" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#4e753e";
                    (e.currentTarget as HTMLElement).style.border = "1px solid #4e753e";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px #4e753e50";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff08";
                    (e.currentTarget as HTMLElement).style.border = "1px solid #ffffff10";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#fdfdfb80" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#fdfdfb40" }}>
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", path: "/" },
                { label: "Nosotros", path: "/nosotros" },
                { label: "Servicios", path: "/servicios" },
                { label: "Contacto", path: "/contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path}
                    className="group flex items-center gap-1.5 text-sm transition-colors duration-200"
                    style={{ color: "#fdfdfb50" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#7ec96e"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fdfdfb50"; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#fdfdfb40" }}>
              Servicios
            </h4>
            <ul className="space-y-3">
              {[
                "Construcción Residencial",
                "Construcción Comercial",
                "Construcción Industrial",
                "Remodelaciones",
                "Diseño Arquitectónico",
              ].map((item) => (
                <li key={item}>
                  <Link to="/servicios"
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ color: "#fdfdfb50" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#7ec96e"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fdfdfb50"; }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#fdfdfb40" }}>
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#7ec96e" }} />
                <span className="text-sm leading-relaxed" style={{ color: "#fdfdfb50" }}>
                  Av. Principal 1234,<br />Quito, Ecuador
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#7ec96e" }} />
                <span className="text-sm" style={{ color: "#fdfdfb50" }}>0995833779</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#7ec96e" }} />
                <span className="text-sm" style={{ color: "#fdfdfb50" }}>constructora-morales@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ borderTop: "1px solid #ffffff08" }}>
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "#fdfdfb30" }}>
            © {currentYear} Morales Constructora. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="javascript:void(0)" className="text-xs transition-colors duration-200"
              style={{ color: "#fdfdfb30" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fdfdfb80"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fdfdfb30"; }}
            >
              Política de Privacidad
            </a>
            <a href="javascript:void(0)" className="text-xs transition-colors duration-200"
              style={{ color: "#fdfdfb30" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fdfdfb80"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fdfdfb30"; }}
            >
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
