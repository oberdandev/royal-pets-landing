export const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Preços', href: '#precos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
];

export const PRICING_TIERS = [
  {
    name: 'Apenas Digital',
    price: 'R$ 49,90',
    installment: 'ou 5x de R$ 9,98',
    description: 'Retrato digital em alta resolução',
    features: [
      'Envio por e-mail em 24h',
      '1 versão royal',
      'Arquivo em alta resolução',
      'Perfeito para papel de parede',
    ],
    cta: 'Quero Digital',
    popular: false,
  },
  {
    name: 'Quadro Enquadrado',
    price: 'R$ 189,90',
    installment: 'ou 6x de R$ 31,65',
    pixPrice: 'R$ 170,91',
    pixDiscount: '10% OFF no PIX',
    description: 'Retrato impresso em papel fine art',
    features: [
      'Moldura clássica dourada ou rústica',
      'Frete grátis',
      'Pronto para pendurar',
      'Prévia digital para aprovação',
    ],
    cta: 'Quero Meu Quadro',
    popular: true,
  },
  {
    name: 'Coleção Real',
    price: 'R$ 499,90',
    installment: 'ou 8x de R$ 62,49',
    pixPrice: 'R$ 439,91',
    pixDiscount: '12% OFF no PIX',
    description: '3 retratos reais (digital + quadro)',
    features: [
      'Molduras personalizadas',
      'Frete grátis expresso',
      'Versão digital de todos',
      'Embalagem premium presenteável',
    ],
    cta: 'Quero a Coleção',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Quando abri o pacote, chorei. O Fred virou um verdadeiro Rei Luís XIV! A moldura é linda, a qualidade impressiona. Todo mundo que entra em casa pergunta onde comprei.',
    author: 'Mariana Costa',
    location: 'São Paulo',
    dog: 'Fred',
    breed: 'Vira-lata Caramelo',
  },
  {
    quote: 'Fiz da Luna e ficou MARAVILHOSO. Parece um quadro de museu, mas é a minha SRD de 10kg no trono! Já quero fazer da coleção inteira.',
    author: 'Bruna Oliveira',
    location: 'Curitiba',
    dog: 'Luna',
    breed: 'Shih Tzu',
  },
  {
    quote: 'Presente de aniversário pro meu pai. Ele não parou de rir — e depois não parou de mostrar pra visita. Comprei com PIX e ainda ganhei desconto.',
    author: 'Ricardo Mendes',
    location: 'Belo Horizonte',
    dog: 'Thor',
    breed: 'Pastor Alemão',
  },
];

export const FAQS = [
  {
    question: 'Precisa ser foto profissional?',
    answer: 'Não! Qualquer foto do celular funciona, desde que o rostinho do dog esteja bem visível. Quanto mais clara, melhor fica o resultado.',
  },
  {
    question: 'E se eu não gostar do retrato?',
    answer: 'Você aprova a prévia digital antes de imprimir. Se não amar de primeira, fazemos ajustes sem custo extra.',
  },
  {
    question: 'Quanto tempo demora para chegar?',
    answer: 'A prévia digital sai em até 24h. O quadro pronto chega em 7 dias úteis (SP e RJ) ou até 12 dias para o resto do Brasil.',
  },
  {
    question: 'Dá para fazer de gatos também?',
    answer: 'Claro! A gente chama de "Cachorros Reais", mas gatos, coelhos e até porquinhos da Índia também merecem o trono. É só mandar a foto.',
  },
  {
    question: 'O pagamento é seguro?',
    answer: 'Totalmente. Aceitamos PIX (com descontão), cartão em até 12x, e Mercado Pago. Seus dados estão protegidos.',
  },
];