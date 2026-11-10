"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cx } from "@/utils/cx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -32px 0px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={cx(className)}
    >
      {children}
    </motion.div>
  );
}
