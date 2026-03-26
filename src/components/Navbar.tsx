import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logonavbar from "@/assets/1.png";

const navItems = [
  { name: "Inicio",    path: "/",          anchor: false },
  { name: "Servicios", path: "/#servicios", anchor: true  },
  { name: "Nosotros",  path: "/#nosotros",  anchor: true  },
  { name: "Contacto",  path: "/contacto",  anchor: false },
];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{`
        .nav-link-item {
          position: relative;
          padding: 8px 18px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
          color: rgba(253,253,251,0.75);
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 18px; right: 18px;
          height: 1.5px; background: #7ec96e;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link-item:hover { color: #fdfdfb; }
        .nav-link-item:hover::after,
        .nav-link-item.active::after { transform: scaleX(1); }
        .nav-link-item.active { color: #7ec96e; }

        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          color: #050a04; background: #7ec96e;
          position: relative; overflow: hidden; transition: gap 0.3s ease;
          white-space: nowrap;
        }
        .nav-cta::after {
          content: ''; position: absolute; inset: 0;
          background: #f3f1ea; transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-cta:hover::after { transform: translateX(0); }
        .nav-cta:hover { gap: 14px; }
        .nav-cta > * { position: relative; z-index: 1; }

        /* ── Mobile menu links ── */
        .mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px;
          font-size: 16px; font-weight: 700; letter-spacing: 0.01em;
          color: rgba(253,253,251,0.8);
          border-bottom: 1px solid rgba(126,201,110,0.08);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .mob-link:last-of-type { border-bottom: none; }
        .mob-link:hover, .mob-link.active {
          color: #7ec96e;
          background: rgba(126,201,110,0.05);
          padding-left: 32px;
        }
        .mob-link .mob-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(126,201,110,0.3);
          transition: background 0.2s ease;
          flex-shrink: 0;
        }
        .mob-link:hover .mob-dot,
        .mob-link.active .mob-dot { background: #7ec96e; }

        /* ── Hamburger button ── */
        .ham-btn {
          width: 44px; height: 44px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(126,201,110,0.35);
          background: rgba(5,10,4,0.7);
          color: #7ec96e;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .ham-btn:hover  { background: rgba(126,201,110,0.12); border-color: rgba(126,201,110,0.6); }
        .ham-btn.open   { background: rgba(126,201,110,0.15); border-color: rgba(126,201,110,0.5); }

        /* ── Dropdown animation ── */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mob-menu { animation: slideDown 0.22s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* ── Responsive: ocultar/mostrar elementos ── */
        .nav-desktop-links { display: none; }
        .nav-desktop-cta   { display: none; }
        .nav-ham-btn       { display: flex; }

        @media (min-width: 768px) {
          .nav-desktop-links { display: flex; }
          .nav-desktop-cta   { display: inline-flex; }
          .nav-ham-btn       { display: none; }
          .mob-menu          { display: none; }
        }

        /* ── CTA inside menu ── */
        .mob-cta {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 16px 24px;
          background: #7ec96e; color: #050a04;
          font-size: 12px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; transition: background 0.2s ease;
        }
        .mob-cta:hover { background: #6ab85e; }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9998,
        transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        backgroundColor: scrolled ? 'rgba(5,10,4,0.95)' : 'rgba(5,10,4,0.55)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: scrolled ? '1px solid rgba(126,201,110,0.12)' : '1px solid rgba(126,201,110,0.06)',
        boxShadow: scrolled ? '0 8px 48px rgba(0,0,0,0.5)' : 'none',
      }}>

        {/* ── Main bar ── */}
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 20px',
          height: scrolled ? '64px' : '76px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '12px',
          transition: 'height 0.4s ease',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src={logonavbar}
              alt="Constructora Morales"
              style={{
                height: scrolled ? '32px' : '38px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                transition: 'height 0.4s ease',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.04em', color: '#fdfdfb' }}>
                Constructora
              </span>
              <span style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.04em', color: '#7ec96e' }}>
                Morales
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
            {navItems.map((item) => item.anchor ? (
              <a key={item.path} href={item.path} className="nav-link-item">{item.name}</a>
            ) : (
              <Link key={item.path} to={item.path}
                className={`nav-link-item${location.pathname === item.path ? ' active' : ''}`}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link to="/contacto" className="nav-cta nav-desktop-cta">
            <span>Solicitar Cotización</span>
            <ArrowUpRight style={{ width: '14px', height: '14px' }} />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(v => !v)}
            className={`ham-btn nav-ham-btn${isOpen ? ' open' : ''}`}
            aria-label="Menú"
          >
            {isOpen
              ? <X     style={{ width: '20px', height: '20px' }} />
              : <Menu  style={{ width: '20px', height: '20px' }} />}
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        {isOpen && (
          <div
            className="mob-menu"
            style={{
              background: 'rgba(5,10,4,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(126,201,110,0.1)',
              borderBottom: '1px solid rgba(126,201,110,0.1)',
            }}
          >
            {/* Links */}
            <div>
              {navItems.map((item) => item.anchor ? (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="mob-link"
                >
                  <span>{item.name}</span>
                  <div className="mob-dot" />
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`mob-link${location.pathname === item.path ? ' active' : ''}`}
                >
                  <span>{item.name}</span>
                  <div className="mob-dot" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(126,201,110,0.1)' }}>
              <Link to="/contacto" onClick={() => setIsOpen(false)} className="mob-cta">
                <span>Solicitar Cotización</span>
                <ArrowUpRight style={{ width: '15px', height: '15px' }} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
