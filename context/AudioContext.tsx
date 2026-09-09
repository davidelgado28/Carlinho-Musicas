"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '@prisma/client';

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  setVolume: (value: number) => void;
  seek: (value: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); 
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const handleTimeUpdate = () => setProgress(audioRef.current?.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);
    const handleEnded = () => playNext(); // Toca a próxima automaticamente

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current?.removeEventListener('ended', handleEnded);
      audioRef.current?.pause();
    };
  }, []);

  const playSong = (song: Song) => {
    if (!audioRef.current) return;
    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateVolume = (value: number) => {
    if (audioRef.current) audioRef.current.volume = value;
    setVolume(value);
  };

  const seek = (value: number) => {
    if (audioRef.current) audioRef.current.currentTime = value;
    setProgress(value);
  };

  const playNext = () => {
    console.log("Próxima música");
  };

  const playPrevious = () => {
    console.log("Música anterior");
  };

  return (
    <AudioContext.Provider value={{
      currentSong, isPlaying, volume, progress, duration,
      playSong, togglePlayPause, setVolume: updateVolume, seek, playNext, playPrevious
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};
