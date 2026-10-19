import React from 'react';

export default function CardThumbnail({ type = 'signals', icon = '⚡', level = 'Beginner', badgeColor = 'sky' }) {
  const isAmber = badgeColor === 'amber';

  // Distinct soft pastel backgrounds per topic
  const getPastelBg = () => {
    switch (type) {
      case 'signals': return { bg: '#FFFBEB', glow: '#FDE68A' };
      case 'ip-types': return { bg: '#F0F9FF', glow: '#BAE6FD' };
      case 'ethernet': return { bg: '#F5F3FF', glow: '#DDD6FE' };
      case 'mac': return { bg: '#FFF7ED', glow: '#FED7AA' };
      case 'broadcast': return { bg: '#FFF1F2', glow: '#FECDD3' };
      case 'wifi': return { bg: '#ECFDF5', glow: '#A7F3D0' };
      case 'dhcp': return { bg: '#EEF2FF', glow: '#C7D2FE' };
      case 'http': return { bg: '#F0FDFA', glow: '#99F6E4' };
      case 'dns': return { bg: '#FAF5FF', glow: '#E9D5FF' };
      case 'ping': return { bg: '#F0FDF4', glow: '#BBF7D0' };
      case 'vlan': return { bg: '#F8FAFC', glow: '#E2E8F0' };
      default: return { bg: '#F8FAFC', glow: '#E2E8F0' };
    }
  };

  const { bg, glow } = getPastelBg();

  return (
    <div className="relative h-28 overflow-hidden" style={{ backgroundColor: bg }}>
      <svg 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        viewBox="0 0 320 120" 
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`card-glow-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="320" height="120" fill={bg} />
        <circle cx="160" cy="60" r="90" fill={`url(#card-glow-${type})`} />

        {/* 1. Physical Signals */}
        {type === 'signals' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="140" y2="40" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="140" y1="40" x2="240" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="90" cy="40" r="4.5" fill="#F59E0B" />
            <circle cx="40" cy="40" r="18" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="13">💻</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">📟</text>
            <circle cx="240" cy="40" r="18" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            <text x="240" y="44" textAnchor="middle" fontSize="13">🖥️</text>
          </g>
        )}

        {/* 2. IP Types */}
        {type === 'ip-types' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="140" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="140" y1="40" x2="240" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="75" y="33" width="32" height="14" rx="4" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1" />
            <text x="91" y="43" textAnchor="middle" fontSize="7" fill="#0369A1" fontWeight="bold">192.168</text>
            <rect x="175" y="33" width="30" height="14" rx="4" fill="#DCFCE7" stroke="#BBF7D0" strokeWidth="1" />
            <text x="190" y="43" textAnchor="middle" fontSize="7" fill="#15803D" fontWeight="bold">PUBLIC</text>
            <circle cx="40" cy="40" r="18" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="13">💻</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">📡</text>
            <circle cx="240" cy="40" r="18" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="240" y="44" textAnchor="middle" fontSize="13">🌐</text>
          </g>
        )}

        {/* 3. Ethernet Frames */}
        {type === 'ethernet' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="140" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="140" y1="40" x2="240" y2="40" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="75" y="33" width="26" height="14" rx="4" fill="#EDE9FE" stroke="#DDD6FE" strokeWidth="1" />
            <text x="88" y="43" textAnchor="middle" fontSize="7.5" fill="#6D28D9" fontWeight="bold">L2</text>
            <circle cx="40" cy="40" r="18" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="13">💻</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">🔀</text>
            <circle cx="240" cy="40" r="18" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
            <text x="240" y="44" textAnchor="middle" fontSize="13">💻</text>
          </g>
        )}

        {/* 4. MAC Addresses & ARP */}
        {type === 'mac' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="140" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="140" y1="40" x2="240" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="75" y="33" width="30" height="14" rx="4" fill="#FFEDD5" stroke="#FED7AA" strokeWidth="1" />
            <text x="90" y="43" textAnchor="middle" fontSize="7.5" fill="#C2410C" fontWeight="bold">ARP ?</text>
            <circle cx="40" cy="40" r="18" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="13">💻</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">🔀</text>
            <circle cx="240" cy="40" r="18" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="240" y="44" textAnchor="middle" fontSize="13">💻</text>
          </g>
        )}

        {/* 5. Broadcast Domain */}
        {type === 'broadcast' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="120" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="120" y1="40" x2="220" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="120" y1="40" x2="220" y2="40" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="120" y1="40" x2="220" y2="60" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="160" cy="27" r="3.5" fill="#F43F5E" />
            <circle cx="160" cy="40" r="3.5" fill="#F43F5E" />
            <circle cx="160" cy="53" r="3.5" fill="#F43F5E" />
            <circle cx="40" cy="40" r="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="12">💻</text>
            <circle cx="120" cy="40" r="16" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
            <text x="120" y="44" textAnchor="middle" fontSize="12">🔀</text>
            <circle cx="220" cy="20" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="220" cy="40" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="220" cy="60" r="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
          </g>
        )}

        {/* 6. WiFi Basics */}
        {type === 'wifi' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="140" y2="40" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="140" y1="40" x2="240" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M 80 32 A 12 12 0 0 1 100 32" stroke="#10B981" strokeWidth="2" fill="none" />
            <path d="M 85 36 A 6 6 0 0 1 95 36" stroke="#10B981" strokeWidth="2" fill="none" />
            <circle cx="40" cy="40" r="18" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="13">💻</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">📶</text>
            <circle cx="240" cy="40" r="18" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
            <text x="240" y="44" textAnchor="middle" fontSize="13">📡</text>
          </g>
        )}

        {/* 7. DHCP */}
        {type === 'dhcp' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="40" x2="140" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="140" y1="40" x2="240" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="75" y="33" width="30" height="14" rx="4" fill="#E0E7FF" stroke="#C7D2FE" strokeWidth="1" />
            <text x="90" y="43" textAnchor="middle" fontSize="7.5" fill="#4338CA" fontWeight="bold">DORA</text>
            <circle cx="40" cy="40" r="18" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="13">💻</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">📡</text>
            <circle cx="240" cy="40" r="18" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
            <text x="240" y="44" textAnchor="middle" fontSize="13">🪪</text>
          </g>
        )}

        {/* 8. HTTP Web Request */}
        {type === 'http' && (
          <g transform="translate(20, 20)">
            <line x1="30" y1="40" x2="105" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="105" y1="40" x2="175" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="175" y1="40" x2="250" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="60" y="33" width="24" height="14" rx="4" fill="#CCFBF1" stroke="#99F6E4" strokeWidth="1" />
            <text x="72" y="43" textAnchor="middle" fontSize="7.5" fill="#0F766E" fontWeight="bold">GET</text>
            <circle cx="30" cy="40" r="16" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
            <text x="30" y="44" textAnchor="middle" fontSize="11">💻</text>
            <circle cx="105" cy="40" r="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="105" y="44" textAnchor="middle" fontSize="11">📡</text>
            <circle cx="175" cy="40" r="16" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
            <text x="175" y="44" textAnchor="middle" fontSize="11">🌐</text>
            <circle cx="250" cy="40" r="16" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
            <text x="250" y="44" textAnchor="middle" fontSize="11">🖥️</text>
          </g>
        )}

        {/* 9. DNS Resolution */}
        {type === 'dns' && (
          <g transform="translate(20, 20)">
            <line x1="30" y1="45" x2="100" y2="35" stroke="#CBD5E1" strokeWidth="1.8" />
            <line x1="100" y1="35" x2="170" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="100" y1="35" x2="220" y2="40" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="100" y1="35" x2="170" y2="60" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="30" cy="45" r="15" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="30" y="49" textAnchor="middle" fontSize="11">💻</text>
            <circle cx="100" cy="35" r="16" fill="#FFFFFF" stroke="#9333EA" strokeWidth="2" />
            <text x="100" y="39" textAnchor="middle" fontSize="11">📖</text>
            <circle cx="170" cy="20" r="12" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5" />
            <text x="170" y="24" textAnchor="middle" fontSize="9" fill="#4338CA">.</text>
            <circle cx="220" cy="40" r="12" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5" />
            <text x="220" y="43" textAnchor="middle" fontSize="7" fill="#4338CA">com</text>
            <circle cx="170" cy="60" r="12" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5" />
            <text x="170" y="63" textAnchor="middle" fontSize="7" fill="#4338CA">ns</text>
          </g>
        )}

        {/* 10. Ping & ICMP */}
        {type === 'ping' && (
          <g transform="translate(20, 20)">
            <line x1="30" y1="40" x2="90" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="90" y1="40" x2="150" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="150" y1="40" x2="210" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="210" y1="40" x2="260" y2="40" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="120" cy="40" r="4" fill="#10B981" />
            <circle cx="40" cy="40" r="15" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fontSize="11">💻</text>
            <circle cx="100" cy="40" r="13" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <text x="100" y="43" textAnchor="middle" fontSize="9">📡</text>
            <circle cx="160" cy="40" r="13" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <text x="160" y="43" textAnchor="middle" fontSize="9">📡</text>
            <circle cx="230" cy="40" r="15" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="230" y="44" textAnchor="middle" fontSize="11">🖥️</text>
          </g>
        )}

        {/* 11. Switches & VLANs */}
        {type === 'vlan' && (
          <g transform="translate(20, 20)">
            <line x1="40" y1="25" x2="140" y2="40" stroke="#38BDF8" strokeWidth="2" />
            <line x1="40" y1="55" x2="140" y2="40" stroke="#A855F7" strokeWidth="2" />
            <line x1="140" y1="40" x2="240" y2="25" stroke="#38BDF8" strokeWidth="2" />
            <line x1="140" y1="40" x2="240" y2="55" stroke="#A855F7" strokeWidth="2" />
            <circle cx="40" cy="25" r="13" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
            <text x="40" y="28" textAnchor="middle" fontSize="9" fill="#0284C7" fontWeight="bold">10</text>
            <circle cx="40" cy="55" r="13" fill="#FFFFFF" stroke="#9333EA" strokeWidth="1.8" />
            <text x="40" y="58" textAnchor="middle" fontSize="9" fill="#9333EA" fontWeight="bold">20</text>
            <circle cx="140" cy="40" r="18" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
            <text x="140" y="44" textAnchor="middle" fontSize="13">🔀</text>
            <circle cx="240" cy="25" r="13" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
            <text x="240" y="28" textAnchor="middle" fontSize="9" fill="#0284C7" fontWeight="bold">10</text>
            <circle cx="240" cy="55" r="13" fill="#FFFFFF" stroke="#9333EA" strokeWidth="1.8" />
            <text x="240" y="58" textAnchor="middle" fontSize="9" fill="#9333EA" fontWeight="bold">20</text>
          </g>
        )}
      </svg>

      {/* Bottom gradient fade into white card body */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />

      {/* Floating emoji icon */}
      <span className="absolute bottom-2 left-3 text-2xl select-none drop-shadow-xs" role="img" aria-label={icon}>
        {icon}
      </span>

      {/* Top right level badge */}
      <div className="absolute top-2.5 right-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/95 border-slate-200 text-slate-700 shadow-xs font-mono">
          {level}
        </span>
      </div>
    </div>
  );
}
