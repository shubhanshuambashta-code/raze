import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export default function Sidebar({
  scenario,
  currentStepIndex,
  currentStep,
  isPlaying,
  onPrev,
  onNext,
  onPlayPause,
  onReset,
  onSelectStep,
  inspectedPacket,
  onSelectPacket,
  selectedField,
  onSelectField
}) {
  const [expandedLayers, setExpandedLayers] = useState({ 1: true, 2: true, 3: false });

  const totalSteps = scenario.steps.length;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const toggleLayer = (layerNum) => {
    setExpandedLayers((prev) => ({ ...prev, [layerNum]: !prev[layerNum] }));
  };

  // Helper to parse basic markdown text for explanation
  const renderFormattedExplanation = (text) => {
    if (!text) return null;

    const paragraphs = text.split('\n\n');

    return (
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
        {paragraphs.map((para, pIdx) => {
          if (para.includes('\n- ') || para.startsWith('- ')) {
            const lines = para.split('\n');
            const intro = lines[0].startsWith('- ') ? null : lines[0];
            const items = lines.filter(l => l.startsWith('- '));

            return (
              <div key={pIdx} className="space-y-1.5">
                {intro && (
                  <p dangerouslySetInnerHTML={{ __html: formatInline(intro) }} />
                )}
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  {items.map((item, iIdx) => (
                    <li key={iIdx} dangerouslySetInnerHTML={{ __html: formatInline(item.replace('- ', '')) }} />
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <p key={pIdx} dangerouslySetInnerHTML={{ __html: formatInline(para) }} />
          );
        })}
      </div>
    );
  };

  // Inline formatter for bold, code, and links with light pastel styling
  const formatInline = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-[13px] border border-indigo-100">$1</code>');
  };

  const isEthernet = scenario.slug === 'ethernet-frames';
  const isCorrupt = currentStep?.id === 'corrupt';

  // Active packet fields if ethernet frame
  const frameFields = inspectedPacket?.fields || [];
  const currentActiveFieldName = selectedField || currentStep?.activeField || (isCorrupt ? 'FCS' : 'Payload');
  const activeFieldData = frameFields.find(f => f.name === currentActiveFieldName) || frameFields[0];

  return (
    <aside 
      className="flex-1 min-h-0 w-full lg:flex-none lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col overflow-hidden select-text"
      aria-label="Lesson Content and Controls"
    >
      {/* Scrollable Explanation & Details Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Step Title & Explanation */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 leading-snug flex items-center justify-between">
            <span>{currentStep?.title}</span>
            {isCorrupt && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-600" /> Error Step
              </span>
            )}
          </h2>
          {renderFormattedExplanation(currentStep?.explanation)}
        </div>

        {/* Packets in Motion Selector */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <p className="text-xs text-slate-500 mb-2 font-mono flex items-center justify-between font-medium">
            <span>Packets in motion — click to inspect:</span>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">Live</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {scenario.packets.map((pkt) => {
              const isSelected = inspectedPacket?.id === pkt.id;
              const isStepActive = currentStep?.packetAnimations?.some(a => a.packetId === pkt.id) || currentStep?.inspectPacketId === pkt.id;

              return (
                <button
                  key={pkt.id}
                  onClick={() => onSelectPacket(pkt.id)}
                  className={`text-xs px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none border ${
                    isSelected
                      ? 'bg-white text-indigo-700 border-indigo-300 shadow-sm ring-1 ring-indigo-200 font-bold'
                      : isStepActive
                      ? 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                      : 'bg-slate-100/70 text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-white'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: pkt.color || '#6366F1' }} 
                  />
                  <span>{pkt.label}</span>
                  {isStepActive && (
                    <span className="text-[9px] px-1 bg-indigo-50 text-indigo-700 rounded border border-indigo-100 font-semibold">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dedicated Frame Field Inspector (Ethernet Frames Lesson) */}
        {isEthernet && frameFields.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 font-mono tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                FRAME STRUCTURE INSPECTOR
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Click field below</span>
            </div>

            {/* Clickable segmented frame bar */}
            <div className="flex flex-wrap gap-1">
              {frameFields.map((field) => {
                const isSelected = (currentActiveFieldName === field.name);
                const isFieldFCS = field.name === 'FCS';

                return (
                  <button
                    key={field.name}
                    onClick={() => onSelectField && onSelectField(field.name)}
                    className={`px-2 py-1 text-[10px] font-mono font-semibold rounded-md border transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                      isSelected
                        ? (isCorrupt && isFieldFCS
                            ? 'bg-red-50 text-red-700 border-red-300 ring-1 ring-red-200 font-bold'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-1 ring-indigo-200 font-bold')
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {field.name} ({field.bytes})
                  </button>
                );
              })}
            </div>

            {/* Active Field Details Box */}
            {activeFieldData && (
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-mono">{activeFieldData.name} ({activeFieldData.bytes})</span>
                  <span className={`text-[11px] font-mono font-bold ${isCorrupt && activeFieldData.name === 'FCS' ? 'text-red-600' : 'text-indigo-600'}`}>
                    {activeFieldData.hex}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-normal font-sans">
                  {activeFieldData.desc}
                </p>
                {isCorrupt && activeFieldData.name === 'FCS' && (
                  <div className="mt-2 p-1.5 rounded-md bg-red-50 border border-red-200 text-[11px] text-red-700 flex items-center gap-1.5 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-red-600" />
                    <span>CRC Mismatch: Calculated CRC != FCS. Frame dropped silently!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Layer Details Accordion */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            Layer Details (Click to expand)
          </p>

          {inspectedPacket?.osiLayers?.map((layer) => {
            const isExpanded = expandedLayers[layer.layerNumber];
            const entries = Object.entries(layer.headers || {});

            return (
              <div 
                key={layer.layerNumber} 
                className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggleLayer(layer.layerNumber)}
                  className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900">
                      L{layer.layerNumber}
                    </span>
                    <span className="text-xs text-slate-700 font-medium">
                      {layer.layer}
                    </span>
                    {layer.protocol && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {layer.protocol}
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3 bg-slate-50/60 border-t border-slate-200 space-y-2 text-xs">
                    {layer.description && (
                      <p className="text-slate-500 italic mb-2">
                        {layer.description}
                      </p>
                    )}
                    {entries.length > 0 && (
                      <div className="space-y-1.5">
                        {entries.map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2 font-mono">
                            <span className="text-slate-500">{k}:</span>
                            <span className={`text-right font-medium ${v.includes('FAILED') || v.includes('DROPPED') ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Control Dock */}
      <div className="border-t border-slate-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3 bg-white">
        {/* Step dots navigation */}
        <div className="flex items-center gap-1.5 flex-wrap" role="tablist" aria-label="Step Navigation">
          {scenario.steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(idx)}
                className={`transition-all rounded-full focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                  isActive
                    ? 'w-4 h-2 bg-indigo-600'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Step ${idx + 1}: ${step.title}`}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                aria-selected={isActive}
              />
            );
          })}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onPrev}
            disabled={isFirstStep}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none shadow-2xs"
            title="Previous step (Left Arrow)"
            aria-label="Previous step"
          >
            ⏮
          </button>

          <button
            onClick={onPlayPause}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none shadow-xs"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            onClick={onNext}
            disabled={isLastStep}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none shadow-2xs"
            title="Next step (Right Arrow)"
            aria-label="Next step"
          >
            ⏭
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none shadow-2xs"
            title="Reset simulation"
            aria-label="Reset simulation"
          >
            ↺
          </button>

          <span className="ml-auto text-xs text-slate-500 font-mono font-semibold" aria-live="polite">
            {currentStepIndex + 1} / {totalSteps}
          </span>
        </div>

        {/* Keyboard shortcut hint */}
        <p className="text-[10px] text-slate-400 text-center font-mono">
          Space to play/pause · ← → to step
        </p>
      </div>
    </aside>
  );
}
