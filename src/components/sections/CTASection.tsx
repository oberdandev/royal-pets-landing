import { motion } from 'framer-motion';
import { Crown, Truck, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="relative py-24 bg-royal-navy overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-navy via-royal-navy to-royal-burgundy/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Crown className="w-16 h-16 text-royal-gold mx-auto mb-6" />

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-royal-soft-gold mb-6">
            Seu Dog Já Nasceu Real
          </h2>
          <p className="text-royal-soft-gold/80 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Não deixe essa memória só no rolo de fotos do celular. Dê ao seu melhor amigo 
            o lugar de honra que ele já ocupa no seu coração.
          </p>

          <Button variant="primary" size="lg" className="text-lg px-12 py-5">
            <Crown className="w-6 h-6 mr-2" />
            Quero o Retrato do Meu Dog
          </Button>

          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { icon: Truck, text: 'Frete Grátis' },
              { icon: Shield, text: 'PIX com Desconto' },
              { icon: CreditCard, text: 'Parcelamento em 12x' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-royal-soft-gold/70">
                <item.icon className="w-5 h-5 text-royal-gold" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}