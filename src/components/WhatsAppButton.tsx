const WHATSAPP_NUMBER = "593995833779"; // Número Ecuador sin + ni espacios
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola Constructora Morales, me contacto dese la pagina web y me gustaría obtener más información sobre sus servicios y solicitar una cotización."
);

const WhatsAppButton = () => (
  <>
    <style>{`
      @keyframes wa-ping {
        0%   { transform: scale(1); opacity: 0.7; }
        70%  { transform: scale(1.9); opacity: 0; }
        100% { transform: scale(1.9); opacity: 0; }
      }
      .wa-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 9990;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: #25d366;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 24px rgba(37,211,102,0.45);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        text-decoration: none;
      }
      .wa-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 36px rgba(37,211,102,0.6);
      }
      .wa-ping {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: #25d366;
        animation: wa-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      .wa-tooltip {
        position: absolute;
        right: 68px;
        top: 50%;
        transform: translateY(-50%);
        background: #111f11;
        color: #fdfdfb;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        padding: 7px 14px;
        border-radius: 8px;
        border: 1px solid rgba(37,211,102,0.2);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }
      .wa-tooltip::after {
        content: '';
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        border: 6px solid transparent;
        border-right: none;
        border-left-color: #111f11;
      }
      .wa-btn:hover .wa-tooltip { opacity: 1; }
    `}</style>

    <a
      className="wa-btn"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <span className="wa-ping" />
      <span className="wa-tooltip">¡Escríbenos!</span>

      {/* WhatsApp SVG oficial */}
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.418.633 4.755 1.836 6.807L2 30l7.387-1.808A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="#fff"
        />
        <path
          d="M22.504 19.652c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.688.153-.204.306-.79.995-.968 1.2-.178.204-.357.23-.663.076-.306-.153-1.293-.476-2.463-1.519-.91-.811-1.524-1.813-1.703-2.119-.178-.306-.019-.47.134-.622.137-.136.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.051-.382-.025-.535-.077-.153-.688-1.659-.942-2.272-.248-.597-.5-.516-.688-.526l-.586-.01c-.204 0-.535.077-.816.382-.28.306-1.07 1.046-1.07 2.55 0 1.505 1.096 2.958 1.249 3.162.153.204 2.157 3.293 5.228 4.619.731.315 1.302.503 1.747.644.734.233 1.403.2 1.931.121.589-.088 1.81-.74 2.065-1.455.255-.714.255-1.326.178-1.455-.076-.128-.28-.204-.586-.357z"
          fill="#25d366"
        />
      </svg>
    </a>
  </>
);

export default WhatsAppButton;
