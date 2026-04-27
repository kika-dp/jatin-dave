"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 18, mass: 0.4 });
  const ringScale = useSpring(1, { stiffness: 250, damping: 20 });

  useEffect(() => {
    const isPointerDevice = window.matchMedia("(pointer: fine)").matches;
    setIsMounted(isPointerDevice);
    if (!isPointerDevice) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const onEnterInteractive = () => {
      setIsPointer(true);
      ringScale.set(2.2);
    };

    const onLeaveInteractive = () => {
      setIsPointer(false);
      ringScale.set(1);
    };

    const onLeaveWindow = () => setIsVisible(false);
    const onEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    const addListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor='pointer'], input, textarea, select, label")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
    };

    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      observer.disconnect();
    };
  }, [mouseX, mouseY, ringScale, isVisible]);

  if (!isMounted) return null;

  return (
    <>
      {/* Dot — exact position, no spring */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          transform: "translate(-200px, -200px) translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isPointer
              ? "w-2 h-2 bg-emerald-300"
              : "w-[6px] h-[6px] bg-emerald-400"
          }`}
        />
      </div>

      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border will-change-transform"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          width: 36,
          height: 36,
          borderColor: isPointer
            ? "rgba(16, 185, 129, 0.7)"
            : "rgba(16, 185, 129, 0.35)",
          opacity: isVisible ? 1 : 0,
          mixBlendMode: "normal",
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </>
  );
}
