import { create } from 'zustand';

interface SoundState {
  muted: boolean;
  toggleMute: () => void;
  playCompare: () => void;
  playSwap: () => void;
}

// Shared AudioContext
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Create simple oscillator-based sounds
let lastSoundTime = 0;
const MIN_SOUND_INTERVAL = 100; // Minimum 100ms between sounds to prevent sound overlap

const createSound = (frequency: number) => {
  return () => {
    const now = Date.now();
    if (now - lastSoundTime < MIN_SOUND_INTERVAL) {
      return;
    }
    lastSoundTime = now;

    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };
};

const createCompareSound = () => createSound(440); // A4 note
const createSwapSound = () => createSound(880); // A5 note

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
