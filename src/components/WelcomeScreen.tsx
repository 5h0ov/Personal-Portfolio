"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const lines = [
  { command: true, text: "whoami", delay: 400 },
  { command: false, text: "Shuvadipta Das", delay: 200 },
  { command: true, text: "cat role.txt", delay: 600 },
  { command: false, text: "Full Stack Developer", delay: 200 },
  { command: true, text: "ls ./skills", delay: 500 },
  {
    command: false,
    text: "Next.js  TypeScript  React  Node.js  DevOps  +More!",
    delay: 150,
  },
  { command: true, text: "cat status.txt", delay: 500 },
  { command: false, text: "Open to Work: Yes", delay: 200 },
  { command: true, text: "./launch-portfolio.sh", delay: 600 },
  { command: false, text: "Loading portfolio...", delay: 300 },
];

function useTypewriter(text: string, speed: number, start: boolean) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) {
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return displayed;
}

const TerminalLine = ({
  line,
  isActive,
  onDone,
}: {
  line: (typeof lines)[0];
  isActive: boolean;
  onDone: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const displayed = useTypewriter(line.text, line.command ? 50 : 25, visible);

  useEffect(() => {
    if (!isActive) {
      return;
    }
    const t = setTimeout(() => setVisible(true), line.delay);
    return () => clearTimeout(t);
  }, [isActive, line.delay]);

  useEffect(() => {
    if (visible && displayed === line.text && !typingDone) {
      setTypingDone(true);
      onDone();
    }
  }, [displayed, line.text, typingDone, visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-start gap-2 text-sm leading-relaxed md:text-base"
        >
          {line.command && (
            <span className="shrink-0 select-none font-bold text-accent">
              $
            </span>
          )}
          <span
            className={
              line.command
                ? "font-mono text-foreground"
                : "font-mono text-muted-foreground"
            }
          >
            {displayed}
            {displayed === line.text ? (
              ""
            ) : (
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent" />
            )}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const WelcomeScreen = ({ onDone }: { onDone: () => void }) => {
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  const skip = useCallback(() => {
    if (skipping) {
      return;
    }
    setSkipping(true);
    setDone(true);
    onDone();
  }, [onDone, skipping]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [activeLine]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [skip]);

  const handleLineDone = () => {
    if (activeLine < lines.length - 1) {
      setActiveLine((prev) => prev + 1);
    } else {
      setDone(true);
      onDone();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.4 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-2xl"
      >
        {/* macOS window chrome */}
        <div className="flex items-center gap-2 rounded-t-xl border-b border-neutral-300 bg-neutral-200 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
          <button
            type="button"
            onClick={skip}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] transition-all hover:brightness-90"
            aria-label="Skip animation"
          >
            <svg
              className="h-1.5 w-1.5 opacity-0 transition-opacity group-hover:opacity-100"
              viewBox="0 0 6 6"
            >
              <title>Skip</title>
              <path d="M0 0L6 6M6 0L0 6" stroke="black" strokeWidth="1.5" />
            </svg>
          </button>
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            shoob@portfolio
          </span>
          <button
            type="button"
            onClick={skip}
            className="ml-auto font-mono text-[10px] text-neutral-400 transition-colors hover:text-accent"
          >
            skip ?
          </button>
        </div>

        {/* Terminal body */}
        <div
          ref={termRef}
          className="min-h-[280px] max-h-[50vh] overflow-y-auto rounded-b-xl border border-t-0 border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-700 dark:bg-neutral-900"
        >
          {lines.map((line, i) => (
            <TerminalLine
              key={i}
              line={line}
              isActive={i <= activeLine}
              onDone={i === activeLine ? handleLineDone : () => undefined}
            />
          ))}

          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center gap-2 font-mono text-sm"
            >
              <span className="select-none font-bold text-accent">$</span>
              <span className="inline-block h-4 w-2 animate-blink bg-accent" />
            </motion.div>
          )}
        </div>

        {/* Progress bar */}
        <motion.div
          className="mt-2 h-0.5 overflow-hidden rounded-full bg-accent/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: "0%" }}
            animate={{
              width: done ? "100%" : `${(activeLine / lines.length) * 100}%`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        <p className="mt-2 text-center font-mono text-[10px] text-neutral-400">
          press esc to skip
        </p>
      </motion.div>
    </div>
  );
};
