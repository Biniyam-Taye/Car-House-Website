import gsap from 'gsap';

// ─── Cinematic Camera Fly-In ───
export const animateCameraFlyIn = (camera, controls, targetPos, targetLookAt, onComplete) => {
  const tl = gsap.timeline({ onComplete });

  tl.to(camera.position, {
    x: targetPos[0],
    y: targetPos[1],
    z: targetPos[2],
    duration: 2.5,
    ease: 'power3.inOut',
    onUpdate: () => {
      if (controls?.target) {
        controls.target.set(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
        controls.update();
      }
    },
  });

  return tl;
};

// ─── Smooth Camera Transition ───
export const animateCameraTo = (camera, controls, targetPos, targetLookAt, duration = 1.5) => {
  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });

    tl.to(camera.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration,
      ease: 'power2.inOut',
    }, 0);

    if (controls?.target) {
      tl.to(controls.target, {
        x: targetLookAt[0],
        y: targetLookAt[1],
        z: targetLookAt[2],
        duration,
        ease: 'power2.inOut',
        onUpdate: () => controls.update(),
      }, 0);
    }
  });
};

// ─── Color Transition Animation ───
export const animateColorTransition = (material, newColor, duration = 0.8) => {
  if (!material?.color) return;

  gsap.to(material.color, {
    r: newColor.r,
    g: newColor.g,
    b: newColor.b,
    duration,
    ease: 'power2.inOut',
  });
};

// ─── Headlight Glow Animation ───
export const animateHeadlightToggle = (materials, isOn, duration = 0.5) => {
  materials.forEach((mat) => {
    if (mat?.emissive) {
      gsap.to(mat, {
        emissiveIntensity: isOn ? 2.0 : 0,
        duration,
        ease: 'power2.out',
      });
    }
  });
};

// ─── UI Stagger Entrance ───
export const staggerEntrance = (elements, delay = 0.1) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger: delay,
      duration: 0.6,
      ease: 'power3.out',
    }
  );
};

// ─── Pulse Animation for Hotspots ───
export const createPulseAnimation = (mesh) => {
  if (!mesh) return null;

  return gsap.to(mesh.scale, {
    x: 1.3,
    y: 1.3,
    z: 1.3,
    duration: 1,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
};
