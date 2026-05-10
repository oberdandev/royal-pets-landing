import { FadeIn } from '@/components/animations/FadeIn';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-royal-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-royal-gold font-semibold text-sm tracking-wider uppercase">
            O que os Tutores Dizem
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-royal-charcoal mt-3">
            Histórias Reais de Realeza
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <FadeIn key={testimonial.author} delay={index * 0.15}>
              <div className="bg-royal-cream rounded-2xl p-8 h-full flex flex-col relative">
                <Quote className="w-10 h-10 text-royal-gold/30 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-royal-gold text-royal-gold" />
                  ))}
                </div>

                <p className="font-accent text-xl italic text-royal-charcoal leading-relaxed mb-6 flex-1">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-royal-champagne/30">
                  <div className="w-12 h-12 rounded-full bg-royal-navy flex items-center justify-center">
                    <span className="text-royal-gold font-bold text-lg">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-royal-charcoal">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-royal-slate">
                      {testimonial.location} — {testimonial.dog} ({testimonial.breed})
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}