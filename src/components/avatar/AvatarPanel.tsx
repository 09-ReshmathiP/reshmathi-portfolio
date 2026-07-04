import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume, VolumeX, X, Send, Sparkles } from "lucide-react";
import { AvatarFace } from "./AvatarFace";
import { Waveform } from "./Waveform";
import { useSpeech } from "../../hooks/useSpeech";
import { getAvatarAnswer, suggestedPrompts } from "./avatarKnowledge";

interface Message {
  id: string;
  role: "user" | "avatar";
  text: string;
}

const GREETING = `Hi, I'm Reshmathi's AI guide. I can walk you through her background, skills, projects, certifications, and more — just ask, or tap a suggestion below.`;

function uid() {
  return Math.random().toString(36).slice(2);
}

export function AvatarPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const hasGreetedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    speak,
    pause,
    resume,
    toggleMute,
    isSpeaking,
    isPaused,
    isMuted,
    isSupported,
    pulseTick,
  } = useSpeech();

  const currentCaption = messages.length
    ? messages[messages.length - 1].text
    : "";

  function pushMessage(role: Message["role"], text: string) {
    setMessages((prev) => [...prev, { id: uid(), role, text }]);
  }

  function ask(question: string) {
    if (!question.trim()) return;
    pushMessage("user", question);
    const answer = getAvatarAnswer(question);
    // slight delay so the user message renders before the avatar "thinks"
    window.setTimeout(() => {
      pushMessage("avatar", answer);
      speak(answer);
    }, 250);
    setInput("");
  }

  useEffect(() => {
    if (!open || hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    pushMessage("avatar", GREETING);
    speak(GREETING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3" style={{ zIndex: "var(--z-avatar)" }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-strong flex h-[640px] w-[min(92vw,380px)] flex-col overflow-hidden"
            style={{ maxHeight: "min(78vh, 640px)" }}
            role="dialog"
            aria-label="AI guide to Reshmathi's portfolio"
          >
            {/* header */}
            <div
              className="flex items-center gap-3 border-b p-4"
              style={{ borderColor: "var(--color-glass-border)" }}
            >
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <AvatarFace speaking={isSpeaking && !isPaused} pulseTick={pulseTick} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Reshmathi's AI Guide
                </p>
                <p className="font-mono-caps truncate" style={{ fontSize: 11 }}>
                  {isSpeaking ? (isPaused ? "Paused" : "Speaking…") : "Online"}
                </p>
              </div>
              <button
                onClick={isSpeaking ? (isPaused ? resume : pause) : undefined}
                disabled={!isSpeaking}
                aria-label={isPaused ? "Resume speech" : "Pause speech"}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
                style={{ background: "var(--color-glass-fill)" }}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-glass-fill)" }}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume size={14} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close AI guide"
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-glass-fill)" }}
              >
                <X size={14} />
              </button>
            </div>

            {!isSupported && (
              <p
                className="px-4 pt-3 text-xs"
                style={{ color: "var(--color-amber)" }}
              >
                Voice isn't supported in this browser — captions still work below.
              </p>
            )}

            {/* conversation history */}
            <div
              data-lenis-prevent
              ref={scrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-4"
              style={{
                minHeight: 0,
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
              onWheel={(e) => {
  e.preventDefault();
  e.stopPropagation();

  const container = e.currentTarget;

  container.scrollTop += e.deltaY;
}}
              >
                <div className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user" ? "ml-auto" : ""
                      }`}
                      style={{
                        background:
                          m.role === "user"
                            ? "linear-gradient(120deg, var(--color-synapse), var(--color-signal))"
                            : "var(--color-glass-fill)",
                        color:
                          m.role === "user"
                            ? "var(--color-ink)"
                            : "var(--color-text-primary)",
                            border:
                              m.role === "avatar"
                                ? "1px solid var(--color-glass-border)"
                                : "none",
                              }}
                              >
                                {m.text}
                                </div>
                              ))}
                              </div>
                              </div>

            {/* live caption + waveform */}
            <div className="border-t px-4 py-3" style={{ borderColor: "var(--color-glass-border)" }}>
              <Waveform active={isSpeaking && !isPaused} />
              {isSpeaking && (
                <p
                  className="mt-1 line-clamp-2 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {currentCaption}
                </p>
              )}
            </div>

            {/* quick prompts */}
            <div
              className="flex gap-2 overflow-x-auto px-4 pb-3"
              style={{ scrollbarWidth: "none" }}
            >
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => (p === "Download resume" ? downloadResume() : ask(p))}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs"
                  style={{
                    background: "var(--color-glass-fill)",
                    border: "1px solid var(--color-glass-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: "var(--color-glass-border)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Reshmathi…"
                className="min-w-0 flex-1 rounded-full bg-transparent px-3.5 py-2 text-sm outline-none"
                style={{
                  border: "1px solid var(--color-glass-border)",
                  color: "var(--color-text-primary)",
                }}
                aria-label="Ask the AI guide a question"
              />
              <button
                type="submit"
                aria-label="Send question"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
                  color: "var(--color-ink)",
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* collapsed launcher bubble */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Open AI guide to Reshmathi's portfolio"
          className="glass-panel-strong relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full"
        >
          <AvatarFace speaking={false} pulseTick={0} />
          <span
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full"
            style={{ background: "var(--color-signal)", color: "var(--color-ink)" }}
          >
            <Sparkles size={11} />
          </span>
        </motion.button>
      )}
    </div>
  );

  function downloadResume() {
    const a = document.createElement("a");
    a.href = "/documents/Reshmathi_P_Resume.pdf";
    a.download = "Reshmathi_P_Resume.pdf";
    a.click();
    const msg = "I've started the download for Reshmathi's resume — check your downloads folder.";
    pushMessage("user", "Download resume");
    window.setTimeout(() => {
      pushMessage("avatar", msg);
      speak(msg);
    }, 200);
  }
}
