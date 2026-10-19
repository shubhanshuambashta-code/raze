import React, { useState } from 'react';

export default function CanvasTopology({
  scenario,
  currentStep,
  inspectedPacketId,
  onInspectPacket,
  animationProgress = 0.5,
  isPaused = false
}) {
  const [interactiveChar, setInteractiveChar] = useState('H');

  const nodes = scenario.nodes || [];
  const edges = scenario.edges || [];
  const stepHighlights = currentStep?.highlights || {};
  const activeNodeIds = stepHighlights.nodeIds || [];
  const activeEdgeIds = stepHighlights.edgeIds || [];
  const activeAnimations = currentStep?.packetAnimations || [];

  // Helper to find node by id
  const getNode = (id) => nodes.find((n) => n.id === id);

  // Helper for node icons
  const getNodeIcon = (node) => {
    if (node.icon) return node.icon;
    switch (node.type) {
      case 'pc': return '💻';
      case 'laptop': return '💻';
      case 'router': return '📡';
      case 'switch': return '🔀';
      case 'server': return '🖥️';
      case 'internet': return '🌐';
      case 'dns-server': return '📖';
      case 'dhcp-server': return '🪪';
      case 'access-point': return '📶';
      case 'modem': return '📟';
      default: return '🖥️';
    }
  };

  // Helper to compute ASCII binary for physical layer
  const charCode = interactiveChar ? interactiveChar.charCodeAt(0) : 72;
  const binaryString = charCode.toString(2).padStart(8, '0');

  // Smooth easeInOutQuad easing for butter-smooth acceleration and deceleration
  const easeProgress = (t) => {
    const c = Math.max(0, Math.min(1, t));
    return c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c;
  };

  const isPhysical = scenario.slug === 'physical-signals';
  const isEthernet = scenario.slug === 'ethernet-frames';
  const isCorruptStep = currentStep?.id === 'corrupt';

  // Compute animated packets in motion across 2D coordinates
  const renderedPackets = [];
  if (activeAnimations.length > 0) {
    const maxDelay = Math.max(...activeAnimations.map((a) => a.delayMs || 0), 0);
    const animTravelMs = 1000;
    const totalCycleMs = Math.max(maxDelay + animTravelMs + 400, 2200);
    const currentTimeMs = (animationProgress * totalCycleMs) % totalCycleMs;

    activeAnimations.forEach((anim, idx) => {
      const edge = edges.find((e) => e.id === anim.edgeId);
      if (!edge) return;
      const baseFrom = getNode(edge.from);
      const baseTo = getNode(edge.to);
      if (!baseFrom || !baseTo) return;

      const isReverse = anim.direction === 'reverse';
      const startNode = isReverse ? baseTo : baseFrom;
      const targetNode = isReverse ? baseFrom : baseTo;

      const dx = targetNode.x - startNode.x;
      const dy = targetNode.y - startNode.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;

      // Start and end precisely at node circle perimeter
      const margin = 36;
      const startX = startNode.x + ux * margin;
      const startY = startNode.y + uy * margin;
      const endX = targetNode.x - ux * margin;
      const endY = targetNode.y - uy * margin;

      const startMs = anim.delayMs || 0;
      const endMs = startMs + animTravelMs;

      let packetT = 0;
      let opacity = 1;
      let visible = false;

      if (maxDelay === 0 && activeAnimations.length === 1) {
        packetT = easeProgress(animationProgress);
        opacity = 1;
        visible = true;
      } else {
        if (currentTimeMs >= startMs && currentTimeMs <= endMs + 200) {
          const rawT = Math.min(1, Math.max(0, (currentTimeMs - startMs) / animTravelMs));
          packetT = easeProgress(rawT);
          opacity = currentTimeMs > endMs ? Math.max(0, 1 - (currentTimeMs - endMs) / 200) : 1;
          visible = true;
        }
      }

      if (visible) {
        const px = startX + (endX - startX) * packetT;
        const py = startY + (endY - startY) * packetT;
        const packetObj = scenario.packets.find((p) => p.id === anim.packetId) || scenario.packets[0];

        renderedPackets.push({
          key: `${anim.packetId}-${anim.edgeId}-${idx}`,
          x: px,
          y: py,
          opacity,
          packet: packetObj,
          packetId: anim.packetId
        });
      }
    });
  }

  return (
    <div className="w-full relative flex flex-col items-center justify-center min-h-0 select-none">
      <div className="w-full max-w-3xl" style={{ aspectRatio: '8/5' }}>
        <svg 
          viewBox="0 0 800 500" 
          width="100%" 
          height="100%"
          className="overflow-visible"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#64748b" floodOpacity="0.2" />
            </filter>

            {/* Pastel linear gradients for physical signals */}
            <linearGradient id="fiber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#C084FC" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="copper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Background subtle grid points */}
          <g opacity="0.6">
            {[100, 250, 400, 550, 700].map(x => 
              [120, 220, 320, 420].map(y => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="#CBD5E1" />
              ))
            )}
          </g>

          {/* Edges with exact 2D vector boundaries */}
          {edges.map((edge) => {
            const fromNode = getNode(edge.from);
            const toNode = getNode(edge.to);
            if (!fromNode || !toNode) return null;

            const isEdgeActive = activeEdgeIds.includes(edge.id) || activeAnimations.some(a => a.edgeId === edge.id);
            const isPcModem = edge.id === 'pc-modem';
            const isFiberStep = currentStep?.id === 'fiber-signal';
            const isRadioStep = currentStep?.id === 'radio-signal';
            const isCopperStep = currentStep?.id === 'copper-signal';

            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;
            const r = 32;

            const x1 = fromNode.x + ux * r;
            const y1 = fromNode.y + uy * r;
            const x2 = toNode.x - ux * r;
            const y2 = toNode.y - uy * r;

            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={edge.id}>
                {/* Underglow if active */}
                {isEdgeActive && (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      isCorruptStep ? '#EF4444' :
                      isFiberStep ? '#A855F7' :
                      isRadioStep ? '#10B981' :
                      isCopperStep ? '#F59E0B' : '#6366F1'
                    }
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.25"
                    filter="url(#glow)"
                  />
                )}

                {/* Base Wire */}
                <line
                  id={`edge-${edge.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isEdgeActive ? (isCorruptStep ? '#EF4444' : '#6366F1') : '#CBD5E1'}
                  strokeWidth={isEdgeActive ? "2.5" : "1.8"}
                  strokeLinecap="round"
                  strokeDasharray={isRadioStep && isPcModem ? "6 6" : "none"}
                />

                {/* Waveform / Physical Signal Representation on the wire */}
                {isPhysical && isCopperStep && isPcModem && (
                  <g transform={`translate(${fromNode.x + 35}, ${fromNode.y - 14})`}>
                    <path
                      d="M 0 0 H 20 V -10 H 45 V 10 H 70 V -10 H 95 V 10 H 120 V -10 H 145 V 10 H 170 V -10 H 195 V 0"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="2.2"
                      opacity="0.95"
                    />
                    <text x="100" y="-18" textAnchor="middle" fontSize="9" fill="#D97706" fontWeight="bold" fontFamily="monospace">
                      High (+2.5V) / Low (0V)
                    </text>
                  </g>
                )}

                {isPhysical && isFiberStep && isPcModem && (
                  <g transform={`translate(${fromNode.x + 35}, ${fromNode.y - 12})`}>
                    <line x1="0" y1="12" x2="200" y2="12" stroke="url(#fiber-grad)" strokeWidth="4" opacity="0.95" />
                    <circle cx="50" cy="12" r="5" fill="#C084FC" />
                    <circle cx="120" cy="12" r="6" fill="#818CF8" />
                    <circle cx="170" cy="12" r="4" fill="#38BDF8" />
                    <text x="100" y="-14" textAnchor="middle" fontSize="9" fill="#7C3AED" fontWeight="bold" fontFamily="monospace">
                      Infrared Laser Pulses (~1550nm)
                    </text>
                  </g>
                )}

                {isPhysical && isRadioStep && isPcModem && (
                  <g transform={`translate(${fromNode.x + 40}, ${fromNode.y})`}>
                    <path
                      d="M 0 0 Q 25 -20 50 0 T 100 0 T 150 0 T 200 0"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.2"
                      opacity="0.95"
                    />
                    <text x="100" y="-22" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="bold" fontFamily="monospace">
                      WiFi Radio Carrier (2.4GHz / 5GHz)
                    </text>
                  </g>
                )}

                {/* Edge Label */}
                {edge.label && !isCopperStep && !isFiberStep && !isRadioStep && (
                  <g transform={`translate(${midX}, ${midY - 10})`}>
                    <rect x="-42" y="-9" width="84" height="18" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                    <text
                      x="0"
                      y="2"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="8"
                      fill="#475569"
                      fontFamily="ui-monospace, monospace"
                      className="select-none tracking-wider uppercase font-bold"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Animated Packets In Motion across 2D plane */}
          {renderedPackets.map((pkt) => {
            const isCorrupt = isCorruptStep && pkt.packetId === 'corrupted';
            const packetColor = isCorrupt ? '#EF4444' : (pkt.packet.color || '#6366F1');

            return (
              <g
                key={pkt.key}
                transform={`translate(${pkt.x}, ${pkt.y})`}
                opacity={pkt.opacity}
                className="cursor-pointer"
                onClick={() => onInspectPacket && onInspectPacket(pkt.packetId)}
                filter="url(#packet-glow)"
              >
                {/* Soft pastel halo */}
                <circle r="18" fill={packetColor} opacity="0.15" />
                
                {/* Packet Badge Capsule */}
                <rect
                  x="-26"
                  y="-12"
                  width="52"
                  height="24"
                  rx="12"
                  fill="#FFFFFF"
                  stroke={packetColor}
                  strokeWidth="2.2"
                />
                
                <text
                  x="0"
                  y="1"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontWeight="bold"
                  fill={isCorrupt ? '#EF4444' : '#0F172A'}
                  fontFamily="ui-monospace, monospace"
                >
                  {isCorrupt ? 'ERR!' : (pkt.packet.badge || pkt.packet.protocol || 'DATA')}
                </text>

                {/* Sub-label floating tooltip */}
                <g transform="translate(0, -20)">
                  <rect x="-35" y="-13" width="70" height="15" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                  <text x="0" y="-3" textAnchor="middle" fontSize="8" fill="#334155" fontWeight="600" fontFamily="sans-serif">
                    {pkt.packet.label}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isHighlighted = activeNodeIds.includes(node.id);
            const icon = getNodeIcon(node);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                style={{ cursor: 'default' }}
              >
                {/* Active glow halo */}
                {isHighlighted && (
                  <circle
                    r="48"
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  r="42"
                  fill="none"
                  stroke={isHighlighted ? '#6366F1' : '#E2E8F0'}
                  strokeWidth={isHighlighted ? '2' : '1.5'}
                  opacity={isHighlighted ? 0.95 : 0.6}
                />

                {/* Inner Circle Body */}
                <circle
                  r="30"
                  fill="#FFFFFF"
                  stroke={isHighlighted ? '#6366F1' : '#CBD5E1'}
                  strokeWidth={isHighlighted ? '2.5' : '1.8'}
                  filter="url(#packet-glow)"
                />

                {/* Node Icon Emoji */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="24"
                  className="select-none"
                >
                  {icon}
                </text>

                {/* Node Main Label */}
                <text
                  y="42"
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#0F172A"
                  fontFamily="ui-monospace, monospace"
                  className="select-none"
                >
                  {node.label}
                </text>

                {/* Node Sublabel */}
                {node.sublabel && (
                  <text
                    y="58"
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    fontSize="10"
                    fill={node.sublabel.includes('MAC') ? '#4F46E5' : '#64748B'}
                    fontWeight="500"
                    fontFamily="ui-monospace, monospace"
                    className="select-none"
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive ASCII to Binary Widget for Step 2 of Physical Layer */}
      {isPhysical && currentStep?.interactiveAscii && (
        <div className="mt-2 w-full max-w-lg p-3 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-indigo-600 font-bold uppercase tracking-wider">
            <span>Interactive ASCII Bit Converter</span>
            <span className="text-[10px] text-slate-500 font-normal">Type any letter to see its bits</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <label htmlFor="ascii-char-input" className="text-xs text-slate-600 font-semibold">Char:</label>
              <input
                id="ascii-char-input"
                type="text"
                maxLength="1"
                value={interactiveChar}
                onChange={(e) => setInteractiveChar(e.target.value || 'H')}
                className="w-10 h-9 text-center text-lg font-bold bg-slate-50 text-slate-900 rounded-lg border border-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>ASCII Decimal: <strong className="text-slate-900">{charCode}</strong></span>
                <span>Hex: <strong className="text-indigo-600">0x{charCode.toString(16).toUpperCase()}</strong></span>
              </div>
              <div className="flex items-center gap-1 mt-1 font-mono text-sm tracking-widest text-indigo-700 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                {binaryString.split('').map((bit, idx) => (
                  <span 
                    key={idx} 
                    className={`px-1 rounded ${bit === '1' ? 'bg-indigo-100 text-indigo-700 font-extrabold' : 'text-slate-400'}`}
                  >
                    {bit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Frame Structure Visualizer for Ethernet in Step 4/5/6 */}
      {isEthernet && (
        <div className="mt-2 w-full max-w-xl p-2.5 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-indigo-600 font-bold mb-1.5 px-1 font-mono">
            <span>PACKET IN TRANSIT: 802.3 ETHERNET FRAME</span>
            <span className="font-mono text-[10px] text-slate-400">Total: 1518 Bytes</span>
          </div>

          <div className="flex items-center h-8 rounded-lg overflow-hidden border border-slate-200 font-mono text-[10px] text-center font-semibold">
            <div className="w-[12%] bg-slate-100 text-slate-600 py-1.5 border-r border-slate-200" title="Preamble 7B">
              Pre (7)
            </div>
            <div className="w-[6%] bg-slate-50 text-slate-500 py-1.5 border-r border-slate-200" title="SFD 1B">
              SFD
            </div>
            <div className="w-[18%] bg-sky-50 text-sky-800 py-1.5 border-r border-slate-200" title="Dst MAC 6B">
              Dst MAC (6)
            </div>
            <div className="w-[18%] bg-blue-50 text-blue-800 py-1.5 border-r border-slate-200" title="Src MAC 6B">
              Src MAC (6)
            </div>
            <div className="w-[10%] bg-indigo-50 text-indigo-800 py-1.5 border-r border-slate-200" title="EtherType 2B">
              Type (2)
            </div>
            <div className="flex-1 bg-purple-50 text-purple-800 py-1.5 border-r border-slate-200" title="Payload 46-1500B">
              Payload (IPv4 Packet)
            </div>
            <div className={`w-[12%] py-1.5 ${isCorruptStep ? 'bg-red-100 text-red-700 border-red-300 font-bold' : 'bg-emerald-50 text-emerald-800'}`} title="FCS 4B">
              {isCorruptStep ? 'FCS ❌' : 'FCS (4)'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
