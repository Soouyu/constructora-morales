import { useEffect, useState } from "react";
import logoImg from "@/assets/logo-Constructora.png";

type Phase = 'scan' | 'lock' | 'reveal' | 'glow' | 'exit';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('scan');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase('lock'),   700),
      setTimeout(() => setPhase('reveal'), 1200),
      setTimeout(() => setPhase('glow'),   1900),
      setTimeout(() => setPhase('exit'),   2600),
    ];
    const done = setTimeout(onDone, 3100);

    const dur = 2400;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setProgress(Math.floor((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => { [...t, done].forEach(clearTimeout); };
  }, [onDone]);

  const isExiting  = phase === 'exit';
  const isRevealed = phase === 'reveal' || phase === 'glow' || phase === 'exit';
  const isGlowing  = phase === 'glow';
  const isLocking  = phase === 'lock';
  const isScanning = phase === 'scan';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#080e07',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '28px',
      opacity: isExiting ? 0 : 1,
      transition: isExiting ? 'opacity 0.55s ease' : 'none',
      pointerEvents: isExiting ? 'none' : 'all',
    }}>
      <style>{`
        .ld-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(74,124,63,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,124,63,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .ld-bg-vig {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 20%, #080e07 85%);
        }

        /* ── Scan line ── */
        @keyframes scanMove {
          0%   { top: 10%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        .ld-scan-line {
          position: absolute; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(126,201,110,0.1) 10%,
            rgba(126,201,110,0.9) 50%,
            rgba(126,201,110,0.1) 90%, transparent 100%
          );
          box-shadow: 0 0 12px rgba(126,201,110,0.4);
          animation: scanMove 0.7s linear forwards;
        }
        .ld-scan-glow {
          position: absolute; left: 0; right: 0; height: 60px;
          background: linear-gradient(to bottom, rgba(126,201,110,0.05) 0%, transparent 100%);
          pointer-events: none;
          animation: scanMove 0.7s linear forwards;
        }

        /* ── Corner brackets ── */
        @keyframes bracketIn {
          from { opacity: 0; transform: scale(1.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes bracketContract {
          to { transform: scale(0.75); }
        }
        .ld-bracket {
          position: absolute; width: 26px; height: 26px;
          opacity: 0;
          animation: bracketIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .ld-bracket.contracting {
          animation: bracketContract 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
          opacity: 1;
        }
        .ld-bracket-tl { top:0; left:0;     border-top:1.5px solid #7ec96e; border-left:1.5px solid #7ec96e;   animation-delay:0ms;   }
        .ld-bracket-tr { top:0; right:0;    border-top:1.5px solid #7ec96e; border-right:1.5px solid #7ec96e;  animation-delay:40ms;  }
        .ld-bracket-bl { bottom:0; left:0;  border-bottom:1.5px solid #7ec96e; border-left:1.5px solid #7ec96e;  animation-delay:80ms;  }
        .ld-bracket-br { bottom:0; right:0; border-bottom:1.5px solid #7ec96e; border-right:1.5px solid #7ec96e; animation-delay:120ms; }

        /* ── Lock-on dots ── */
        @keyframes dotPop {
          from { transform: scale(0) translate(var(--dx), var(--dy)); opacity: 0; }
          to   { transform: scale(1) translate(0, 0); opacity: 1; }
        }
        .ld-crossdot {
          position: absolute; width: 4px; height: 4px; border-radius: 50%;
          background: #7ec96e; box-shadow: 0 0 6px rgba(126,201,110,0.8);
          animation: dotPop 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes centerPulse {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50%     { transform: scale(1.8); opacity: 1; }
        }
        .ld-center-dot {
          position: absolute; width: 5px; height: 5px; border-radius: 50%;
          background: #7ec96e; box-shadow: 0 0 8px rgba(126,201,110,0.9);
          animation: centerPulse 0.35s ease-in-out infinite;
        }

        /* ── Logo reveal ── */
        @keyframes logoPunch {
          0%   { opacity:0; transform:scale(0.55); filter:brightness(0) blur(14px); }
          35%  { opacity:1; transform:scale(1.12); filter:brightness(3.5) blur(0px); }
          60%  { transform:scale(0.96); filter:brightness(1.3); }
          80%  { transform:scale(1.03); filter:brightness(1.1); }
          100% { transform:scale(1);   filter:brightness(1); }
        }
        .ld-logo-punch { animation: logoPunch 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes logoGlow {
          0%,100% {
            filter: invert(67%) sepia(55%) saturate(430%) hue-rotate(72deg) brightness(1.08) contrast(90%)
              drop-shadow(0 0 18px rgba(126,201,110,0.9)) drop-shadow(0 0 36px rgba(126,201,110,0.4));
          }
          50% {
            filter: invert(67%) sepia(55%) saturate(430%) hue-rotate(72deg) brightness(1.3) contrast(90%)
              drop-shadow(0 0 50px rgba(126,201,110,1)) drop-shadow(0 0 100px rgba(126,201,110,0.5)) drop-shadow(0 0 8px #fff);
          }
        }
        .ld-logo-glow { animation: logoGlow 0.8s ease-in-out infinite; }

        .ld-logo-green {
          filter: invert(67%) sepia(55%) saturate(430%) hue-rotate(72deg) brightness(1.08) contrast(90%)
            drop-shadow(0 0 20px rgba(126,201,110,0.8));
        }

        /* ── Rings ── */
        @keyframes ringOut {
          0%   { transform: scale(0.4); opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .ld-ring  { position:absolute; border-radius:50%; border:1px solid rgba(126,201,110,0.5); pointer-events:none; animation: ringOut 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .ld-ring2 { border-color: rgba(126,201,110,0.3); animation: ringOut 0.7s 0.12s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* ── Sparks ── */
        @keyframes sp1 { to { transform:translate(-54px,-62px) scale(0); opacity:0; } }
        @keyframes sp2 { to { transform:translate( 60px,-55px) scale(0); opacity:0; } }
        @keyframes sp3 { to { transform:translate(-28px, 68px) scale(0); opacity:0; } }
        @keyframes sp4 { to { transform:translate( 62px, 52px) scale(0); opacity:0; } }
        @keyframes sp5 { to { transform:translate(-72px, 12px) scale(0); opacity:0; } }
        @keyframes sp6 { to { transform:translate( 70px,-18px) scale(0); opacity:0; } }
        .ld-sp { position:absolute; border-radius:50%; background:#7ec96e; transform:translate(-50%,-50%); box-shadow:0 0 6px rgba(126,201,110,0.9); opacity:1; }
        .ld-sp1 { width:5px;height:5px; animation:sp1 0.6s 0.05s ease-out forwards; }
        .ld-sp2 { width:4px;height:4px; animation:sp2 0.6s 0.10s ease-out forwards; }
        .ld-sp3 { width:6px;height:6px; animation:sp3 0.6s 0.07s ease-out forwards; }
        .ld-sp4 { width:4px;height:4px; animation:sp4 0.6s 0.13s ease-out forwards; }
        .ld-sp5 { width:3px;height:3px; animation:sp5 0.6s 0.08s ease-out forwards; }
        .ld-sp6 { width:5px;height:5px; animation:sp6 0.6s 0.06s ease-out forwards; }

        /* ── Data readout ── */
        @keyframes flicker { 0%,100%{opacity:0.35;} 50%{opacity:0.65;} }
        .ld-data {
          font-size:9px; font-weight:700; letter-spacing:0.14em;
          color:rgba(126,201,110,0.4); font-family:'Courier New',monospace;
          animation: flicker 0.7s ease-in-out infinite;
        }

        /* ── Label ── */
        @keyframes labelIn {
          from { opacity:0; letter-spacing:0.55em; transform:translateY(5px); }
          to   { opacity:1; letter-spacing:0.3em;  transform:translateY(0); }
        }
        .ld-label {
          font-size:10px; font-weight:900; letter-spacing:0.3em;
          text-transform:uppercase; color:rgba(126,201,110,0.6);
          animation: labelIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        /* ── Progress bar ── */
        .ld-bar-track { width:140px; height:1.5px; background:rgba(74,124,63,0.12); overflow:hidden; border-radius:1px; }
        .ld-bar-fill  { height:100%; background:linear-gradient(90deg,#4a7c3f,#7ec96e); box-shadow:0 0 8px rgba(126,201,110,0.5); border-radius:1px; transition:width 0.05s linear; }
      `}</style>

      <div className="ld-bg-grid" />
      <div className="ld-bg-vig" />

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'24px' }}>

        {/* ── Main box ── */}
        <div style={{ position:'relative', width:'190px', height:'190px', display:'flex', alignItems:'center', justifyContent:'center' }}>

          {/* Scan line */}
          {isScanning && (
            <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
              <div className="ld-scan-line" />
              <div className="ld-scan-glow" />
            </div>
          )}

          {/* Brackets */}
          {(isLocking || isRevealed) && (
            <>
              <div className={`ld-bracket ld-bracket-tl ${isRevealed ? 'contracting' : ''}`} />
              <div className={`ld-bracket ld-bracket-tr ${isRevealed ? 'contracting' : ''}`} />
              <div className={`ld-bracket ld-bracket-bl ${isRevealed ? 'contracting' : ''}`} />
              <div className={`ld-bracket ld-bracket-br ${isRevealed ? 'contracting' : ''}`} />
            </>
          )}

          {/* Lock-on */}
          {isLocking && (
            <>
              <div className="ld-center-dot" />
              {([
                { dx:'-14px', dy:'-14px', mt:'-26px', ml:'-26px' },
                { dx:'14px',  dy:'-14px', mt:'-26px', ml:'22px'  },
                { dx:'-14px', dy:'14px',  mt:'22px',  ml:'-26px' },
                { dx:'14px',  dy:'14px',  mt:'22px',  ml:'22px'  },
              ] as const).map((d, i) => (
                <div key={i} className="ld-crossdot" style={{
                  top:'50%', left:'50%',
                  marginTop:d.mt, marginLeft:d.ml,
                  ['--dx' as string]: d.dx,
                  ['--dy' as string]: d.dy,
                  animationDelay:`${i * 40}ms`,
                }} />
              ))}
            </>
          )}

          {/* Logo */}
          {isRevealed && (
            <>
              {phase === 'reveal' && (
                <>
                  <div className="ld-ring"  style={{ width:'155px', height:'155px' }} />
                  <div className="ld-ring ld-ring2" style={{ width:'115px', height:'115px' }} />
                  <div style={{ position:'absolute', top:'50%', left:'50%', pointerEvents:'none' }}>
                    {[1,2,3,4,5,6].map(n => <div key={n} className={`ld-sp ld-sp${n}`} />)}
                  </div>
                </>
              )}
              <img
                src={logoImg}
                alt="Constructora Morales"
                className={[
                  phase === 'reveal' ? 'ld-logo-punch ld-logo-green' : '',
                  isGlowing          ? 'ld-logo-glow'                : '',
                  phase === 'exit'   ? 'ld-logo-green'              : '',
                ].join(' ')}
                style={{ width:'130px', height:'130px', objectFit:'contain', position:'relative', zIndex:1 }}
              />
            </>
          )}

          {/* Data readout */}
          {(isScanning || isLocking) && (
            <div style={{ position:'absolute', bottom:'-28px', left:0, right:0, display:'flex', justifyContent:'space-between', padding:'0 4px' }}>
              <span className="ld-data">{isScanning ? 'PREPARANDO PLANOS' : 'VERIFICANDO ESTRUCTURA'}</span>
              <span className="ld-data">{progress}%</span>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', marginTop:'6px' }}>
          {isRevealed
            ? <div className="ld-label">Constructora Morales</div>
            : <div style={{ height:'14px' }} />
          }
          <div className="ld-bar-track">
            <div className="ld-bar-fill" style={{ width:`${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
