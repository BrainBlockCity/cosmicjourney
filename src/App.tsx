import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Loader } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store';
import Scene from './components/Scene';
import Interface from './components/Interface';
import StoryText from './components/StoryText';
import ArtifactInventory from './components/ArtifactInventory';

function App() {
  const { loading } = useStore();

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
          >
            <div className="text-blue-400 text-2xl">
              <Loader />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Interface />
      <StoryText />
      <ArtifactInventory />
    </div>
  );
}

export default App;