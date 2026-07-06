/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pillarsData } from '../data';
import { Shield, Sparkles, BookOpen, Layers, Fingerprint } from 'lucide-react';

export default function ActIdentity() {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('pillar-voice');

  const getIcon = (id: string) => {
    switch (id) {
      case 'pillar-voice':
        return <Sparkles className="w-5 h-5" />;
      case 'pillar-vision':
        return <Layers className="w-5 h-5" />;
      case 'pillar-pos':
        return <Shield className="w-5 h-5" />;
      case 'pillar-narrative':
        return <BookOpen className="w-5 h-5" />;
      case 'pillar-diff':
        return <Fingerprint className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const selectedPillar = pillarsData.find((p) => p.id === selectedPillarId) || pillarsData[0];

  return (
    <section
      id="identidad"
      className="min-h-screen py-24 md:py-32 bg-brand-cream border-t border-brand-beige flex flex-col justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-6xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Editorial context */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="inline-flex items-center space-x-2 text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            <span>ACTO IV — IDENTIDAD ANTES DE CONTENIDO</span>
          </div>

          <h2 className="font-serif text-3xl md:text-[44px] leading-[1.15] text-brand-charcoal font-medium">
            Construir los muros de la <span className="font-serif-italic font-normal text-brand-green">autoridad.</span>
          </h2>

          <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-light">
            Tu identidad de marca no es un logotipo. Es el sistema intelectual que sostiene cada palabra que pronuncias. Unificamos estos cinco pilares para eliminar la duda de tu comunicación.
          </p>

          {/* Quick selection tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {pillarsData.map((pillar) => {
              const active = pillar.id === selectedPillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? 'bg-brand-green text-brand-cream border border-brand-green'
                      : 'bg-brand-cream text-brand-charcoal/60 border border-brand-charcoal/10 hover:border-brand-charcoal/30'
                  }`}
                >
                  {getIcon(pillar.id)}
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Structural pillar representation */}
        <div className="lg:col-span-7 bg-brand-cream border border-brand-beige p-8 md:p-12 relative flex flex-col justify-between h-[450px] shadow-sm overflow-hidden">
          
          {/* Visual assembly backdrop decoration */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-brand-beige/20 pointer-events-none flex items-center justify-center">
            <span className="text-[200px] text-brand-beige font-serif-italic select-none opacity-40">
              {selectedPillar.title.substring(0, 1)}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPillar.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 z-10 flex flex-col h-full justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-brand-green">
                  {getIcon(selectedPillar.id)}
                  <span className="text-xs font-mono uppercase tracking-[0.2em]">{selectedPillar.concept}</span>
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-medium">
                  {selectedPillar.title}
                </h3>
                
                <p className="text-sm md:text-base text-brand-charcoal/70 leading-relaxed font-light font-sans max-w-xl">
                  {selectedPillar.description}
                </p>
              </div>

              {/* Metaphor label */}
              <div className="pt-6 border-t border-brand-charcoal/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-green font-semibold block mb-1">
                  METÁFORA VISUAL:
                </span>
                <p className="text-xs text-brand-charcoal/60 font-serif-italic font-light">
                  {selectedPillar.visualMetaphor}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
