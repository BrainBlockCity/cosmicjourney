import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { Shield, Clock, Box, Eye } from 'lucide-react';

const ArtifactInventory: React.FC = () => {
  const { artifacts, activeEffects, activatePower, deactivatePower } = useStore();

  const getPowerIcon = (type: string) => {
    switch (type) {
      case 'energy_boost':
        return Shield;
      case 'time_manipulation':
        return Clock;
      case 'void_control':
        return Box;
      case 'quantum_sight':
        return Eye;
      default:
        return Shield;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 space-y-4"
    >
      <AnimatePresence>
        {artifacts.map((artifact) => {
          const Icon = getPowerIcon(artifact.power.type);
          const isActive = activeEffects.includes(artifact.id);

          return (
            <motion.button
              key={artifact.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => isActive ? deactivatePower(artifact.id) : activatePower(artifact.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center
                ${isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-blue-900/30'}
                transition-all duration-300`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-400'}`} />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute right-full mr-4 bg-blue-900/80 p-3 rounded-lg w-48"
              >
                <h3 className="text-blue-200 font-semibold mb-1">{artifact.name}</h3>
                <p className="text-blue-300 text-sm">{artifact.description}</p>
              </motion.div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArtifactInventory;