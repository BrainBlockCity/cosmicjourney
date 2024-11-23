import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { Sparkles, Moon, Sun, Database, Book, Compass, Zap, ArrowRight, Atom } from 'lucide-react';

const storyContent = {
  portal: {
    text: "At the threshold of infinite possibilities, you stand before the cosmic nexus. Each choice shapes reality itself.",
    choices: ["Enter the Light Path", "Traverse the Shadow Path"],
    icon: Sparkles,
    previews: {
      "Enter the Light Path": "Embrace the radiant path of knowledge and enlightenment. Here, quantum data streams reveal the secrets of creation.",
      "Traverse the Shadow Path": "Venture into the mysterious void where ancient wisdom dwells in darkness. The unknown beckons with infinite possibilities."
    }
  },
  'quantum-realm': {
    text: "You've transcended normal space-time. The quantum realm unfolds before you, a kaleidoscope of infinite possibilities.",
    choices: ["Merge with Quantum Consciousness", "Explore Parallel Dimensions"],
    icon: Atom,
    previews: {
      "Merge with Quantum Consciousness": "Become one with the quantum field itself, gaining unprecedented awareness of reality's fabric.",
      "Explore Parallel Dimensions": "Journey through the multiverse, witnessing countless versions of reality."
    }
  },
  // ... rest of the story content ...
};

// ... rest of the component implementation remains the same ...