import React, { useMemo } from 'react';
import {
  Environment,
  ContactShadows,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { ENVIRONMENTS } from './ViewerUtils';

const ShowroomEnvironment = ({ activeEnvironment = 'showroom' }) => {
  const env = useMemo(
    () => ENVIRONMENTS.find((e) => e.id === activeEnvironment) || ENVIRONMENTS[0],
    [activeEnvironment]
  );

  return (
    <>
      {/* HDRI Environment Map */}
      <Environment
        preset={env.preset}
        environmentIntensity={env.envIntensity}
      />

      {/* Scene background color + fog */}
      <color attach="background" args={[env.bgColor]} />
      <fog attach="fog" args={[env.fogColor, env.fogNear, env.fogFar]} />

      {/* Ambient Light */}
      <ambientLight intensity={env.ambientIntensity} color="#e8e0ff" />

      {/* Primary Key Light - front above */}
      <spotLight
        position={[5, 8, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={env.spotIntensity}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill light - opposite side */}
      <spotLight
        position={[-5, 6, -3]}
        angle={0.5}
        penumbra={1}
        intensity={env.spotIntensity * 0.4}
        color="#b0c4ff"
      />

      {/* Rim light - behind */}
      <spotLight
        position={[0, 4, -8]}
        angle={0.6}
        penumbra={0.9}
        intensity={env.spotIntensity * 0.6}
        color="#c8b0ff"
      />

      {/* Bottom up-light for dramatic effect */}
      <pointLight
        position={[0, -1, 0]}
        intensity={env.spotIntensity * 0.15}
        color="#6366f1"
        distance={8}
      />

      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={0.6}
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={env.floorColor}
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={15}
        blur={2.5}
        far={4}
        color="#000000"
      />

      {/* Subtle ground grid for depth */}
      <gridHelper
        args={[50, 50, '#1a1a2e', '#1a1a2e']}
        position={[0, 0.005, 0]}
        material-opacity={0.08}
        material-transparent
      />
    </>
  );
};

export default ShowroomEnvironment;
