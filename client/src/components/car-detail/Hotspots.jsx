import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { HOTSPOT_DATA } from './ViewerUtils';

const HotspotMarker = ({ hotspot, isActive, onClick }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle floating
    meshRef.current.position.y = hotspot.position[1] + Math.sin(t * 2) * 0.05;

    // Pulse scale
    const pulseScale = 1 + Math.sin(t * 3) * 0.2;
    if (ringRef.current) {
      ringRef.current.scale.setScalar(pulseScale);
    }

    // Glow opacity
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 2.5) * 0.1;
    }
  });

  return (
    <group
      ref={meshRef}
      position={hotspot.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(hotspot);
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? '#a78bfa' : '#6366f1'}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial
          color={isActive ? '#c4b5fd' : '#818cf8'}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? '#e0e7ff' : '#a5b4fc'}
        />
      </mesh>

      {/* HTML label */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          transform: 'translateY(-28px)',
        }}
      >
        <div
          style={{
            background: isActive
              ? 'rgba(99, 102, 241, 0.95)'
              : 'rgba(15, 15, 25, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            padding: '4px 10px',
            border: isActive
              ? '1px solid rgba(165, 180, 252, 0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isActive
              ? '0 4px 20px rgba(99, 102, 241, 0.4)'
              : '0 2px 10px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(hotspot);
          }}
          onPointerOver={(e) => (e.target.style.pointerEvents = 'auto')}
        >
          <span
            style={{
              color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {hotspot.icon} {hotspot.label}
          </span>
        </div>
      </Html>
    </group>
  );
};

const Hotspots = ({ activeHotspot, onHotspotClick, visible = true }) => {
  if (!visible) return null;

  return (
    <group>
      {HOTSPOT_DATA.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          isActive={activeHotspot === hotspot.id}
          onClick={onHotspotClick}
        />
      ))}
    </group>
  );
};

export default Hotspots;
