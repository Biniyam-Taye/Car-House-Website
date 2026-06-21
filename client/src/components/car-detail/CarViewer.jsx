import React, { Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import CarModel from './CarModel';
import CameraController from './CameraController';
import ShowroomEnvironment from './ShowroomEnvironment';
import Hotspots from './Hotspots';

const CarViewer = ({
  activeColor,
  activeEnvironment,
  headlightsOn,
  autoRotate,
  isInteriorMode,
  activeHotspot,
  flyToTarget,
  startupComplete,
  onUserInteraction,
  onHotspotClick,
  onFlyComplete,
  onStartupComplete,
  onModelLoaded,
}) => {

  const handleModelLoaded = useCallback((info) => {
    if (onModelLoaded) onModelLoaded(info);
  }, [onModelLoaded]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [12, 8, 12],
        fov: 40,
        near: 0.1,
        far: 200,
      }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Environment: floor, lights, HDRI, fog */}
        <ShowroomEnvironment activeEnvironment={activeEnvironment} />

        {/* 3D Car Model */}
        <CarModel
          activeColor={activeColor}
          headlightsOn={headlightsOn}
          onModelLoaded={handleModelLoaded}
        />

        {/* Interactive Hotspots */}
        <Hotspots
          activeHotspot={activeHotspot}
          onHotspotClick={onHotspotClick}
          visible={!isInteriorMode}
        />

        {/* Camera Controls */}
        <CameraController
          autoRotate={autoRotate}
          onUserInteraction={onUserInteraction}
          flyToTarget={flyToTarget}
          onFlyComplete={onFlyComplete}
          isInteriorMode={isInteriorMode}
          startupComplete={startupComplete}
          onStartupComplete={onStartupComplete}
        />
      </Suspense>
    </Canvas>
  );
};

export default CarViewer;
