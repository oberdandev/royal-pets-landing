import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/lib/constants';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-royal-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-royal-gold font-semibold text-sm tracking-wider uppercase">
            Tire suas Dúvidas
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-royal-charcoal mt-3">
            Perguntas Frequentes
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div className="bg-white rounded-xl border border-royal-champagne/30 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-royal-charcoal pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-royal-gold flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-royal-gold flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-royal-slate leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}