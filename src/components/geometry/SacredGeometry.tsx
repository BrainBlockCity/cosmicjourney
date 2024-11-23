import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SacredGeometry: React.FC = () => {
  const geometryRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (geometryRef.current) {
      geometryRef.current.rotation.y += 0.002;
      geometryRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={geometryRef}>
      {/* Flower of Life pattern */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 3) * 1.5,
            Math.sin((i * Math.PI) / 3) * 1.5,
            0,
          ]}
        >
          <circleGeometry args={[1, 32]} />
          <meshBasicMaterial
            color="#4299e1"
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

export default SacredGeometry;