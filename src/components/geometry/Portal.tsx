import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';

const Portal: React.FC = () => {
  const portalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group>
      <Torus
        ref={portalRef}
        args={[2, 0.2, 48, 48]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#4299e1"
          emissive="#2b6cb0"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>
    </group>
  );
};

export default Portal;