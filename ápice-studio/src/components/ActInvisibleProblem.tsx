/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, HelpCircle, Activity, ShieldAlert, CheckCircle } from 'lucide-react';

export default function ActInvisibleProblem() {
  const [activeTab, setActiveTab] = useState<'improvisation' | 'system'>('improvisation');

  return (
    <section
      id="problema-invisible"
      className="min-h-screen py-24 md:py-32 bg-brand-charcoal text-brand-cream relative overflow-hidden px-6"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 flex flex-col justify-center h-full space-y-12">
        
        {/* Header and Storytelling */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            ACTO III — EL PROBLEMA INVISIBLE
          </span>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight font-medium">
            El error de resolver los <span className="font-serif-italic font-normal text-brand-green">síntomas.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-cream/60 leading-relaxed font-light">
            La mayoría cree que su problema es "el algoritmo", "Instagram" o la "falta de tiempo". Pero publicar contenido sin un cimiento de identidad es como intentar decorar una casa sin haber levantado los muros.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white/5 p-1 rounded-none border border-white/10">
            <button
              onClick={() => setActiveTab('improvisation')}
              className={`px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                activeTab === 'improvisation'
                  ? 'bg-brand-green text-brand-cream'
                  : 'text-brand-cream/60 hover:text-brand-cream'
              }`}
            >
              La Improvisación (Caos)
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                activeTab === 'system'
                  ? 'bg-brand-green text-brand-cream'
                  : 'text-brand-cream/60 hover:text-brand-cream'
              }`}
            >
              El Sistema Ápice (Orden)
            </button>
          </div>
        </div>

        {/* Interactive Visualization Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.02] border border-white/10 p-8 md:p-12 relative">
          
          {/* Info Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-green">
              {activeTab === 'improvisation' ? 'MODELO TRADICIONAL' : 'FILOSOFÍA ÁPICE'}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-medium">
              {activeTab === 'improvisation'
                ? 'El bucle de la producción reactiva.'
                : 'La pirámide del pensamiento estructurado.'}
            </h3>
            
            <p className="text-xs md:text-sm text-brand-cream/70 leading-relaxed font-light font-sans">
              {activeTab === 'improvisation'
                ? 'Se crea contenido para alimentar el canal hoy. No hay un núcleo, no hay una voz, no hay procesos definidos. El resultado es cansancio físico, inconsistencia visual e irrelevancia comercial.'
                : 'El contenido nunca es el punto de partida. Es la consecuencia natural de un sistema que destila tu propósito, establece tu voz máster y planifica cada paso antes de filmar.'}
            </p>

            <ul className="space-y-3 pt-4 border-t border-white/10">
              {activeTab === 'improvisation' ? (
                <>
                  <li className="flex items-start space-x-3 text-xs text-red-300">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Estilo visual genérico copiado de tendencias de moda.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs text-red-300">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Dependencia absoluta del estado de ánimo del fundador.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs text-red-300">
                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Atracción de prospectos de baja calidad que buscan precios bajos.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start space-x-3 text-xs text-brand-green">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Identidad de marca atemporal y sobria inspirada en el diseño suizo.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs text-brand-green">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Previsibilidad editorial: 30 días organizados de forma anticipada.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs text-brand-green">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Atracción de clientes premium listos para pagar por tu metodología.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Graphical Map Panel */}
          <div className="lg:col-span-7 h-[300px] md:h-[400px] w-full relative flex items-center justify-center border border-white/5 bg-black/10 overflow-hidden">
            {activeTab === 'improvisation' ? (
              // Chaos visualization
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full h-full relative">
                  {/* Scattered Floating Nodes */}
                  <motion.div
                    animate={{
                      x: [0, 20, -10, 0],
                      y: [0, -30, 20, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[10%] left-[15%] bg-red-950/40 border border-red-500/40 px-4 py-2 text-xs font-mono rounded-none text-red-300 shadow-sm"
                  >
                    ¿Qué publico hoy?
                  </motion.div>
                  <motion.div
                    animate={{
                      x: [0, -15, 25, 0],
                      y: [0, 20, -25, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[45%] left-[5%] bg-red-950/40 border border-red-500/40 px-4 py-2 text-xs font-mono rounded-none text-red-300"
                  >
                    Bailar en Reels
                  </motion.div>
                  <motion.div
                    animate={{
                      x: [0, 30, -20, 0],
                      y: [0, -10, 15, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-[15%] left-[25%] bg-red-950/40 border border-red-500/40 px-4 py-2 text-xs font-mono rounded-none text-red-300"
                  >
                    Seguir tendencias
                  </motion.div>
                  <motion.div
                    animate={{
                      x: [0, -20, 10, 0],
                      y: [0, 30, -15, 0],
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[20%] right-[15%] bg-red-950/40 border border-red-500/40 px-4 py-2 text-xs font-mono rounded-none text-red-300"
                  >
                    Copiar competidores
                  </motion.div>
                  <motion.div
                    animate={{
                      x: [0, 15, -15, 0],
                      y: [0, -20, 30, 0],
                    }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-[25%] right-[20%] bg-red-950/40 border border-red-500/40 px-4 py-2 text-xs font-mono rounded-none text-red-300"
                  >
                    Ansiedad de métricas
                  </motion.div>

                  {/* Centered target symbol */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <Activity className="w-12 h-12 text-red-400 opacity-60 animate-pulse mb-2" />
                    <span className="text-[10px] font-mono text-red-400 tracking-wider">CAOS EN REDES</span>
                  </div>
                </div>
              </div>
            ) : (
              // Systematic layout visualization
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 space-y-4">
                <span className="text-[9px] font-mono tracking-widest text-brand-green mb-2">ARQUITECTURA ÁPICE</span>
                
                {/* Pyramid stack layers */}
                <motion.div
                  initial={{ width: '40%', opacity: 0, y: 15 }}
                  animate={{ width: '80%', opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-brand-green/10 border border-brand-green/30 p-3 text-center text-xs font-mono tracking-wider flex justify-between items-center"
                >
                  <span className="text-brand-green font-semibold">01. IDENTIDAD</span>
                  <span className="text-brand-green/60 text-[10px]">Estrategia Verbal & Posicionamiento</span>
                </motion.div>

                <div className="w-1 h-3 bg-brand-green/30" />

                <motion.div
                  initial={{ width: '40%', opacity: 0, y: 15 }}
                  animate={{ width: '85%', opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-brand-green/15 border border-brand-green/40 p-3 text-center text-xs font-mono tracking-wider flex justify-between items-center"
                >
                  <span className="text-brand-green font-semibold">02. MENSAJE</span>
                  <span className="text-brand-green/60 text-[10px]">Guiones de Autoridad & Estructura</span>
                </motion.div>

                <div className="w-1 h-3 bg-brand-green/30" />

                <motion.div
                  initial={{ width: '40%', opacity: 0, y: 15 }}
                  animate={{ width: '90%', opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-brand-green/20 border border-brand-green/50 p-3 text-center text-xs font-mono tracking-wider flex justify-between items-center"
                >
                  <span className="text-brand-green font-semibold">03. SISTEMA</span>
                  <span className="text-brand-green/60 text-[10px]">Calendario Editorial Predictivo</span>
                </motion.div>

                <div className="w-1 h-3 bg-brand-green/30" />

                <motion.div
                  initial={{ width: '40%', opacity: 0, y: 15 }}
                  animate={{ width: '95%', opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-brand-green text-brand-cream p-3 text-center text-xs font-mono tracking-wider flex justify-between items-center"
                >
                  <span className="font-semibold">04. CONTENIDO</span>
                  <span className="text-brand-cream/80 text-[10px]">Consecuencia Visible y Coherente</span>
                </motion.div>
              </div>
            )}

          </div>

        </div>

        {/* Closing Shift realization */}
        <div className="text-center pt-4">
          <p className="font-serif text-lg md:text-xl text-brand-green max-w-2xl mx-auto font-serif-italic">
            "Mi problema nunca fue el algoritmo ni la falta de ideas. Mi problema fue la falta de un sistema sólido."
          </p>
        </div>

      </div>
    </section>
  );
}
