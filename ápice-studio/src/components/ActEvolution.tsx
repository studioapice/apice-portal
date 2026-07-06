/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lightbulb, FileText, Video, Scissors, Film } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  title: string;
  desc: string;
  content: React.ReactNode;
}

export default function ActEvolution() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: Step[] = [
    {
      id: 0,
      label: '01. LA IDEA ESTRATÉGICA',
      title: 'Aislar el concepto máster',
      desc: 'No inventamos temas al azar. Analizamos el dolor estructural del negocio. Por ejemplo: El fundador de un salón de belleza de alta gama cree que su problema es no encontrar personal leal, pero la causa real es la falta de manuales de puesto claros.',
      content: (
        <div className="bg-brand-green/5 border border-brand-green/20 p-6 space-y-3 font-sans">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-green font-bold">INSIGHT DE NEGOCIO:</span>
          <p className="font-serif text-lg text-brand-charcoal font-medium leading-relaxed">
            "Tu salón de belleza no te pertenece si no puede funcionar sin ti. Estás operando un autoempleo de lujo."
          </p>
          <div className="h-0.5 bg-brand-green/10 my-2" />
          <span className="text-[10px] font-mono uppercase text-brand-charcoal/50">PILAR EDITORAL: LA VISIÓN</span>
        </div>
      )
    },
    {
      id: 1,
      label: '02. EL GUIÓN EDITORIAL',
      title: 'Arquitectura del argumento',
      desc: 'Convertimos la idea compleja en una narrativa fluida de 60 segundos. Sin rodeos, sin vocabulario infantil, sin trucos baratos de retención. Solo autoridad tranquila.',
      content: (
        <div className="border border-brand-charcoal/10 bg-white p-6 space-y-4 font-mono text-xs text-brand-charcoal/80 max-h-[250px] overflow-y-auto">
          <p className="text-brand-green font-bold">// ESTRUCTURA DE GUION EDITORIAL</p>
          <p><span className="text-brand-green">[GANCHO CALMO]</span> "Si tu salón de belleza requiere tu presencia física para cobrar o barrer, no eres dueño; eres un empleado con responsabilidades de dueño..."</p>
          <p><span className="text-brand-green">[DESARROLLO]</span> "La libertad se compra diseñando sistemas de medición, no trabajando más horas. El error del fundador promedio es delegar tareas sin transferir responsabilidad mediante procesos escritos..."</p>
          <p><span className="text-brand-green">[CIERRE]</span> "En la llamada de claridad analizamos el mapa de roles de tu negocio. Agenda en el enlace."</p>
        </div>
      )
    },
    {
      id: 2,
      label: '03. DIRECCIÓN DE FILMACIÓN',
      title: 'Elegancia y encuadre',
      desc: 'Guiamos tu sesión de grabación. Eliminamos fondos ruidosos, luces de colores de discoteca o micrófonos toscos. Establecemos un plano elegante, con luz natural, enfoque limpio y postura impecable.',
      content: (
        <div className="bg-brand-charcoal text-brand-cream p-6 space-y-3">
          <div className="flex items-center space-x-2 text-brand-green">
            <Video className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">REGLAS DE DIRECCIÓN:</span>
          </div>
          <ul className="text-xs space-y-2 font-light list-disc list-inside text-brand-cream/80">
            <li>Luz principal suave lateral (evitar sombras marcadas).</li>
            <li>Encuadre centrado en plano medio, aire suficiente arriba.</li>
            <li>Fondo de arquitectura minimalista o paneles sobrios.</li>
            <li>Tono de voz pausado, respiración controlada, postura firme.</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      label: '04. EDICIÓN PREMIUM',
      title: 'Montaje invisible y tipografía',
      desc: 'La edición premium es invisible. No usamos subtítulos saltarines de colores estridentes, ni emojis infantiles flotando por la pantalla. Usamos tipografía suiza impecable, márgenes amplios y cortes limpios.',
      content: (
        <div className="border border-brand-charcoal/15 bg-brand-cream p-6 relative h-[200px] flex flex-col justify-between overflow-hidden">
          <div className="absolute right-4 top-4 font-mono text-[9px] text-brand-green animate-pulse">
            EDICIÓN ACTIVA
          </div>
          <div className="border-l-2 border-brand-green pl-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-charcoal/40">PAUTA VISUAL:</span>
            <p className="font-serif text-base text-brand-charcoal font-medium mt-1">
              Subtítulos fijos en tercio inferior, fuente Inter, color crema sobre bloque oscuro sutil.
            </p>
          </div>
          <div className="flex space-x-1">
            <span className="w-4 h-1 bg-brand-green" />
            <span className="w-8 h-1 bg-brand-green" />
            <span className="w-12 h-1 bg-brand-green/30" />
            <span className="w-6 h-1 bg-brand-green/30" />
          </div>
        </div>
      )
    },
    {
      id: 4,
      label: '05. PUBLICACIÓN Y CONTROL',
      title: 'El activo de marca listo',
      desc: 'El contenido se publica en la Plataforma de Ápice y se distribuye con una descripción de alta gama que refuerza el argumento del video. Ya no es una simple publicación; es un activo duradero.',
      content: (
        <div className="bg-brand-green text-brand-cream p-6 text-center space-y-3">
          <Film className="w-10 h-10 mx-auto opacity-80" />
          <p className="font-serif text-lg font-medium">Activo listo y cargado en Plataforma</p>
          <p className="text-xs text-brand-cream/80 font-light">
            Programado en el calendario editorial de Enero de forma automatizada.
          </p>
        </div>
      )
    }
  ];

  const getStepIcon = (id: number) => {
    switch (id) {
      case 0: return <Lightbulb className="w-4 h-4" />;
      case 1: return <FileText className="w-4 h-4" />;
      case 2: return <Video className="w-4 h-4" />;
      case 3: return <Scissors className="w-4 h-4" />;
      case 4: return <Film className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="evolucion-idea"
      className="min-h-screen py-24 md:py-32 bg-brand-cream border-t border-brand-beige flex flex-col justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-6xl mx-auto w-full z-10 flex flex-col justify-center h-full space-y-12">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            ACTO VI — DE LA ESTRATEGIA A LA EJECUCIÓN
          </span>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight font-medium text-brand-charcoal">
            La transformación de una <span className="font-serif-italic font-normal text-brand-green">idea.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-light">
            Observa el recorrido estratégico y milimétrico que sigue cada concepto antes de manifestarse públicamente en tu ecosistema editorial.
          </p>
        </div>

        {/* Interactive Lifecycle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Steps Timeline Navigation */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {steps.map((step) => {
              const active = step.id === currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-4 p-4 text-left border transition-all duration-300 ${
                    active
                      ? 'border-brand-green bg-brand-green/5 shadow-sm'
                      : 'border-brand-charcoal/10 hover:border-brand-charcoal/30 bg-transparent'
                  }`}
                >
                  <span className={`p-2 rounded-none transition-colors ${active ? 'bg-brand-green text-brand-cream' : 'bg-brand-charcoal/5 text-brand-charcoal'}`}>
                    {getStepIcon(step.id)}
                  </span>
                  <div>
                    <span className="text-[9px] font-mono text-brand-green block mb-0.5">{step.label}</span>
                    <span className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal">{step.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Visualization Output */}
          <div className="lg:col-span-7 bg-white border border-brand-beige p-8 md:p-12 min-h-[400px] flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 left-0 h-1 bg-brand-beige">
              <div
                className="h-full bg-brand-green transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-green font-semibold block">
                    {steps[currentStep].label}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-medium">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-light font-sans">
                    {steps[currentStep].desc}
                  </p>
                </div>

                {/* Simulated Output Area */}
                <div className="pt-6 border-t border-brand-charcoal/15">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-brand-green block mb-3 font-semibold">
                    ESTADO VISUAL DEL ACTIVO:
                  </span>
                  {steps[currentStep].content}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-brand-charcoal/10 text-[10px] font-mono uppercase text-brand-charcoal/50">
              <span>PROCESO DE REFINAMIENTO</span>
              <span>PASO {currentStep + 1} DE 5</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
