import React, { useRef, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CAMERA_POSITIONS, AUTO_ROTATE_DELAY, AUTO_ROTATE_SPEED } from './ViewerUtils';
import { animateCameraFlyIn, animateCameraTo } from './Animations';

const CameraController = ({
  autoRotate,
  onUserInteraction,
  flyToTarget,
  onFlyComplete,
  isInteriorMode,
  startupComplete,
  onStartupComplete,
}) => {
  const controlsRef = useRef();
  const { camera } = useThree();
  const lastInteraction = useRef(Date.now());
  const hasStartedUp = useRef(false);
  const isFlying = useRef(false);

  // Cinematic startup fly-in
  useEffect(() => {
    if (hasStartedUp.current || startupComplete) return;
    hasStartedUp.current = true;

    // Set initial camera far away
    const initial = CAMERA_POSITIONS.initial;
    camera.position.set(initial.position[0], initial.position[1], initial.position[2]);

    // Delay for loading screen to fade
    const timer = setTimeout(() => {
      const target = CAMERA_POSITIONS.front34;
      animateCameraFlyIn(
        camera,
        controlsRef.current,
        target.position,
        target.target,
        () => {
          if (onStartupComplete) onStartupComplete();
        }
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [camera, startupComplete, onStartupComplete]);

  // Fly to hotspot/target
  useEffect(() => {
    if (!flyToTarget || isFlying.current) return;
    isFlying.current = true;

    animateCameraTo(
      camera,
      controlsRef.current,
      flyToTarget.position,
      flyToTarget.target,
      1.5
    ).then(() => {
      isFlying.current = false;
      if (onFlyComplete) onFlyComplete();
    });
  }, [flyToTarget, camera, onFlyComplete]);

  // Interior mode transition
  useEffect(() => {
    if (isFlying.current) return;

    const target = isInteriorMode
      ? CAMERA_POSITIONS.interior
      : CAMERA_POSITIONS.front34;

    animateCameraTo(
      camera,
      controlsRef.current,
      target.position,
      target.target,
      2.0
    );
  }, [isInteriorMode, camera]);

  // Track user interaction
  const handleInteraction = useCallback(() => {
    lastInteraction.current = Date.now();
    if (onUserInteraction) onUserInteraction();
  }, [onUserInteraction]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      minDistance={2}
      maxDistance={15}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.55}
      autoRotate={autoRotate}
      autoRotateSpeed={AUTO_ROTATE_SPEED}
      onStart={handleInteraction}
      onChange={handleInteraction}
      makeDefault
    />
  );
};

export default CameraController;
