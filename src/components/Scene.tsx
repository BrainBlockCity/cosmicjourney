import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useStore } from '../store';
import Portal from './geometry/Portal';
import SacredGeometry from './geometry/SacredGeometry';
import Particles from './effects/Particles';
import Environment from './Environment';
import CosmicInterface from './visualizations/CosmicInterface';
import VoidGeometry from './geometry/VoidGeometry';
import PowerEffect from './PowerEffect';

const Scene: React.FC = () => {
  const { currentScene, activeEffects, artifacts } = useStore();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.z += 0.0005;
    }
  });

  const portalSpring = useSpring({
    scale: currentScene === 'portal' ? 1 : 0,
    opacity: currentScene === 'portal' ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const interfaceSpring = useSpring({
    scale: currentScene === 'enter-the-light-path' ? 1 : 0,
    opacity: currentScene === 'enter-the-light-path' ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const voidSpring = useSpring({
    scale: currentScene === 'traverse-the-shadow-path' ? 1 : 0,
    opacity: currentScene === 'traverse-the-shadow-path' ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Portal Scene */}
      <animated.group scale={portalSpring.scale} opacity={portalSpring.opacity}>
        <Portal />
        <SacredGeometry />
      </animated.group>

      {/* Light Path Scene - Cosmic Interface */}
      <animated.group 
        scale={interfaceSpring.scale} 
        opacity={interfaceSpring.opacity}
        position={[0, 0, -5]}
      >
        <CosmicInterface visible={currentScene === 'enter-the-light-path'} />
      </animated.group>

      {/* Shadow Path Scene - Void Geometry */}
      <animated.group 
        scale={voidSpring.scale} 
        opacity={voidSpring.opacity}
        position={[0, 0, -3]}
      >
        <VoidGeometry visible={currentScene === 'traverse-the-shadow-path'} />
      </animated.group>

      {/* Active Power Effects */}
      {activeEffects.map(effectId => {
        const artifact = artifacts.find(a => a.id === effectId);
        if (artifact) {
          return (
            <PowerEffect
              key={effectId}
              type={artifact.power.type}
              position={[
                Math.random() * 4 - 2,
                Math.random() * 4 - 2,
                Math.random() * 4 - 2
              ]}
            />
          );
        }
        return null;
      })}

      {/* Persistent Elements */}
      <Particles />
      <Environment />
    </group>
  );
};

export default Scene;