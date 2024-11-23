import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Compass, Battery, ScrollText, Star } from 'lucide-react';

const Interface: React.FC = () => {
  const { currentScene, choices, energyLevel, artifacts } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 pointer-events-none"
    >
      <div className="absolute top-4 right-4 flex flex-col items-end space-y-4">
        <motion.div 
          className="bg-blue-900/30 p-2 rounded-lg flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Battery className="w-6 h-6 text-blue-400 mr-2" />
          <div className="h-2 w-24 bg-blue-900/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-400 transition-all duration-500"
              style={{ width: `${energyLevel}%` }}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-blue-900/30 p-2 rounded-lg flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <ScrollText className="w-6 h-6 text-blue-400 mr-2" />
          <span className="text-blue-400">{choices.length} Choices Made</span>
        </motion.div>

        <motion.div 
          className="bg-blue-900/30 p-2 rounded-lg flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Star className="w-6 h-6 text-blue-400 mr-2" />
          <span className="text-blue-400">{artifacts.length} Artifacts</span>
        </motion.div>

        <motion.div 
          className="bg-blue-900/30 p-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Compass className="w-6 h-6 text-blue-400" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {choices.map((choice, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="w-3 h-3 rounded-full bg-blue-400"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Interface;