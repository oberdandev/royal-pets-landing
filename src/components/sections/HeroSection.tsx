import { motion } from 'framer-motion';
import { Crown, Clock, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-royal-navy overflow-hidden flex items-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-navy via-royal-navy to-royal-navy-light" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      {/* Floating crown decoration */}
      <motion.div
        className="absolute top-32 right-[15%] text-royal-gold/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Crown className="w-24 h-24" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal-gold/10 border border-royal-gold/20 mb-6">
              <Crown className="w-4 h-4 text-royal-gold" />
              <span className="text-royal-gold text-sm font-semibold tracking-wider uppercase">
                Retratos Reais para Reis e Rainhas de Verdade
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-royal-soft-gold leading-[1.1] mb-6">
              Seu Pet Merece o{' '}
              <span className="text-royal-gold">Trono</span>
            </h1>

            <p className="text-royal-soft-gold/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Transformamos fotos do seu cachorro em obras de arte dignas da realeza. 
              Quadros personalizados, feitos com IA e muito amor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="primary" size="lg" href="#precos">
                <Crown className="w-5 h-5 mr-2" />
                Criar Meu Retrato
              </Button>
              <Button variant="outline" size="lg" href="#como-funciona">
                Ver Como Funciona
              </Button>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Clock, text: 'Entrega em 48h' },
                { icon: Shield, text: 'Satisfação Garantida' },
                { icon: Users, text: '+5.000 Pets Transformados' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-royal-soft-gold/70">
                  <item.icon className="w-5 h-5 text-royal-gold" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Hero image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-lg mx-auto">
              {/* Frame decoration */}
              <div className="absolute inset-0 border-[12px] border-royal-gold/30 rounded-lg transform rotate-2" />
              <div className="absolute inset-0 border-[12px] border-royal-gold/50 rounded-lg transform -rotate-1" />

              {/* Main image placeholder */}
              <div className="relative w-full h-full bg-gradient-to-br from-royal-burgundy/30 to-royal-navy-light rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <Crown className="w-20 h-20 text-royal-gold mx-auto mb-4" />
                  <p className="font-display text-2xl text-royal-soft-gold mb-2">
                    Seu Dog Aqui
                  </p>
                  <p className="text-royal-soft-gold/60 text-sm">
                    Retrato Real de Realeza
                  </p>
                </div>

                {/* Sparkle decorations */}
                <motion.div
                  className="absolute top-4 right-4 text-royal-gold"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute bottom-8 left-4 text-royal-gold"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-royal-white to-transparent" />
    </section>
  );
}