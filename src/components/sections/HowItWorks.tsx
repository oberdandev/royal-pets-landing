import { FadeIn } from '@/components/animations/FadeIn';
import { Upload, Wand2, Package } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Envie a Foto',
    description: 'Escolha a melhor foto do seu cachorro. Quanto mais nítida, melhor fica o resultado. Funciona com qualquer raça!',
  },
  {
    icon: Wand2,
    number: '02',
    title: 'Nossa IA Trabalha',
    description: 'Transformamos a foto em uma obra de arte real. Em poucos minutos, você recebe uma prévia por e-mail para aprovar.',
  },
  {
    icon: Package,
    number: '03',
    title: 'Receba em Casa',
    description: 'Quadro pronto para enfeitar sua casa! Frete grátis para todo o Brasil e entrega em até 7 dias úteis.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-royal-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-royal-gold font-semibold text-sm tracking-wider uppercase">
            Simples e Rápido
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-royal-charcoal mt-3">
            Como Funciona
          </h2>
          <p className="text-royal-slate text-lg mt-4 max-w-2xl mx-auto">
            De foto comum a obra de arte em 3 passos simples
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.15} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-royal-champagne" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-royal-navy mb-6">
                  <step.icon className="w-8 h-8 text-royal-gold" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-royal-gold text-royal-navy text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-royal-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-royal-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}