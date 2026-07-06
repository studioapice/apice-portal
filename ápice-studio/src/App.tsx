/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import ActArrival from './components/ActArrival';
import ActMirror from './components/ActMirror';
import ActInvisibleProblem from './components/ActInvisibleProblem';
import ActIdentity from './components/ActIdentity';
import ActSystem from './components/ActSystem';
import ActEvolution from './components/ActEvolution';
import ActPlatform from './components/ActPlatform';
import ActInvitation from './components/ActInvitation';
import { motion } from 'motion/react';

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-green selection:text-brand-cream">
      {/* Premium Navbar */}
      <Navbar
        onScheduleClick={() => scrollToSection('contacto')}
        onPlatformClick={() => scrollToSection('plataforma')}
      />

      {/* ACT I: THE ARRIVAL */}
      <ActArrival onNextClick={() => scrollToSection('revelacion')} />

      {/* ACT II: THE MIRROR */}
      <ActMirror />

      {/* ACT III: THE INVISIBLE PROBLEM */}
      <ActInvisibleProblem />

      {/* ACT IV: IDENTITY BEFORE CONTENT */}
      <ActIdentity />

      {/* ACT V: THE SYSTEM */}
      <ActSystem />

      {/* ACT VI: FROM THINKING TO CONTENT */}
      <ActEvolution />

      {/* ACT VII: THE PLATFORM DEMO */}
      <ActPlatform />

      {/* ACT VIII: THE INVITATION */}
      <ActInvitation />

      {/* PREMIUM CHRONOS FOOTER */}
      <footer className="bg-brand-charcoal border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Slogan & Logo */}
          <div className="flex flex-col text-center md:text-left">
            <span className="font-serif text-lg font-medium text-brand-cream tracking-tight">
              Ápice <span className="font-serif-italic font-normal text-brand-green">studio.</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-brand-green font-mono mt-0.5">
              ESTUDIO OPERATIVO DE IDENTIDAD Y MARCA
            </span>
          </div>

          {/* Legal / Fake Links */}
          <div className="flex space-x-6 text-[10px] font-mono uppercase tracking-widest text-brand-cream/40">
            <span className="cursor-pointer hover:text-brand-green transition-colors">Aviso de Privacidad</span>
            <span className="cursor-pointer hover:text-brand-green transition-colors">Términos del Sistema</span>
            <span className="cursor-pointer hover:text-brand-green transition-colors">Ecosistema Ápice</span>
          </div>

          {/* Copyright */}
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-cream/30 text-center md:text-right">
            ÁPICE STUDIO © 2026. TODOS LOS DERECHOS DE MARCA RESERVADOS.
          </span>
        </div>
      </footer>
    </div>
  );
}
