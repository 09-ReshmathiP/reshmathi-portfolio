import { useEffect, useState } from "react";

interface TypewriterOptions {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

export function useTypewriter({
  words,
  typingSpeedMs = 55,
  deletingSpeedMs = 30,
  pauseMs = 1600,
}: TypewriterOptions) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setText(words[0] ?? "");
      return;
    }

    const currentWord = words[wordIndex % words.length];
    let timeout: number;

    if (!deleting && text.length < currentWord.length) {
      timeout = window.setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        typingSpeedMs
      );
    } else if (!deleting && text.length === currentWord.length) {
      timeout = window.setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text.length > 0) {
      timeout = window.setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        deletingSpeedMs
      );
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseMs]);

  return text;
}
