import React from 'react';

export default function BottomPanel({ currentStep, scenario, inspectedPacket }) {
  if (!inspectedPacket) return null;

  const isCorrupt = currentStep?.id === 'corrupt';
  const packetColor = isCorrupt ? '#EF4444' : inspectedPacket.color || '#6366F1';

  // Find active OSI layer
  const activeLayer = inspectedPacket.osiLayers?.find((l) => l.active) || inspectedPacket.osiLayers?.[0];
  const headers = activeLayer?.headers || {};
  const entries = Object.entries(headers);

  return (
    <div 
      className="w-full rounded-xl border bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 p-4 transition-all duration-300"
      style={{
        borderColor: `${packetColor}50`
      }}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span 
            className="w-2.5 h-2.5 rounded-full"
            style={{ 
              backgroundColor: packetColor,
              boxShadow: `0 0 6px ${packetColor}`
            }}
          />
          <span className="font-bold text-slate-900 text-sm font-mono tracking-wide">
            {inspectedPacket.label}
          </span>
          {inspectedPacket.protocol && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {inspectedPacket.protocol}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeLayer && (
            <span 
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full border tracking-wider uppercase font-mono"
              style={{
                backgroundColor: `${packetColor}12`,
                color: packetColor,
                borderColor: `${packetColor}35`
              }}
            >
              Layer {activeLayer.layerNumber || 1} · {activeLayer.layer}
            </span>
          )}
          {activeLayer?.protocol && (
            <span className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {activeLayer.protocol}
            </span>
          )}
        </div>
      </div>

      {/* Grid of Headers */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2.5 gap-x-6 text-xs">
          {entries.map(([key, val]) => (
            <div key={key} className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-400 font-mono tracking-wide uppercase">
                {key}
              </span>
              <span className={`font-mono text-slate-800 mt-0.5 break-words font-medium ${val.includes('FAILED') || val.includes('DROPPED') ? 'text-red-600 font-bold' : ''}`}>
                {val}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 font-mono">
          {activeLayer?.description || 'Packet inspected on wire.'}
        </p>
      )}
    </div>
  );
}
