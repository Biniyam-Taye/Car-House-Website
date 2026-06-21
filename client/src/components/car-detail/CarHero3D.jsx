import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoadingScreen from './LoadingScreen';
import CarViewer from './CarViewer';
import VehicleInfoCard from './VehicleInfoCard';
import ColorConfigurator from './ColorConfigurator';
import EnvironmentSwitcher from './EnvironmentSwitcher';
import VehicleControls from './VehicleControls';
import { CAR_COLORS, ENVIRONMENTS, AUTO_ROTATE_DELAY } from './ViewerUtils';

const CarHero3D = ({ car }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startupComplete, setStartupComplete] = useState(false);

  // Showroom State
  const [activeColor, setActiveColor] = useState(CAR_COLORS[0].id);
  const [activeEnvironment, setActiveEnvironment] = useState(ENVIRONMENTS[0].id);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [isInteriorMode, setIsInteriorMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [flyToTarget, setFlyToTarget] = useState(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [zoomCommand, setZoomCommand] = useState(null);

  // Idle timer ref for auto-rotate
  const idleTimerRef = useRef(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setAutoRotate(false);

    idleTimerRef.current = setTimeout(() => {
      // Only resume auto-rotate if we are not in interior mode and no hotspot is active
      if (!isInteriorMode && !activeHotspot) {
        setAutoRotate(true);
      }
    }, AUTO_ROTATE_DELAY);
  }, [isInteriorMode, activeHotspot]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Handlers
  const handleModelLoaded = useCallback(() => {
    setLoadingProgress(100);
    setIsLoaded(true);
  }, []);

  const handleUserInteraction = useCallback(() => {
    resetIdleTimer();
  }, [resetIdleTimer]);

  const handleColorChange = useCallback((colorId) => {
    setActiveColor(colorId);
    handleUserInteraction();
  }, [handleUserInteraction]);

  const handleEnvironmentChange = useCallback((envId) => {
    setActiveEnvironment(envId);
    handleUserInteraction();
  }, [handleUserInteraction]);

  const handleToggleHeadlights = useCallback(() => {
    setHeadlightsOn((prev) => !prev);
    handleUserInteraction();
  }, [handleUserInteraction]);

  const handleToggleInterior = useCallback(() => {
    setIsInteriorMode((prev) => {
      const next = !prev;
      if (next) {
        setActiveHotspot(null);
        setAutoRotate(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      } else {
        resetIdleTimer();
      }
      return next;
    });
    handleUserInteraction();
  }, [handleUserInteraction, resetIdleTimer]);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => {
      const next = !prev;
      if (!next && idleTimerRef.current) clearTimeout(idleTimerRef.current);
      return next;
    });
  }, []);

  const handleToggleHotspots = useCallback(() => {
    setShowHotspots((prev) => !prev);
    if (activeHotspot) setActiveHotspot(null);
    handleUserInteraction();
  }, [activeHotspot, handleUserInteraction]);

  const handleHotspotClick = useCallback((hotspot) => {
    setActiveHotspot(hotspot.id);
    setFlyToTarget({
      position: hotspot.cameraPosition.position,
      target: hotspot.cameraPosition.target,
    });
    setAutoRotate(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, []);

  const handleFlyComplete = useCallback(() => {
    setFlyToTarget(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomCommand({ direction: 'in', ts: Date.now() });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomCommand({ direction: 'out', ts: Date.now() });
  }, []);

  return (
    <div className="relative w-full h-[95vh] min-h-[600px] overflow-hidden bg-[#0a0a0f]">
      {/* Premium Loading Screen */}
      <LoadingScreen fallbackProgress={loadingProgress} isLoaded={isLoaded} />

      {/* Main 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <CarViewer
          activeColor={activeColor}
          activeEnvironment={activeEnvironment}
          headlightsOn={headlightsOn}
          autoRotate={autoRotate}
          isInteriorMode={isInteriorMode}
          activeHotspot={activeHotspot}
          showHotspots={showHotspots}
          flyToTarget={flyToTarget}
          zoomCommand={zoomCommand}
          startupComplete={startupComplete}
          onUserInteraction={handleUserInteraction}
          onHotspotClick={handleHotspotClick}
          onFlyComplete={handleFlyComplete}
          onStartupComplete={() => setStartupComplete(true)}
          onModelLoaded={handleModelLoaded}
        />
      </div>

      {/* UI Overlays - Only show after loaded */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top gradient for navbar blending */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent pointer-events-none" />

          <VehicleInfoCard car={car} />

          <div className="pointer-events-auto absolute bottom-6 w-full flex flex-row flex-wrap justify-center md:justify-start items-end gap-3 px-4 md:pl-6 md:pr-20 z-20">
            <ColorConfigurator
              activeColor={activeColor}
              onColorChange={handleColorChange}
            />

            <EnvironmentSwitcher
              activeEnvironment={activeEnvironment}
              onEnvironmentChange={handleEnvironmentChange}
            />
          </div>

          <div className="pointer-events-auto">

            <VehicleControls
              headlightsOn={headlightsOn}
              onToggleHeadlights={handleToggleHeadlights}
              isInteriorMode={isInteriorMode}
              onToggleInterior={handleToggleInterior}
              autoRotate={autoRotate}
              onToggleAutoRotate={handleToggleAutoRotate}
              showHotspots={showHotspots}
              onToggleHotspots={handleToggleHotspots}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarHero3D;
