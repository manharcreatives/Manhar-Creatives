import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, type, color, size }) {
  const ref = useRef();
  const randomOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + randomOffset;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    ref.current.rotation.y = Math.cos(t * 0.2) * 0.5;
    ref.current.position.y += Math.sin(t * 0.5) * 0.0005;
  });

  const geometry = type === 'torus'
    ? <torusGeometry args={[size, size * 0.3, 16, 48]} />
    : type === 'octa'
    ? <octahedronGeometry args={[size, 0]} />
    : <icosahedronGeometry args={[size, 0]} />;

  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.08}
          roughness={0}
          metalness={0.8}
          wireframe={type !== 'sphere'}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function LightBeam({ position, rotation }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.02 + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.01;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[0.5, 12]} />
      <meshBasicMaterial
        color="#22C55E"
        transparent
        opacity={0.03}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ParticleNetwork({ count = 400, mouse }) {
  const meshRef = useRef();
  const linesRef = useRef();
  const glowRef = useRef();
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    const color1 = new THREE.Color('#22C55E');
    const color2 = new THREE.Color('#4ADE80');
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.6;
      positions[i3 + 2] = Math.cos(phi) * radius * 0.5;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      sizes[i] = Math.random() * 2 + 0.5;
      seeds[i] = Math.random() * Math.PI * 2;

      const r = Math.random();
      const c = r < 0.4 ? color1 : r < 0.7 ? color2 : color3;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    return { positions, velocities, sizes, colors, seeds };
  }, [count]);

  const maxConnections = 600;
  const linePositions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
  const lineColors = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);

  const floatingGeo = useMemo(() => {
    const items = [];
    const types = ['torus', 'octa', 'icosa'];
    for (let i = 0; i < 6; i++) {
      const theta = (i / 6) * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      items.push({
        position: [
          Math.cos(theta) * radius,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3 - 1,
        ],
        type: types[Math.floor(Math.random() * types.length)],
        color: i % 2 === 0 ? '#22C55E' : '#4ADE80',
        size: 0.3 + Math.random() * 0.3,
      });
    }
    return items;
  }, []);

  const beams = useMemo(() => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push({
        position: [(i - 1.5) * 3, 0, -3],
        rotation: [0, 0, (i / 4) * Math.PI],
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;
    const mouseX = mouse?.current?.x || 0;
    const mouseY = mouse?.current?.y || 0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = particles.seeds[i];

      const waveX = Math.sin(time * 0.2 + seed) * 0.003;
      const waveY = Math.cos(time * 0.15 + seed * 1.3) * 0.003;
      const waveZ = Math.sin(time * 0.1 + seed * 0.7) * 0.002;

      positions[i3] += particles.velocities[i3] + waveX;
      positions[i3 + 1] += particles.velocities[i3 + 1] + waveY;
      positions[i3 + 2] += particles.velocities[i3 + 2] + waveZ;

      const dx = (mouseX * viewport.width * 0.5) - positions[i3];
      const dy = (mouseY * viewport.height * 0.5) - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        const force = (5 - dist) * 0.002;
        positions[i3] += dx * force;
        positions[i3 + 1] += dy * force;
      }

      const bound = 9;
      if (positions[i3] > bound) positions[i3] = -bound;
      if (positions[i3] < -bound) positions[i3] = bound;
      if (positions[i3 + 1] > bound * 0.6) positions[i3 + 1] = -bound * 0.6;
      if (positions[i3 + 1] < -bound * 0.6) positions[i3 + 1] = bound * 0.6;
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    let lineIndex = 0;
    const threshold = 3;

    for (let i = 0; i < count && lineIndex < maxConnections; i++) {
      for (let j = i + 1; j < count && lineIndex < maxConnections; j++) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < threshold) {
          const li = lineIndex * 6;
          const opacity = 1 - dist / threshold;
          const pulse = 0.6 + Math.sin(time * 0.5 + i * 0.01 + j * 0.01) * 0.4;
          const alpha = opacity * pulse;

          linePositions[li] = positions[i3];
          linePositions[li + 1] = positions[i3 + 1];
          linePositions[li + 2] = positions[i3 + 2];
          linePositions[li + 3] = positions[j3];
          linePositions[li + 4] = positions[j3 + 1];
          linePositions[li + 5] = positions[j3 + 2];

          const c = new THREE.Color('#22C55E');
          lineColors[li] = c.r * alpha;
          lineColors[li + 1] = c.g * alpha;
          lineColors[li + 2] = c.b * alpha;
          lineColors[li + 3] = c.r * alpha;
          lineColors[li + 4] = c.g * alpha;
          lineColors[li + 5] = c.b * alpha;

          lineIndex++;
        }
      }
    }

    for (let i = lineIndex * 6; i < maxConnections * 6; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.03 + Math.sin(time * 0.3) * 0.015;
    }
  });

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={count} array={particles.sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.9}
          size={0.05}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxConnections * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxConnections * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      {floatingGeo.map((g, i) => (
        <FloatingGeometry key={i} position={g.position} type={g.type} color={g.color} size={g.size} />
      ))}

      {beams.map((b, i) => (
        <LightBeam key={i} position={b.position} rotation={b.rotation} />
      ))}

      <mesh ref={glowRef} position={[0, 0, -3]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.04} />
      </mesh>

      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.015} wireframe />
      </mesh>
    </group>
  );
}
