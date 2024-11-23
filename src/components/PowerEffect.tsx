import React from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PowerEffectProps {
  type: 'energy_boost' | 'time_manipulation' | 'void_control' | 'quantum_sight';
  position: [number, number, number];
}

const PowerEffect: React.FC<PowerEffectProps> = ({ type, position }) => {
  const particlesRef = React.useRef<THREE.Points>(null);
  const geometryRef = React.useRef<THREE.BufferGeometry>(null);

  const particles = React.useMemo(() => {
    const temp = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2;
      temp.push(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        (Math.random() - 0.5) * 2
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current && geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const theta = state.clock.elapsedTime + i;
        const radius = 1 + Math.sin(theta * 0.5) * 0.5;
        positions[i] = Math.cos(theta) * radius;
        positions[i + 1] = Math.sin(theta) * radius;
        positions[i + 2] += Math.sin(theta * 0.2) * 0.01;
      }
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  const getColor = () => {
    switch (type) {
      case 'energy_boost':
        return '#4ade80';
      case 'time_manipulation':
        return '#818cf8';
      case 'void_control':
        return '#c084fc';
      case 'quantum_sight':
        return '#38bdf8';
      default:
        return '#ffffff';
    }
  };

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={getColor()}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default PowerEffect;