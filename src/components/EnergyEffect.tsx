import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface EnergyEffectProps {
  amount: number;
  show: boolean;
  onComplete: () => void;
}

const EnergyEffect: React.FC<EnergyEffectProps> = ({ amount, show, onComplete }) => {
  const isPositive = amount > 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: isPositive ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isPositive ? -20 : 20 }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
        >
          <motion.div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            <Zap className={`w-5 h-5 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-lg font-semibold ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {isPositive ? '+' : ''}{amount} Energy
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnergyEffect;