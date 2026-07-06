/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface BookingData {
  ingresos: string;       // Q1
  decisor: string;        // Q2
  comprometido: string;   // Q3
  dedicaNegocio: string;  // Q4
  retoCrecimiento: string;// Q5
  expectativas: string;   // Q6
  nombre: string;
  email: string;
}

export default function ActInvitation() {
  const [step, setStep] = useState<number>(1);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingData>({
    ingresos: '',
    decisor: '',
    comprometido: '',
    dedicaNegocio: '',
    retoCrecimiento: '',
    expectativas: '',
    nombre: '',
    email: ''
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSendAnswers = async () => {
    setIsSending(true);
    setSendError(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          answers: {
            q1: formData.ingresos,
            q2: formData.decisor,
            q3: formData.comprometido,
            q4: formData.dedicaNegocio,
            q5: formData.retoCrecimiento,
            q6: formData.expectativas
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar las respuestas.');
      }

      setStep(5); // Transition to success step and reveal Calendly button
    } catch (error: any) {
      console.error('Error sending answers:', error);
      setSendError(error.message || 'Error de conexión con el servidor. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contacto"
      className="min-h-screen py-24 md:py-32 bg-brand-cream border-t border-brand-beige flex flex-col justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-4xl mx-auto w-full z-10 space-y-12">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-brand-green text-[10px] tracking-[0.3em] uppercase font-mono">
            ACTO FINAL — LA INVITACIÓN
          </span>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight font-medium text-brand-charcoal">
            La Llamada de <span className="font-serif-italic font-normal text-brand-green">Claridad.</span>
          </h2>
          <p className="text-sm text-brand-charcoal/60 leading-relaxed font-light">
            No es una llamada de ventas agresiva. Es una sesión estratégica de 30 minutos donde diagnosticamos tu sistema actual, aislamos tus fugas de autoridad y diseñamos un boceto de tu plan editorial.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-brand-cream border border-brand-beige p-8 md:p-12 relative overflow-hidden shadow-sm max-w-2xl mx-auto w-full">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />

          <AnimatePresence mode="wait">
            
            {/* STEP 1: QUALIFYING QUESTIONNAIRE */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-brand-green font-bold">FASE 1 DE 3</span>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal font-medium">
                    Evaluemos tu situación actual.
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 font-light font-sans">
                    Solo trabajamos con fundadoras y líderes de negocio consolidados para asegurar el máximo retorno estratégico.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-beige">
                  {/* Q1 */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-brand-charcoal font-sans block">
                      ¿Tu negocio genera ingresos recurrentes superiores a 1.500€ al mes?
                    </span>
                    <div className="flex space-x-3">
                      {['Sí', 'No'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, ingresos: option })}
                          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                            formData.ingresos === option
                              ? 'bg-brand-green text-brand-cream border-brand-green'
                              : 'border-brand-charcoal/10 text-brand-charcoal hover:border-brand-charcoal/30'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-brand-charcoal font-sans block">
                      ¿Eres la persona encargada de tomar decisiones de marca?
                    </span>
                    <div className="flex space-x-3">
                      {['Sí', 'No'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, decisor: option })}
                          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                            formData.decisor === option
                              ? 'bg-brand-green text-brand-cream border-brand-green'
                              : 'border-brand-charcoal/10 text-brand-charcoal hover:border-brand-charcoal/30'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-brand-charcoal font-sans block">
                      ¿Estás dispuesto a delegar la producción audiovisual y confiar en un sistema?
                    </span>
                    <div className="flex space-x-3">
                      {['Sí', 'No'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, comprometido: option })}
                          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                            formData.comprometido === option
                              ? 'bg-brand-green text-brand-cream border-brand-green'
                              : 'border-brand-charcoal/10 text-brand-charcoal hover:border-brand-charcoal/30'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-beige flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!formData.ingresos || !formData.decisor || !formData.comprometido}
                    className="group bg-brand-charcoal text-brand-cream hover:bg-brand-charcoal/90 disabled:opacity-30 disabled:hover:bg-brand-charcoal text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 transition-all flex items-center space-x-2"
                  >
                    <span>Siguiente Paso</span>
                    <ChevronRight className="w-4 h-4 text-brand-green" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: EXPANDED QUESTIONS */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-brand-green font-bold">FASE 2 DE 3</span>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal font-medium">
                    El contexto de tu marca.
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 font-light">
                    Queremos entender el punto de partida intelectual de tu negocio.
                  </p>
                </div>

                <div className="space-y-5 pt-4 border-t border-brand-beige text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.15em] text-brand-charcoal/60 block font-semibold">
                      ¿CUÉNTANOS BREVEMENTE A QUÉ SE DEDICA TU NEGOCIO?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.dedicaNegocio}
                      onChange={(e) => setFormData({ ...formData, dedicaNegocio: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors resize-none font-sans"
                      placeholder="Ej. Ofrecemos consultoría estratégica para startups o gestionamos clínicas dentales premium..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.15em] text-brand-charcoal/60 block font-semibold">
                      ¿CUÁL ES EL MAYOR RETO QUE TIENES ACTUALMENTE CON TU COMUNICACIÓN O CRECIMIENTO?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.retoCrecimiento}
                      onChange={(e) => setFormData({ ...formData, retoCrecimiento: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors resize-none font-sans"
                      placeholder="Ej. Atraemos leads de baja calidad que buscan precios bajos o dependemos del boca a boca..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.15em] text-brand-charcoal/60 block font-semibold">
                      ¿QUÉ ESPERAS CONSEGUIR TRABAJANDO CON ÁPICE STUDIO?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.expectativas}
                      onChange={(e) => setFormData({ ...formData, expectativas: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors resize-none font-sans"
                      placeholder="Ej. Desvincularme de la producción diaria y consolidar una voz de autoridad atemporal..."
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-beige flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-charcoal font-mono"
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.dedicaNegocio.trim() || !formData.retoCrecimiento.trim() || !formData.expectativas.trim()}
                    className="group bg-brand-charcoal text-brand-cream hover:bg-brand-charcoal/90 disabled:opacity-30 disabled:hover:bg-brand-charcoal text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 transition-all flex items-center space-x-2"
                  >
                    <span>Siguiente Paso</span>
                    <ChevronRight className="w-4 h-4 text-brand-green" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONTACT DETAILS */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-brand-green font-bold">FASE 3 DE 3</span>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal font-medium">
                    Tus datos de contacto.
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 font-light">
                    ¿Con quién tendremos el placer de mantener la sesión estratégica?
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-beige text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-charcoal/60 block font-semibold">
                      TU NOMBRE COMPLETO
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors font-sans"
                      placeholder="Ej. Rosana Rodríguez"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-charcoal/60 block font-semibold">
                      EMAIL CORPORATIVO
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/15 focus:border-brand-green rounded-none px-4 py-3 text-xs text-brand-charcoal tracking-wide focus:outline-none transition-colors font-sans"
                      placeholder="Ej. direccion@estudio.com"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-beige flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-charcoal font-mono"
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.nombre.trim() || !formData.email.trim()}
                    className="group bg-brand-charcoal text-brand-cream hover:bg-brand-charcoal/90 disabled:opacity-30 disabled:hover:bg-brand-charcoal text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 transition-all flex items-center space-x-2"
                  >
                    <span>Revisar Respuestas</span>
                    <ChevronRight className="w-4 h-4 text-brand-green" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONFIRMATION STEP */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-brand-green font-bold">CONFIRMACIÓN</span>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal font-medium">
                    ¿Todo listo para enviar?
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 font-light">
                    Revisa tus respuestas antes de transmitirlas a nuestro equipo.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-beige text-xs font-sans max-h-[300px] overflow-y-auto pr-2">
                  <div className="border-b border-brand-beige pb-2.5">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">Tu Identificación</span>
                    <p className="text-brand-charcoal font-medium">{formData.nombre} <span className="text-brand-charcoal/60 font-light">({formData.email})</span></p>
                  </div>

                  <div className="border-b border-brand-beige pb-2.5">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">1. Ingresos Recurrentes &gt; 1.500€/mes</span>
                    <p className="text-brand-charcoal font-medium">{formData.ingresos}</p>
                  </div>

                  <div className="border-b border-brand-beige pb-2.5">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">2. Toma de Decisiones de Marca</span>
                    <p className="text-brand-charcoal font-medium">{formData.decisor}</p>
                  </div>

                  <div className="border-b border-brand-beige pb-2.5">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">3. Compromiso de Delegar y Confiar</span>
                    <p className="text-brand-charcoal font-medium">{formData.comprometido}</p>
                  </div>

                  <div className="border-b border-brand-beige pb-2.5">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">4. Actividad del Negocio</span>
                    <p className="text-brand-charcoal/80 italic leading-relaxed">{formData.dedicaNegocio}</p>
                  </div>

                  <div className="border-b border-brand-beige pb-2.5">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">5. Mayor Reto de Comunicación</span>
                    <p className="text-brand-charcoal/80 italic leading-relaxed">{formData.retoCrecimiento}</p>
                  </div>

                  <div className="pb-1">
                    <span className="font-mono text-[9px] text-brand-green uppercase font-bold block mb-1">6. Expectativas con ÁPICE Studio</span>
                    <p className="text-brand-charcoal/80 italic leading-relaxed">{formData.expectativas}</p>
                  </div>
                </div>

                {sendError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{sendError}</span>
                  </div>
                )}

                <div className="pt-6 border-t border-brand-beige flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSending}
                    className="text-xs uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-charcoal font-mono disabled:opacity-35"
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleSendAnswers}
                    disabled={isSending}
                    className="group bg-brand-charcoal text-brand-cream hover:bg-brand-charcoal/90 disabled:opacity-50 text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 transition-all flex items-center space-x-2"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 text-brand-green animate-spin" />
                        <span>Enviando respuestas...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar respuestas</span>
                        <ArrowRight className="w-4 h-4 text-brand-green group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS STATE / REVEAL CALENDLY (Update 09) */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mx-auto text-brand-green">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-green font-bold">
                    RESPUESTAS ENVIADAS CON ÉXITO
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-medium">
                    El primer paso hacia la claridad.
                  </h3>
                  <p className="text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light font-sans max-w-md mx-auto">
                    Hemos recibido tus respuestas. Ahora, el sistema está listo para que reserves tu slot de claridad directamente en nuestra agenda.
                  </p>
                </div>

                <div className="pt-4 max-w-md mx-auto">
                  <a
                    href="https://calendly.com/apicestudio-co/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full bg-brand-green text-brand-cream hover:bg-brand-green/90 text-xs uppercase tracking-[0.15em] font-semibold py-4 transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Agendar Llamada de Claridad</span>
                    <ArrowRight className="w-4 h-4 text-brand-cream group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] font-mono text-brand-charcoal/40 uppercase tracking-widest">
                    * Redirección inmediata a Calendly
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
