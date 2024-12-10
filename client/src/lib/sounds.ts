import { create } from 'zustand';

interface SoundState {
  muted: boolean;
  toggleMute: () => void;
  playCompare: () => void;
  playSwap: () => void;
}

// Create simple oscillator-based sounds
const createCompareSound = () => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 440; // A4 note
  gainNode.gain.value = 0;
  
  oscillator.start();
  
  return () => {
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  };
};

const createSwapSound = () => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 880; // A5 note
  gainNode.gain.value = 0;
  
  oscillator.start();
  
  return () => {
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  };
};

let compareSound: (() => void) | null = null;
let swapSound: (() => void) | null = null;

export const useSoundStore = create<SoundState>((set) => ({
  muted: false,
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  playCompare: () => {
    const state = useSoundStore.getState();
    if (state.muted) return;
    
    if (!compareSound) {
      compareSound = createCompareSound();
    }
    compareSound();
  },
  playSwap: () => {
    const state = useSoundStore.getState();
    if (state.muted) return;
    
    if (!swapSound) {
      swapSound = createSwapSound();
    }
    swapSound();
  },
}));
