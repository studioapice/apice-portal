/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { frustrationsData } from '../data';
import { ArrowRight, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function ActMirror() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="revelacion"
      className="min-h-screen py-24 md:py-32 bg-brand-cream border-t border-brand-beige flex flex-col justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-6xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left column: Context & Concept */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="inline-flex items-center space-x-2 text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            <span>ACTO II — EL ESPEJO</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-[44px] leading-[1.15] text-brand-charcoal font-medium">
            La verdad antes de la <span className="font-serif-italic font-normal text-brand-green">comunicación.</span>
          </h2>
          
          <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-light">
            Antes de pensar en qué publicar hoy, debemos entender dónde duele la marca. Gran parte de la frustración empresarial no proviene del negocio en sí, sino de la brecha entre quién eres y cómo te presentas al mundo.
          </p>

          <p className="text-xs font-mono uppercase tracking-[0.15em] text-brand-charcoal/40">
            * Selecciona la afirmación con la que te sientas identificado para revelar su causa estructural.
          </p>
        </div>

        {/* Right column: Interactive Frustrations Selector */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {frustrationsData.map((frust, index) => {
            const isSelected = selectedId === frust.id;
            return (
              <div
                key={frust.id}
                className={`border p-6 md:p-8 cursor-pointer transition-all duration-500 rounded-none relative overflow-hidden ${
                  isSelected
                    ? 'border-brand-green bg-brand-cream shadow-sm pl-8 md:pl-10'
                    : 'border-brand-charcoal/10 hover:border-brand-charcoal/30 bg-transparent'
                }`}
                onClick={() => setSelectedId(isSelected ? null : frust.id)}
              >
                {/* Accent line for selected */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green" />
                )}

                <div className="flex justify-between items-start space-x-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-brand-green tracking-wider uppercase block mb-2">
                      SÍNTOMA 0{index + 1}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-brand-charcoal font-medium leading-relaxed">
                      {frust.text}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-brand-green bg-brand-green text-brand-cream'
                          : 'border-brand-charcoal/20'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>
                </div>

                {/* Animated description disclosure */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-brand-green/10 flex flex-col space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-green font-semibold">
                          CAUSA ESTRUCTURAL:
                        </span>
                        <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-light font-sans bg-brand-green/5 p-4 border-l-2 border-brand-green">
                          {frust.impact}
                        </p>
                        <p className="text-xs text-brand-green font-serif-italic pt-1">
                          No necesitas más ideas de publicación. Necesitas un sistema editorial con pilares fijos.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
