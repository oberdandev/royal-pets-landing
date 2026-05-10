import { FadeIn } from '@/components/animations/FadeIn';
import { Check, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PRICING_TIERS } from '@/lib/constants';

export function Pricing() {
  return (
    <section id="precos" className="py-24 bg-royal-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-royal-gold font-semibold text-sm tracking-wider uppercase">
            Escolha o Tamanho do Trono
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-royal-charcoal mt-3">
            Planos e Preços
          </h2>
          <p className="text-royal-slate text-lg mt-4 max-w-2xl mx-auto">
            Opções para todo tipo de realeza. Todos incluem prévia digital e aprovação.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <FadeIn key={tier.name} delay={index * 0.15}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  tier.popular
                    ? 'bg-royal-navy text-royal-soft-gold ring-4 ring-royal-gold/30 scale-105 shadow-2xl'
                    : 'bg-white text-royal-charcoal border-2 border-royal-champagne/50 shadow-lg'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-royal-gold text-royal-navy text-sm font-bold">
                      <Star className="w-4 h-4" />
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown
                      className={`w-5 h-5 ${
                        tier.popular ? 'text-royal-gold' : 'text-royal-gold'
                      }`}
                    />
                    <h3
                      className={`font-display text-xl font-bold ${
                        tier.popular ? 'text-royal-soft-gold' : 'text-royal-charcoal'
                      }`}
                    >
                      {tier.name}
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      tier.popular ? 'text-royal-soft-gold/70' : 'text-royal-slate'
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-display text-4xl font-black ${
                        tier.popular ? 'text-royal-gold' : 'text-royal-charcoal'
                      }`}
                    >
                      {tier.price}
                    </span>
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      tier.popular ? 'text-royal-soft-gold/70' : 'text-royal-slate'
                    }`}
                  >
                    {tier.installment}
                  </p>
                  {tier.pixPrice && (
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 text-sm font-semibold">
                      💚 {tier.pixDiscount}: {tier.pixPrice}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          tier.popular ? 'text-royal-gold' : 'text-emerald-500'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          tier.popular ? 'text-royal-soft-gold/90' : 'text-royal-slate'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="text-center mt-12">
          <p className="text-royal-slate text-sm">
            🐾 Pagamento 100% seguro. Aceitamos PIX, cartão em até 12x e Mercado Pago.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}