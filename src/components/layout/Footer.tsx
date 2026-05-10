import { Crown, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#060D18] text-royal-soft-gold/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-royal-gold" />
              <span className="font-display text-lg font-bold text-royal-soft-gold">
                Cachorros Reais
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Transformando seus melhores amigos em obras de arte dignas da realeza.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-royal-gold hover:text-royal-soft-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-royal-gold hover:text-royal-soft-gold transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-royal-soft-gold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {['Início', 'Como Funciona', 'Preços', 'Depoimentos', 'FAQ'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-royal-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-royal-soft-gold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {['Termos de Uso', 'Política de Privacidade', 'Trocas e Devoluções'].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-royal-gold transition-colors">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-royal-soft-gold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>contato@cachorrosreais.com.br</li>
              <li>WhatsApp: (11) 99999-9999</li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-royal-gold/10 text-royal-gold text-xs font-semibold">
                  Atendimento 24h
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-royal-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 Cachorros Reais. Todos os direitos reservados. Long live the dogs. 🐕👑
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold">
              PIX
            </span>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-semibold">
              Visa
            </span>
            <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-semibold">
              Mastercard
            </span>
            <span className="text-xs bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-semibold">
              Mercado Pago
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}