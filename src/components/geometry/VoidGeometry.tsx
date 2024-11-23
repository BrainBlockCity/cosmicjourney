import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoidGeometryProps {
  visible: boolean;
}

const VoidGeometry: React.FC<VoidGeometryProps> = ({ visible }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = {
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float a = atan(p.y, p.x);
        float r = length(p);
        float v = sin(50.0 * (sqrt(r) - 0.5 * time));
        gl_FragColor = vec4(vec3(0.1, 0.3, 0.5) * (1.0 - r) * v, 1.0);
      }
    `
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.001;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Void Portal */}
      <mesh>
        <planeGeometry args={[4, 4, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={shader.vertexShader}
          fragmentShader={shader.fragmentShader}
          uniforms={{
            time: { value: 0 }
          }}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Surrounding Geometry */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 4) * 3,
            Math.sin((i * Math.PI) / 4) * 3,
            0
          ]}
          rotation={[0, 0, (i * Math.PI) / 4]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#1a365d"
            emissive="#4299e1"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default VoidGeometry;