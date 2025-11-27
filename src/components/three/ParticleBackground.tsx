import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Neural network-style particle system
function Particles({ count = 500 }) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  // Generate random positions and connections
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldColor = new THREE.Color('#C9A227');
    const darkGoldColor = new THREE.Color('#9A7B1C');
    const whiteColor = new THREE.Color('#FAFAFA');

    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere-ish distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Mix colors
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.6) {
        color = goldColor;
      } else if (colorChoice < 0.85) {
        color = darkGoldColor;
      } else {
        color = whiteColor;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      light.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
    }
  });

  return (
    <>
      <pointLight ref={light} color="#C9A227" intensity={2} distance={20} />
      <points ref={mesh} geometry={geometry}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

// Connection lines between particles (neural network effect)
function Connections({ count = 50 }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 6); // 2 points per line, 3 coords per point
    
    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 2 + Math.random() * 3;

      const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
      const r2 = 2 + Math.random() * 3;

      positions[i * 6] = r1 * Math.sin(phi1) * Math.cos(theta1);
      positions[i * 6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      positions[i * 6 + 2] = r1 * Math.cos(phi1);

      positions[i * 6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2);
      positions[i * 6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2);
      positions[i * 6 + 5] = r2 * Math.cos(phi2);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#C9A227" transparent opacity={0.15} />
    </lineSegments>
  );
}

// Floating orb in center
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#C9A227"
        emissive="#C9A227"
        emissiveIntensity={0.3}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <Particles count={400} />
        <Connections count={80} />
        <CentralOrb />
      </Canvas>
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-tisa-black/80 via-tisa-black/60 to-tisa-black/90 pointer-events-none" />
    </div>
  );
}
