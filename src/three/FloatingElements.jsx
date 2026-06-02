import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating glass-like objects for various sections
export function FloatingCube({ position = [0, 0, 0], size = 0.5, speed = 1, color = '#22C55E' }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    ref.current.rotation.y = Math.cos(t * 0.3) * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
          <lineBasicMaterial color={color} transparent opacity={0.3} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

export function FloatingSphere({ position = [0, 0, 0], size = 0.3, color = '#4ADE80' }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.1}
          roughness={0}
          metalness={1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export function FloatingTorus({ position = [0, 0, 0], size = 0.6, color = '#22C55E' }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[size, size * 0.15, 16, 48]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.12}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export function FloatingOctahedron({ position = [0, 0, 0], size = 0.4, color = '#22C55E' }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={1.5} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.1}
          roughness={0}
          metalness={1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Grid of floating elements for service sections
export function FloatingGrid({ count = 20, spread = 8, baseColor = '#22C55E' }) {
  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.6,
        (Math.random() - 0.5) * 4 - 2,
      ],
      type: ['cube', 'sphere', 'torus', 'octahedron'][Math.floor(Math.random() * 4)],
      size: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.3,
    }));
  }, [count, spread]);

  return (
    <group>
      {elements.map((el, i) => {
        switch (el.type) {
          case 'cube':
            return <FloatingCube key={i} position={el.position} size={el.size} speed={el.speed} color={baseColor} />;
          case 'sphere':
            return <FloatingSphere key={i} position={el.position} size={el.size} color={baseColor} />;
          case 'torus':
            return <FloatingTorus key={i} position={el.position} size={el.size} color={baseColor} />;
          case 'octahedron':
            return <FloatingOctahedron key={i} position={el.position} size={el.size} color={baseColor} />;
          default:
            return null;
        }
      })}
    </group>
  );
}
