import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

interface PortalPoint {
  id: string;
  position: THREE.Vector3;
  destination: string;
  name: string;
  description: string;
}

const CosmicInterface: React.FC<{ visible: boolean }> = ({ visible }) => {
  const groupRef = useRef<THREE.Group>(null);
  const vortexRef = useRef<THREE.Mesh>(null);
  const titleRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPortalActive, setIsPortalActive] = useState(false);
  const [activePortal, setActivePortal] = useState<string | null>(null);
  
  const { setScene } = useStore();
  const { playSound } = useAudio();

  // Create portal points for different dimensions
  const portalPoints = useMemo<PortalPoint[]>(() => {
    const points = [];
    const numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const radius = 4;
      points.push({
        id: `portal-${i}`,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ),
        destination: [
          'quantum-realm',
          'crystal-dimension',
          'void-nexus',
          'time-spiral',
          'energy-matrix',
          'cosmic-library',
          'astral-plane',
          'dream-sphere'
        ][i],
        name: [
          'Quantum Realm',
          'Crystal Dimension',
          'Void Nexus',
          'Time Spiral',
          'Energy Matrix',
          'Cosmic Library',
          'Astral Plane',
          'Dream Sphere'
        ][i],
        description: [
          'Enter the quantum probability field',
          'Explore crystalline consciousness',
          'Traverse the infinite void',
          'Journey through temporal streams',
          'Harness pure energy forms',
          'Access universal knowledge',
          'Experience astral projection',
          'Navigate dream realities'
        ][i]
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    time.current += 0.01;
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0005;
    }
    if (vortexRef.current) {
      vortexRef.current.rotation.z += 0.01;
      vortexRef.current.scale.x = 1 + Math.sin(time.current) * 0.1;
      vortexRef.current.scale.y = 1 + Math.sin(time.current) * 0.1;
    }
    if (titleRef.current) {
      if (isHovered) {
        titleRef.current.scale.x = THREE.MathUtils.lerp(titleRef.current.scale.x, 1.2, 0.1);
        titleRef.current.scale.y = THREE.MathUtils.lerp(titleRef.current.scale.y, 1.2, 0.1);
      } else {
        titleRef.current.scale.x = THREE.MathUtils.lerp(titleRef.current.scale.x, 1, 0.1);
        titleRef.current.scale.y = THREE.MathUtils.lerp(titleRef.current.scale.y, 1, 0.1);
      }
    }
  });

  const handlePortalClick = (portalId: string) => {
    const portal = portalPoints.find(p => p.id === portalId);
    if (portal && !isPortalActive) {
      setIsPortalActive(true);
      setActivePortal(portalId);
      playSound('energy');
      
      setTimeout(() => {
        setScene(portal.destination);
        setIsPortalActive(false);
        setActivePortal(null);
      }, 2000);
    }
  };

  const handleTitleClick = () => {
    if (!isPortalActive) {
      setIsPortalActive(true);
      playSound('energy');
      
      setTimeout(() => {
        setScene('quantum-realm');
        setIsPortalActive(false);
      }, 2000);
    }
  };

  return (
    <group ref={groupRef} visible={visible}>
      {/* Central Vortex */}
      <mesh ref={vortexRef} position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.4, 32, 100]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ff8c00"
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Portal Effect */}
      {isPortalActive && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[3, 0.5, 32, 100]} />
          <meshStandardMaterial
            color="#4ade80"
            emissive="#2563eb"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      )}

      {/* Interactive Portal Points */}
      {portalPoints.map((portal) => (
        <group key={portal.id} position={portal.position.toArray()}>
          <mesh
            onClick={() => handlePortalClick(portal.id)}
            onPointerEnter={() => setHoveredPoint(portal.id)}
            onPointerLeave={() => setHoveredPoint(null)}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={activePortal === portal.id ? '#4ade80' : '#4299e1'}
              emissive={activePortal === portal.id ? '#2563eb' : '#1e40af'}
              emissiveIntensity={hoveredPoint === portal.id ? 2 : 1}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {hoveredPoint === portal.id && (
            <group position={[0, 0.5, 0]}>
              <Text
                position={[0, 0.3, 0]}
                fontSize={0.2}
                color="#fff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#1e3a8a"
              >
                {portal.name}
              </Text>
              <Text
                position={[0, 0, 0]}
                fontSize={0.15}
                color="#93c5fd"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="#1e3a8a"
              >
                {portal.description}
              </Text>
            </group>
          )}
        </group>
      ))}

      {/* Interactive Title */}
      <group
        ref={titleRef}
        onClick={handleTitleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        position={[0, 3, 0]}
      >
        <Text
          fontSize={0.5}
          color={isHovered ? '#60a5fa' : '#fff'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1e3a8a"
        >
          CHOOSE YOUR STORY
        </Text>
        {isHovered && (
          <mesh position={[0, -0.4, 0]}>
            <planeGeometry args={[3, 0.1]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default CosmicInterface;