import React, { useEffect, useRef, useMemo, memo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATH, CAR_COLORS } from './ViewerUtils';
import { animateColorTransition } from './Animations';

const CarModel = memo(({ activeColor, headlightsOn = false, onModelLoaded }) => {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef();
  const bodyMaterials = useRef([]);
  const headlightMaterials = useRef([]);
  const taillightMaterials = useRef([]);

  // Clone the scene so we can modify materials without affecting the cached GLTF
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);

    // Traverse and fix materials for the cloned scene
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false; // Prevent disappearing when zooming/rotating

        // Clone material so each instance is independent
        if (child.material) {
          child.material = child.material.clone();
        }
      }
    });

    return cloned;
  }, [scene]);

  // Identify and categorize materials
  useEffect(() => {
    const bodies = [];
    const headlights = [];
    const taillights = [];

    clonedScene.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      const name = (child.name || '').toLowerCase();
      const matName = (child.material.name || '').toLowerCase();

      // Identify headlight meshes
      if (
        name.includes('headlight') ||
        name.includes('head_light') ||
        name.includes('frontlight') ||
        matName.includes('headlight') ||
        matName.includes('lamp_front')
      ) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            if (m) {
              m.emissive = new THREE.Color(0xffffff);
              m.emissiveIntensity = 0;
              headlights.push(m);
            }
          });
        } else {
          child.material.emissive = new THREE.Color(0xffffff);
          child.material.emissiveIntensity = 0;
          headlights.push(child.material);
        }
        return;
      }

      // Identify taillight meshes
      if (
        name.includes('taillight') ||
        name.includes('tail_light') ||
        name.includes('rearlight') ||
        name.includes('brake') ||
        matName.includes('taillight') ||
        matName.includes('lamp_rear')
      ) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            if (m) {
              m.emissive = new THREE.Color(0xff1111);
              m.emissiveIntensity = 0;
              taillights.push(m);
            }
          });
        } else {
          child.material.emissive = new THREE.Color(0xff1111);
          child.material.emissiveIntensity = 0;
          taillights.push(child.material);
        }
        return;
      }

      // Identify body panels — largest surfaces with paint-like materials
      // Heuristic: look for body-related names, or large geometry
      const isBodyPart =
        name.includes('body') ||
        name.includes('paint') ||
        name.includes('shell') ||
        name.includes('panel') ||
        name.includes('fender') ||
        name.includes('bumper') ||
        name.includes('door') ||
        name.includes('hood') ||
        name.includes('trunk') ||
        name.includes('roof') ||
        name.includes('quarter') ||
        matName.includes('body') ||
        matName.includes('paint') ||
        matName.includes('car') ||
        matName.includes('exterior');

      // Also check by geometry size (large surfaces are likely body panels)
      const isLargeSurface =
        child.geometry &&
        child.geometry.attributes.position &&
        child.geometry.attributes.position.count > 500;

      // Check if the material color suggests a car paint (not glass, chrome, rubber, etc.)
      const isGlass =
        name.includes('glass') ||
        name.includes('window') ||
        name.includes('windshield') ||
        matName.includes('glass');
        
      const isChrome =
        name.includes('chrome') ||
        name.includes('trim') ||
        matName.includes('chrome') ||
        matName.includes('metal_bright');
        
      const isRubber =
        name.includes('tire') ||
        name.includes('tyre') ||
        name.includes('rubber') ||
        matName.includes('tire') ||
        matName.includes('rubber');
        
      const isWheel =
        name.includes('wheel') ||
        name.includes('rim') ||
        matName.includes('wheel') ||
        matName.includes('rim');

      if (!isGlass && !isChrome && !isRubber && !isWheel && (isBodyPart || isLargeSurface)) {
        // Convert to MeshPhysicalMaterial for realistic car paint
        const physMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x1a1a1a), // Will be overridden by activeColor
          metalness: 0.9,
          roughness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMapIntensity: 1.5,
        });
        
        if (Array.isArray(child.material)) {
          // Keep original material length, replace with physMat
          child.material = child.material.map(() => physMat.clone());
          child.material.forEach(m => bodies.push(m));
        } else {
          // If the original material has a color, copy it temporarily
          if (child.material && child.material.color && typeof child.material.color.copy === 'function') {
            try {
              physMat.color.copy(child.material.color);
            } catch (e) {
              console.warn("Could not copy material color", e);
            }
          }
          child.material = physMat;
          bodies.push(physMat);
        }
      }
    });

    bodyMaterials.current = bodies;
    headlightMaterials.current = headlights;
    taillightMaterials.current = taillights;

    // Auto-center and scale the model
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim;

    clonedScene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    clonedScene.scale.setScalar(scale);

    if (onModelLoaded) {
      onModelLoaded({ box, center, size, scale });
    }
  }, [clonedScene, onModelLoaded]);

  // Handle color changes
  useEffect(() => {
    if (!activeColor || bodyMaterials.current.length === 0) return;

    const colorDef = CAR_COLORS.find((c) => c.id === activeColor);
    if (!colorDef) return;

    const newColor = new THREE.Color(colorDef.hex);

    bodyMaterials.current.forEach((mat) => {
      animateColorTransition(mat, newColor);
      // Also update physical properties
      mat.metalness = colorDef.metalness;
      mat.roughness = colorDef.roughness;
      mat.clearcoat = colorDef.clearcoat;
      mat.clearcoatRoughness = colorDef.clearcoatRoughness;
    });
  }, [activeColor]);

  // Handle headlight toggle
  useEffect(() => {
    // Headlights
    headlightMaterials.current.forEach((mat) => {
      mat.emissiveIntensity = headlightsOn ? 3.0 : 0;
    });
    // Taillights follow headlights
    taillightMaterials.current.forEach((mat) => {
      mat.emissiveIntensity = headlightsOn ? 2.0 : 0;
    });
  }, [headlightsOn]);

  return <primitive ref={modelRef} object={clonedScene} />;
});

CarModel.displayName = 'CarModel';

// Preload the model
useGLTF.preload(MODEL_PATH);

export default CarModel;
