import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ArtifactCollectedProps {
  name: string;
  description: string;
  show: boolean;
  onClose: () => void;
}

const ArtifactCollected: React.FC<ArtifactCollectedProps> = ({
  name,
  description,
  show,
  onClose
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-blue-900/80 p-6 rounded-lg backdrop-blur-sm border border-blue-400/30 max-w-md">
            <div className="flex items-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl text-blue-200 font-semibold">{name}</h2>
            </div>
            <p className="text-blue-300 mb-4">{description}</p>
            <motion.div
              className="w-full h-1 bg-blue-400/30 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3 }}
              onAnimationComplete={onClose}
            >
              <div className="h-full w-full bg-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtifactCollected;