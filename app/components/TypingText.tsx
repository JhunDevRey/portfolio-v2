"use client";

import { useEffect, useState } from "react";

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 300;

export function TypingText({ words }: { words: readonly string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPING_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETING_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIndex, words]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-400 bg-clip-text text-transparent">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[2px] animate-caret-blink bg-red-500"
      />
    </span>
  );
}
