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

      const meshName = (child.name || '').toLowerCase();
      
      const processMaterial = (mat) => {
        if (!mat) return mat;
        
        const matName = (mat.name || '').toLowerCase();
        
        // --- 1. IDENTIFICATION LOGIC ---
        // Paint/Body Detection (Highest Priority for explicitly named paints)
        const isBodyPart =
          matName.includes('paint') ||
          matName.includes('coat') ||
          matName.includes('body') ||
          matName.includes('car') ||
          matName.includes('exterior') ||
          meshName.includes('body') ||
          meshName.includes('paint') ||
          meshName.includes('shell') ||
          meshName.includes('panel') ||
          meshName.includes('fender') ||
          meshName.includes('bumper') ||
          meshName.includes('door') ||
          meshName.includes('hood') ||
          meshName.includes('trunk') ||
          meshName.includes('boot') ||
          meshName.includes('roof') ||
          meshName.includes('quarter');

        // Glass Detection
        let isGlass =
          matName.includes('glass') ||
          matName.includes('window') ||
          matName.includes('windshield') ||
          matName.includes('screen') ||
          meshName.includes('glass') ||
          meshName.includes('window') ||
          meshName.includes('windshield');

        // Fallback glass detection: Only apply if it's NOT explicitly a body part
        if (!isGlass && !isBodyPart && (mat.transmission > 0.5 || (mat.transparent && mat.opacity < 1.0 && mat.opacity > 0.1))) {
          isGlass = true;
        }

        // --- 2. NON-PAINT EXCLUSIONS ---
        const isChrome =
          matName.includes('chrome') ||
          matName.includes('metal_bright') ||
          matName.includes('silver') ||
          meshName.includes('chrome') ||
          meshName.includes('trim') ||
          meshName.includes('logo') ||
          meshName.includes('badge');

        const isRubber =
          matName.includes('tire') ||
          matName.includes('rubber') ||
          meshName.includes('tire') ||
          meshName.includes('tyre') ||
          meshName.includes('rubber');

        const isWheel =
          matName.includes('wheel') ||
          matName.includes('rim') ||
          matName.includes('alloy') ||
          matName.includes('brake') ||
          matName.includes('caliper') ||
          matName.includes('metal') ||
          matName.includes('steel') ||
          matName.includes('aluminum') ||
          meshName.includes('wheel') ||
          meshName.includes('rim') ||
          meshName.includes('alloy') ||
          meshName.includes('brake') ||
          meshName.includes('caliper') ||
          meshName.includes('disc') ||
          meshName.includes('rotor') ||
          meshName.includes('spoke');
          
        const isLight = 
          matName.includes('light') || 
          matName.includes('lamp') || 
          meshName.includes('light') || 
          meshName.includes('lamp');

        const isLargeSurface =
          child.geometry &&
          child.geometry.attributes.position &&
          child.geometry.attributes.position.count > 500;

        const isActuallyBody = isBodyPart || (isLargeSurface && !isWheel && !isRubber && !isChrome && !isLight && !isGlass);

        // --- APPLY MODIFICATIONS ---

        // Handle lights
        if (isLight) {
           const lightMat = mat.clone();
           if (meshName.includes('head') || meshName.includes('front') || matName.includes('front') || matName.includes('head')) {
               lightMat.emissive = new THREE.Color(0xffffff);
               headlights.push(lightMat);
           } else if (meshName.includes('tail') || meshName.includes('rear') || meshName.includes('brake') || matName.includes('tail') || matName.includes('rear')) {
               lightMat.emissive = new THREE.Color(0xff1111);
               taillights.push(lightMat);
           }
           return lightMat;
        }

        // Handle glass
        if (isGlass) {
          const blackGlass = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0x050505), // Permanent dark black tint
            metalness: 0.9,
            roughness: 0.05,
            transmission: 0.0, // Opaque block
            envMapIntensity: 2.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
          });
          return blackGlass;
        }

        // Handle paint
        if (!isGlass && !isChrome && !isRubber && !isWheel && !isLight && isActuallyBody) {
          const physMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0x1a1a1a),
            metalness: 0.9,
            roughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            envMapIntensity: 1.5,
          });
          
          if (mat.color && typeof mat.color.copy === 'function') {
             try { physMat.color.copy(mat.color); } catch (e) {}
          }
          
          bodies.push(physMat);
          return physMat;
        }

        return mat; // Return unmodified material if it doesn't match any group
      };

      if (Array.isArray(child.material)) {
        child.material = child.material.map(m => processMaterial(m));
      } else {
        child.material = processMaterial(child.material);
      }
    });

    bodyMaterials.current = bodies;
    headlightMaterials.current = headlights;
    taillightMaterials.current = taillights;

    // Auto-center and scale the model
    // Reset position and scale first in case of React StrictMode double-invocation
    clonedScene.position.set(0, 0, 0);
    clonedScene.scale.setScalar(1);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim;

    clonedScene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    clonedScene.scale.setScalar(scale);
    clonedScene.updateMatrixWorld(true);

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
