import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SCENARIOS } from '../data/scenarios';
import SimulatorHeader from './SimulatorHeader';
import CanvasTopology from './CanvasTopology';
import BottomPanel from './BottomPanel';
import Sidebar from './Sidebar';

export default function SimulatorPage() {
  const { slug } = useParams();
  const scenario = SCENARIOS[slug];

  if (!scenario) {
    return <Navigate to="/" replace />;
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0.2);
  const [inspectedPacketId, setInspectedPacketId] = useState(
    scenario.steps[0]?.inspectPacketId || scenario.packets[0]?.id
  );
  const [selectedField, setSelectedField] = useState(null);

  const currentStep = scenario.steps[currentStepIndex];
  const totalSteps = scenario.steps.length;

  // Sync inspected packet when step changes
  useEffect(() => {
    if (currentStep?.inspectPacketId) {
      setInspectedPacketId(currentStep.inspectPacketId);
    }
    if (currentStep?.activeField) {
      setSelectedField(currentStep.activeField);
    } else {
      setSelectedField(null);
    }
    setAnimationProgress(0.1);
  }, [currentStepIndex, currentStep]);

  // Animation frame loop for butter-smooth packet motion & auto-advancing
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    let stepElapsed = 0;
    const stepDuration = currentStep?.durationMs || 4500;
    // Smooth, natural transit duration across the wire (2.4s)
    const transitDuration = 2400;

    const animate = (now) => {
      // Cap delta to 50ms to prevent stutter on background tab resumption
      const delta = Math.min(now - lastTime, 50);
      lastTime = now;

      // Smooth continuous packet progress 0 -> 1
      setAnimationProgress((prev) => (prev + delta / transitDuration) % 1);

      // Auto-advance step when playing
      if (isPlaying) {
        stepElapsed += delta;
        if (stepElapsed >= stepDuration) {
          stepElapsed = 0;
          if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((s) => s + 1);
            setAnimationProgress(0);
          } else {
            setIsPlaying(false);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, currentStepIndex, currentStep, totalSteps]);

  // Keyboard navigation handler without hijacking inputs or buttons
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check active focused element
      const activeEl = document.activeElement;
      const isInputFocused = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.isContentEditable
      );

      // If user is typing in a form or text field, do not hijack!
      if (isInputFocused) return;

      // Also if a button has focus and user presses Space or Enter, let the native button click handle it
      if (activeEl && activeEl.tagName === 'BUTTON' && (e.code === 'Space' || e.code === 'Enter')) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex((prev) => prev + 1);
          setAnimationProgress(0.1);
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (currentStepIndex > 0) {
          setCurrentStepIndex((prev) => prev - 1);
          setAnimationProgress(0.1);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setCurrentStepIndex(0);
        setIsPlaying(false);
        setAnimationProgress(0.1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps]);

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setAnimationProgress(0.1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setAnimationProgress(0.1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setAnimationProgress(0.1);
  };

  const handleSelectStep = (idx) => {
    setCurrentStepIndex(idx);
    setAnimationProgress(0.1);
  };

  const currentInspectedPacket = scenario.packets.find(
    (p) => p.id === inspectedPacketId
  ) || scenario.packets[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      <SimulatorHeader scenario={scenario} />

      <div className="flex flex-col lg:flex-row flex-1 h-[calc(100dvh-53px)] overflow-hidden">
        {/* Left / Center Interactive Canvas Area */}
        <main 
          className="h-[58vw] min-h-[260px] flex-shrink-0 lg:flex-1 lg:h-auto flex flex-col justify-between p-4 lg:p-6 bg-[#F8FAFC] overflow-y-auto relative"
          aria-label="Simulation Topology View"
        >
          {/* SVG Topology & Visual Waveforms */}
          <CanvasTopology
            scenario={scenario}
            currentStep={currentStep}
            inspectedPacketId={inspectedPacketId}
            onInspectPacket={(id) => setInspectedPacketId(id)}
            animationProgress={animationProgress}
            isPaused={!isPlaying}
          />

          {/* Bottom Layer & Packet Header Inspector Bar */}
          <div className="w-full max-w-3xl mx-auto mt-4 pointer-events-auto">
            <BottomPanel
              currentStep={currentStep}
              scenario={scenario}
              inspectedPacket={currentInspectedPacket}
            />
          </div>
        </main>

        {/* Right Sidebar Explanations, Inspector & Controls */}
        <Sidebar
          scenario={scenario}
          currentStepIndex={currentStepIndex}
          currentStep={currentStep}
          isPlaying={isPlaying}
          onPrev={handlePrev}
          onNext={handleNext}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSelectStep={handleSelectStep}
          inspectedPacket={currentInspectedPacket}
          onSelectPacket={(id) => setInspectedPacketId(id)}
          selectedField={selectedField}
          onSelectField={(f) => setSelectedField(f)}
        />
      </div>
    </div>
  );
}
