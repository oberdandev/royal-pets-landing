import { useState, useEffect } from 'react';
import { Menu, X, Crown } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-royal-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a href="#inicio" className="flex items-center gap-2 group">
            <Crown className="w-8 h-8 text-royal-gold group-hover:scale-110 transition-transform" />
            <span className="font-display text-xl font-bold text-royal-soft-gold">
              Cachorros Reais
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-royal-soft-gold/80 hover:text-royal-gold font-medium text-[15px] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="outline" size="sm" href="#precos">
              Transformar Meu Pet
            </Button>
          </div>

          <button
            className="md:hidden text-royal-gold p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-royal-navy/95 backdrop-blur-md border-t border-royal-gold/20">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-royal-soft-gold/80 hover:text-royal-gold font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" size="md" href="#precos" className="w-full mt-4">
              Transformar Meu Pet
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}