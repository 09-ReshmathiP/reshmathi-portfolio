import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  toggleMute: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isMuted: boolean;
  isSupported: boolean;
  /** Increments on each word boundary while speaking — drive mouth/waveform pulses off this. */
  pulseTick: number;
}

/**
 * Wraps window.speechSynthesis. This is the free, zero-signup voice engine
 * (per the phase decision). Swapping in ElevenLabs/Azure/OpenAI TTS later
 * only requires replacing the body of `speak` — the public interface here
 * (speak/pause/resume/stop/isSpeaking/pulseTick) stays the same, so the
 * AvatarPanel UI never has to change.
 */
export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [pulseTick, setPulseTick] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mutedRef = useRef(false);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) return;
      window.speechSynthesis.cancel();

      if (mutedRef.current) {
        // Still simulate the speaking lifecycle (for captions/waveform)
        // without producing audio, by using a silent utterance volume.
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1.03;
      utterance.volume = mutedRef.current ? 0 : 1;

      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) => /female/i.test(v.name) || /Samantha|Google US English|Zira/i.test(v.name)
      );
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onboundary = () => {
        setPulseTick((t) => t + 1);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported]
  );

  const pause = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (utteranceRef.current) {
        // volume can't be changed mid-utterance in most browsers,
        // so muting takes effect from the next spoken line.
      }
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  return {
    speak,
    pause,
    resume,
    stop,
    toggleMute,
    isSpeaking,
    isPaused,
    isMuted,
    isSupported,
    pulseTick,
  };
}
