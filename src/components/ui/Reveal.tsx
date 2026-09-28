"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CINEMA: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
  duration?: number;
}

/** Fade/rise on entering the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  blur = false,
  once = true,
  amount = 0.25,
  duration = 0.9,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface BuildProps extends Omit<HTMLMotionProps<"div">, "children"> {
  show: boolean;
  children: ReactNode;
  y?: number;
  delay?: number;
  blur?: boolean;
}

/** Visibility driven by a scene build step (keynote-style). */
export function Build({ show, children, y = 16, delay = 0, blur = false, ...rest }: BuildProps) {
  return (
    <motion.div
      initial={false}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }
      }
      transition={{ duration: show ? 0.8 : 0.35, delay: show ? delay : 0, ease: EASE_OUT }}
      aria-hidden={!show}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
