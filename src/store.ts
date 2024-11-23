import create from 'zustand';

interface Artifact {
  id: string;
  name: string;
  description: string;
  power: {
    type: 'energy_boost' | 'time_manipulation' | 'void_control' | 'quantum_sight';
    value: number;
  };
}

interface StoryState {
  currentScene: string;
  loading: boolean;
  choices: string[];
  storyProgress: string[];
  energyLevel: number;
  artifacts: Artifact[];
  activeEffects: string[];
  setScene: (scene: string) => void;
  setLoading: (loading: boolean) => void;
  addChoice: (choice: string) => void;
  addArtifact: (artifact: Artifact) => void;
  modifyEnergy: (amount: number) => void;
  activatePower: (artifactId: string) => void;
  deactivatePower: (artifactId: string) => void;
  reset: () => void;
}

export const useStore = create<StoryState>((set) => ({
  currentScene: 'portal',
  loading: false,
  choices: [],
  storyProgress: [],
  energyLevel: 100,
  artifacts: [],
  activeEffects: [],
  setScene: (scene) => set({ currentScene: scene }),
  setLoading: (loading) => set({ loading }),
  addChoice: (choice) => set((state) => ({
    choices: [...state.choices, choice],
    storyProgress: [...state.storyProgress, choice],
  })),
  addArtifact: (artifact) => set((state) => ({
    artifacts: [...state.artifacts, artifact],
  })),
  modifyEnergy: (amount) => set((state) => ({
    energyLevel: Math.max(0, Math.min(100, state.energyLevel + amount)),
  })),
  activatePower: (artifactId) => set((state) => ({
    activeEffects: [...state.activeEffects, artifactId],
  })),
  deactivatePower: (artifactId) => set((state) => ({
    activeEffects: state.activeEffects.filter(id => id !== artifactId),
  })),
  reset: () => set({
    currentScene: 'portal',
    choices: [],
    storyProgress: [],
    energyLevel: 100,
    artifacts: [],
    activeEffects: [],
  }),
}));