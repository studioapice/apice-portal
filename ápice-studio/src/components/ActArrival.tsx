/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface ActArrivalProps {
  onNextClick: () => void;
}

export default function ActArrival({ onNextClick }: ActArrivalProps) {
  return (
    <section
      id="inicio"
      className="min-h-screen relative flex flex-col justify-between items-center bg-brand-cream text-brand-charcoal overflow-hidden px-6 pt-32 pb-12"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.22, 0.15],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-brand-green/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.18, 0.1],
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-[100px]"
        />
      </div>

      <div className="w-full" />

      {/* Main Focus */}
      <div className="max-w-4xl mx-auto text-center z-10 my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 text-brand-green text-[10px] tracking-[0.3em] uppercase mb-8 font-mono"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-green" />
          <span>ESTUDIO DE COMUNICACIÓN EDITORIAL</span>
        </motion.div>

        {/* Large Architectural Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="font-serif text-[42px] sm:text-[64px] md:text-[84px] leading-[1.05] tracking-tight text-brand-charcoal font-medium max-w-3xl"
        >
          Donde las marcas encuentran su <span className="font-serif-italic font-normal text-brand-green">ápice.</span>
        </motion.h1>

        {/* Quietly Confident Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-8 text-base md:text-lg max-w-xl text-brand-charcoal/60 leading-relaxed font-light font-sans tracking-wide"
        >
          No diseñamos para impresionar. Diseñamos para que entiendan. Eliminamos la improvisación para construir sistemas de comunicación con identidad propia.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-12"
        >
          <button
            onClick={onNextClick}
            className="group inline-flex items-center space-x-2 border border-brand-charcoal/15 hover:border-brand-charcoal text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 bg-transparent text-brand-charcoal transition-all duration-300"
          >
            <span>Iniciar el Viaje</span>
            <ChevronDown className="w-4 h-4 text-brand-green group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6 }}
        className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-brand-charcoal/40 uppercase z-10"
      >
        <span>SISTEMA DE IDENTIDAD ÁPICE</span>
        <div className="flex items-center space-x-1 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
          <span>RESPIRA Y DESPLAZA</span>
        </div>
        <span>ACTO I — EL RECONOCIMIENTO</span>
      </motion.div>
    </section>
  );
}
