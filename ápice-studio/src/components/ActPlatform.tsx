/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { platformItemsData } from '../data';
import { PlatformItem } from '../types';
import {
  Lock,
  Calendar,
  Layers,
  CheckCircle,
  FileText,
  User,
  X,
  Play,
  FileDown,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function ActPlatform() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('rosana@estudio.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [selectedItem, setSelectedItem] = useState<PlatformItem | null>(null);
  
  // Interactive checklist state
  const [tasks, setTasks] = useState([
    { id: 't1', label: 'Grabar última semana de lanzamiento', completed: false },
    { id: 't2', label: 'Aprobar carrusel del día 25', completed: false },
    { id: 't3', label: 'Alinear guiones de la fase 2', completed: false }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // Enero 2026 calendar configuration
  // Enero 2026 starts on a Thursday (Jueves), so we have 3 empty days at the start of the grid (Lunes, Martes, Miércoles are empty)
  const daysInJan = 31;
  const startingOffset = 3; // Lunes, Martes, Miércoles empty (0, 1, 2 offset)

  const calendarGridCells = [];
  // Add offsets
  for (let i = 0; i < startingOffset; i++) {
    calendarGridCells.push({ day: null, item: null });
  }
  // Add days
  for (let day = 1; day <= daysInJan; day++) {
    const matchedItem = platformItemsData.find((item) => item.day === day) || null;
    calendarGridCells.push({ day, item: matchedItem });
  }

  return (
    <section
      id="plataforma"
      className="min-h-screen py-24 bg-brand-cream border-t border-brand-beige flex flex-col justify-center relative overflow-hidden px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto w-full z-10 space-y-12">
        
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
          <span className="text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            ACTO VII — LA PLATAFORMA ÁPICE
          </span>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight font-medium text-brand-charcoal">
            La herramienta de tu <span className="font-serif-italic font-normal text-brand-green">tranquilidad.</span>
          </h2>
          <p className="text-sm text-brand-charcoal/60 leading-relaxed font-light">
            Centralizamos toda tu comunicación. Olvídate del desorden de carpetas de Drive, mensajes de WhatsApp perdidos y planificaciones en Excel. Accede a tu portal privado para supervisar tu calendario.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            
            // SCREEN 1: PORTAL PRIVADO LOGIN (Image 3 style)
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-brand-cream border border-brand-beige shadow-sm p-8 md:p-12 relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex flex-col select-none">
                  <span className="font-serif text-2xl font-medium tracking-tight text-brand-charcoal">
                    Ápice <span className="font-serif-italic font-normal text-brand-green">studio.</span>
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-brand-green font-mono">
                    Donde las marcas encuentran su ápice
                  </span>
                </div>

                <div className="h-px bg-brand-beige w-16" />

                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal/80">
                    Portal Privado de Clientes
                  </h3>
                  <p className="text-[11px] text-brand-charcoal/50 uppercase tracking-widest font-mono">
                    ÁREA DE GESTIÓN EDITORIAL
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="w-full text-left space-y-6 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-charcoal/60 block">
                      EMAIL CORPORATIVO
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3.5 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-charcoal/60 block">
                      CONTRASEÑA
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3.5 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-cream text-xs uppercase tracking-[0.15em] font-semibold py-4 rounded-none transition-colors flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-brand-green" />
                    <span>ACCEDER AL PORTAL</span>
                  </button>
                </form>

                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="text-[10px] font-mono text-brand-green uppercase tracking-wider hover:underline pt-2"
                >
                  * Entrar directo con credenciales de demostración
                </button>
              </div>
            </motion.div>
          ) : (
            
            // SCREEN 2: MAIN DASHBOARD CALENDAR SIMULATION (Image 4 style)
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-brand-cream border border-brand-beige shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[650px]"
            >
              
              {/* SIDEBAR (Left 3 columns) */}
              <div className="lg:col-span-3 bg-brand-cream border-r border-brand-beige p-6 md:p-8 flex flex-col justify-between space-y-8">
                
                {/* Brand Logo Header */}
                <div className="space-y-6">
                  <div className="flex flex-col select-none">
                    <span className="font-serif text-xl font-medium tracking-tight text-brand-charcoal">
                      Ápice <span className="font-serif-italic font-normal text-brand-green">studio.</span>
                    </span>
                    <span className="text-[7px] uppercase tracking-[0.25em] text-brand-green font-mono">
                      Donde las marcas encuentran su ápice
                    </span>
                  </div>

                  <div className="h-px bg-brand-beige" />

                  {/* Reflection Block */}
                  <div className="bg-brand-beige/25 p-4 border-l-2 border-brand-green space-y-2">
                    <span className="text-[8px] font-mono tracking-wider uppercase text-brand-green font-semibold">
                      REFLEXIÓN DEL MES
                    </span>
                    <p className="font-serif text-[13px] leading-relaxed text-brand-charcoal/80 italic">
                      "La consistencia vence a la intensidad. Diseña un sistema para tus días comunes, no para tus picos de inspiración."
                    </p>
                  </div>

                  {/* Tasks Checklist with Progress */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono tracking-wider uppercase text-brand-charcoal/50 font-semibold">
                        TAREAS DEL MES
                      </span>
                      <span className="text-[9px] font-mono text-brand-green font-bold">
                        {progressPercent}% COMPLETADO
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-brand-beige w-full rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-green transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {tasks.map((task) => (
                        <label
                          key={task.id}
                          className="flex items-start space-x-3 text-xs cursor-pointer select-none group"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-3.5 h-3.5 rounded-none border-brand-charcoal/20 text-brand-green focus:ring-0 cursor-pointer mt-0.5"
                          />
                          <span className={`text-[11px] font-light leading-tight transition-all ${
                            task.completed ? 'line-through text-brand-charcoal/40' : 'text-brand-charcoal/80 group-hover:text-brand-charcoal'
                          }`}>
                            {task.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Block with Exit */}
                <div className="space-y-4 pt-6 border-t border-brand-beige">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                        Rosana
                      </h4>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-brand-green/80 bg-brand-green/5 border border-brand-green/10 px-1.5 py-0.5">
                        CUENTA DESPEGUE
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full border border-brand-charcoal/10 hover:border-brand-charcoal/30 text-[9px] font-mono uppercase tracking-widest py-2 text-brand-charcoal/60 hover:text-brand-charcoal transition-all"
                  >
                    Cerrar Sesión
                  </button>
                </div>

              </div>

              {/* CALENDAR WORKSPACE (Right 9 columns) */}
              <div className="lg:col-span-9 p-6 md:p-8 flex flex-col justify-between space-y-6">
                
                {/* Calendar Title Bar */}
                <div className="flex justify-between items-center border-b border-brand-beige pb-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    <span className="text-sm font-serif font-medium uppercase tracking-wide text-brand-charcoal">
                      Enero 2026
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-charcoal/40">
                    * Haz clic en los días marcados con color para inspeccionar el activo
                  </span>
                </div>

                {/* Weekdays Headers */}
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/40 border-b border-brand-beige/50 pb-2">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mié</span>
                  <span>Jue</span>
                  <span>Vie</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>

                {/* Grid Cells */}
                <div className="grid grid-cols-7 gap-2 md:gap-3 flex-1">
                  {calendarGridCells.map((cell, index) => {
                    const { day, item } = cell;
                    const hasItem = item && item.type !== 'Empty';
                    
                    return (
                      <div
                        key={index}
                        onClick={() => hasItem && setSelectedItem(item)}
                        className={`min-h-[70px] md:min-h-[85px] p-2 border relative transition-all flex flex-col justify-between ${
                          day === null
                            ? 'border-transparent bg-transparent'
                            : hasItem
                            ? 'border-brand-green/35 bg-brand-green/5 hover:bg-brand-green/10 cursor-pointer shadow-xs pl-3'
                            : 'border-brand-charcoal/5 bg-transparent'
                        }`}
                      >
                        {/* Day indicator */}
                        {day && (
                          <span className={`text-[10px] font-mono font-medium ${hasItem ? 'text-brand-green font-bold' : 'text-brand-charcoal/30'}`}>
                            {day}
                          </span>
                        )}

                        {/* Event summary */}
                        {hasItem && (
                          <div className="mt-1 space-y-1">
                            <span className="text-[7px] uppercase tracking-[0.1em] px-1 py-0.5 bg-brand-green/10 text-brand-green block w-max font-mono leading-none">
                              {item.type}
                            </span>
                            <p className="text-[9px] md:text-[10px] font-serif font-medium leading-tight text-brand-charcoal line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Status bar */}
                <div className="flex justify-between items-center text-[9px] font-mono uppercase text-brand-charcoal/40 pt-4 border-t border-brand-beige/50">
                  <span>METODOLOGÍA EDITORIAL DE ÁPICE STUDIO</span>
                  <span>PLANIFICACIÓN OPERATIVA ACTIVA</span>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* CLICKABLE ITEM PREVIEW MODAL / DRAWER */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-cream border border-brand-beige max-w-2xl w-full p-6 md:p-8 space-y-6 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-brand-charcoal/60 hover:text-brand-charcoal p-1"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wider text-brand-green uppercase">
                    <span>DÍA {selectedItem.day} de ENERO</span>
                    <span>•</span>
                    <span className="px-1.5 py-0.5 bg-brand-green/10 font-bold">{selectedItem.type}</span>
                  </div>
                  
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-charcoal leading-tight">
                    {selectedItem.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-brand-beige/60">
                  {/* Left: Script Copy */}
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-green font-semibold block">
                      TEXTO EDITORIAL (COPIA)
                    </span>
                    <p className="text-xs font-mono bg-white p-4 border border-brand-beige leading-relaxed text-brand-charcoal/80 max-h-[180px] overflow-y-auto">
                      {selectedItem.caption}
                    </p>
                  </div>

                  {/* Right: Strategy Notes */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="space-y-3 bg-brand-green/5 p-4 border-l-2 border-brand-green h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-brand-green font-bold block mb-1">
                          NÚCLEO ESTRATÉGICO
                        </span>
                        <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                          {selectedItem.strategyNote}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-brand-green/10 text-[9px] font-mono uppercase text-brand-green/80 flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>PILAR: {selectedItem.pillar}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated action triggers */}
                <div className="flex justify-between items-center pt-4 border-t border-brand-beige/60">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-brand-green font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>APROBADO PARA PRODUCCIÓN</span>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="bg-brand-charcoal text-brand-cream text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors"
                  >
                    Cerrar Detalle
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
