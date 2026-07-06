/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onScheduleClick: () => void;
  onPlatformClick: () => void;
}

export default function Navbar({ onScheduleClick, onPlatformClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-cream/90 backdrop-blur-md border-b border-brand-beige py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Elegant Serif Logo */}
        <a href="#inicio" className="flex flex-col select-none group">
          <span className="font-serif text-2xl md:text-[28px] font-medium tracking-tight text-brand-charcoal transition-colors duration-300">
            Ápice <span className="font-serif-italic font-normal text-brand-green">studio.</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-green/80 font-mono -mt-1 group-hover:text-brand-charcoal transition-colors">
            Donde las marcas encuentran su ápice
          </span>
        </a>

        {/* Desktop Nav Actions */}
        <nav className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.15em] font-medium">
          <a
            href="#revelacion"
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          >
            La Verdad
          </a>
          <a
            href="#sistema"
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
          >
            El Sistema
          </a>
          <button
            onClick={onPlatformClick}
            className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors text-left"
          >
            La Plataforma
          </button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://calendly.com/apicestudio-co/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-cream text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 rounded-none transition-all duration-300 flex items-center space-x-2"
          >
            <span>Llamada de Claridad</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-brand-charcoal focus:outline-none p-2"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-beige shadow-lg py-8 px-6 flex flex-col space-y-6 text-center text-sm uppercase tracking-[0.15em] font-medium md:hidden"
          >
            <a
              href="#revelacion"
              onClick={() => setMobileMenuOpen(false)}
              className="text-brand-charcoal hover:text-brand-green py-2 transition-colors border-b border-brand-beige/50"
            >
              La Verdad
            </a>
            <a
              href="#sistema"
              onClick={() => setMobileMenuOpen(false)}
              className="text-brand-charcoal hover:text-brand-green py-2 transition-colors border-b border-brand-beige/50"
            >
              El Sistema
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlatformClick();
              }}
              className="text-brand-charcoal hover:text-brand-green py-2 transition-colors border-b border-brand-beige/50 uppercase text-sm tracking-[0.15em] font-medium text-center"
            >
              La Plataforma
            </button>
            <a
              href="https://calendly.com/apicestudio-co/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand-charcoal text-brand-cream text-xs uppercase tracking-[0.15em] font-semibold py-4 transition-all block text-center"
            >
              Llamada de Claridad
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
