/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { systemNodesData } from '../data';
import { Network, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function ActSystem() {
  const [activeNodeId, setActiveNodeId] = useState<string>('sys-strat');

  const activeNode = systemNodesData.find((n) => n.id === activeNodeId) || systemNodesData[0];

  return (
    <section
      id="sistema"
      className="min-h-screen py-24 md:py-32 bg-brand-charcoal text-brand-cream relative overflow-hidden px-6"
    >
      <div className="max-w-6xl mx-auto w-full z-10 flex flex-col justify-center h-full space-y-16">
        
        {/* Title / Intro */}
        <div className="flex flex-col space-y-4 max-w-3xl">
          <span className="text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            ACTO V — EL SISTEMA ÁPICE
          </span>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight font-medium">
            El sistema operativo de tu <span className="font-serif-italic font-normal text-brand-green">comunicación.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-cream/60 leading-relaxed font-light">
            No vendemos publicaciones sueltas ni videos virales temporales. Implementamos una infraestructura editorial completa que estructura tu pensamiento y automatiza tu relevancia en el mercado.
          </p>
        </div>

        {/* System Timeline / Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Timeline Nodes Selector (Left column) */}
          <div className="lg:col-span-5 flex flex-col space-y-3 relative">
            {/* Connecting Vertical line behind nodes */}
            <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-brand-cream/10 z-0" />

            {systemNodesData.map((node) => {
              const isActive = node.id === activeNodeId;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`flex items-center space-x-6 py-4 px-5 text-left transition-all duration-300 z-10 rounded-none relative ${
                    isActive
                      ? 'bg-white/[0.03] border-l-2 border-brand-green shadow-sm pl-7'
                      : 'bg-transparent hover:bg-white/[0.01] border-l border-white/10'
                  }`}
                >
                  {/* Circle Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono transition-all ${
                      isActive
                        ? 'border-brand-green bg-brand-green text-brand-cream font-bold'
                        : 'border-brand-cream/20 bg-brand-charcoal text-brand-cream/60'
                    }`}
                  >
                    {node.title.substring(0, 2)}
                  </div>
                  
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-green block mb-0.5">
                      {node.subtitle}
                    </span>
                    <h3 className="font-serif text-base md:text-lg font-medium tracking-wide">
                      {node.title.substring(4)}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Panel (Right column) */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-8 md:p-12 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 flex flex-col h-full justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-brand-green font-mono text-xs uppercase tracking-widest">
                    <Network className="w-4 h-4" />
                    <span>FASE DE IMPLEMENTACIÓN</span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-cream">
                    {activeNode.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-brand-cream/70 leading-relaxed font-light font-sans">
                    {activeNode.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-green block font-semibold">
                    ENTREGABLES & PROCESOS CLAVE:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeNode.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-3 text-xs text-brand-cream/80">
                        <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="font-light">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
