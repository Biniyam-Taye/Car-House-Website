// ─── Color Palette ───
export const CAR_COLORS = [
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    hex: '#0a0a0a',
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  },
  {
    id: 'pearl-white',
    name: 'Pearl White',
    hex: '#f5f0eb',
    metalness: 0.3,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  },
  {
    id: 'metallic-silver',
    name: 'Metallic Silver',
    hex: '#c0c0c0',
    metalness: 0.95,
    roughness: 0.12,
    clearcoat: 0.9,
    clearcoatRoughness: 0.06,
  },
  {
    id: 'racing-red',
    name: 'Racing Red',
    hex: '#8b0000',
    metalness: 0.7,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  },
  {
    id: 'deep-blue',
    name: 'Deep Blue',
    hex: '#0c1445',
    metalness: 0.85,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  },
  {
    id: 'graphite-gray',
    name: 'Graphite Gray',
    hex: '#3a3a3c',
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.85,
    clearcoatRoughness: 0.1,
  },
];

// ─── Environment Presets ───
export const ENVIRONMENTS = [
  {
    id: 'showroom',
    name: 'Showroom',
    preset: 'studio',
    icon: '🏛️',
    bgColor: '#0a0a0f',
    fogColor: '#0a0a0f',
    fogNear: 10,
    fogFar: 50,
    floorColor: '#111118',
    ambientIntensity: 0.3,
    spotIntensity: 1.5,
    envIntensity: 1.0,
  },
  {
    id: 'garage',
    name: 'Garage',
    preset: 'warehouse',
    icon: '🏗️',
    bgColor: '#12120f',
    fogColor: '#12120f',
    fogNear: 12,
    fogFar: 60,
    floorColor: '#1a1a15',
    ambientIntensity: 0.4,
    spotIntensity: 1.2,
    envIntensity: 0.8,
  },
  {
    id: 'daylight',
    name: 'Day',
    preset: 'park',
    icon: '☀️',
    bgColor: '#87CEEB',
    fogColor: '#c8dce8',
    fogNear: 20,
    fogFar: 80,
    floorColor: '#2a2a28',
    ambientIntensity: 0.8,
    spotIntensity: 0.8,
    envIntensity: 1.2,
  },
  {
    id: 'sunset',
    name: 'Sunset',
    preset: 'sunset',
    icon: '🌅',
    bgColor: '#1a0f0a',
    fogColor: '#2a1510',
    fogNear: 12,
    fogFar: 55,
    floorColor: '#1a1210',
    ambientIntensity: 0.35,
    spotIntensity: 1.0,
    envIntensity: 1.1,
  },
  {
    id: 'night',
    name: 'Night',
    preset: 'night',
    icon: '🌙',
    bgColor: '#050510',
    fogColor: '#050510',
    fogNear: 8,
    fogFar: 40,
    floorColor: '#0a0a12',
    ambientIntensity: 0.15,
    spotIntensity: 2.0,
    envIntensity: 0.5,
  },
];

// ─── Camera Presets ───
export const CAMERA_POSITIONS = {
  initial: { position: [12, 8, 12], target: [0, 0, 0] },
  front34: { position: [4.5, 2, 4.5], target: [0, 0.5, 0] },
  rear: { position: [-4, 2, -3], target: [0, 0.8, 0] },
  side: { position: [5, 1.5, 0], target: [0, 0.5, 0] },
  top: { position: [0, 7, 0.1], target: [0, 0, 0] },
  interior: { position: [0.3, 1.4, 0.2], target: [0, 1.2, -1] },
  engine: { position: [0, 1.8, 3.5], target: [0, 0.8, 2] },
  wheel: { position: [2.5, 0.5, 2], target: [1.2, 0.3, 1.5] },
};

// ─── Auto-rotate config ───
export const AUTO_ROTATE_DELAY = 5000; // ms before auto-rotate starts
export const AUTO_ROTATE_SPEED = 0.3;

// ─── Model path ───
export const MODEL_PATH = '/models/car.glb';

// ─── Hotspot definitions ───
export const HOTSPOT_DATA = [
  {
    id: 'engine',
    label: 'Engine',
    description: 'High-performance powertrain with advanced engineering',
    position: [0, 1.1, 2.2],
    cameraPosition: CAMERA_POSITIONS.engine,
    icon: '⚡',
  },
  {
    id: 'interior',
    label: 'Interior',
    description: 'Premium cabin with luxury materials and technology',
    position: [0, 1.5, 0],
    cameraPosition: CAMERA_POSITIONS.interior,
    icon: '🪑',
  },
  {
    id: 'wheels',
    label: 'Wheels',
    description: 'Precision-engineered alloy wheels with sport tires',
    position: [1.5, 0.4, 1.5],
    cameraPosition: CAMERA_POSITIONS.wheel,
    icon: '🛞',
  },
  {
    id: 'safety',
    label: 'Safety',
    description: 'Advanced driver assistance and safety systems',
    position: [-1.5, 1.2, 0],
    cameraPosition: { position: [-4, 2, 0], target: [-1, 1, 0] },
    icon: '🛡️',
  },
];

// ─── Utility: lerp for smooth transitions ───
export const lerp = (start, end, factor) => start + (end - start) * factor;

// ─── Utility: format price ───
export const formatPrice = (price) => {
  if (!price) return 'Price on Request';
  return price.toLocaleString();
};
