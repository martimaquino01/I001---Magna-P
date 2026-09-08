import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Idiomas: Português (pt) e Inglês (en).
   O texto traduzível vive aqui; os componentes só puxam de `t`.
   Dados não-textuais (imagens, rácios, valores) ficam nos componentes.
   ═══════════════════════════════════════════════════════════════ */

export const translations = {
  pt: {
    skip: 'Saltar para o conteúdo',
    common: { optional: '(opcional)' },

    nav: {
      brand: 'Magna Properties — início',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      menu: 'Menu',
      links: [
        { href: '#fazemos', label: 'O que fazemos' },
        { href: '#metodo', label: 'O método' },
        { href: '#onde', label: 'Onde trabalhamos' },
        { href: '#contacto', label: 'Contacto' },
      ],
      meta: [
        { k: 'Directo', v: '+351 935 904 830', href: 'https://wa.me/351935904830' },
        { k: 'Social', v: 'Instagram', href: 'https://www.instagram.com/themagnaproperties' },
        { k: 'Licença', v: 'AMI 27435' },
      ],
      drawerCta: 'Falar connosco',
      langAria: 'Mudar idioma para inglês',
    },

    hero: {
      eyebrow: 'Investimento imobiliário · Algarve',
      titleLines: ['Possui um imóvel', 'ou quer investir?', 'Fale connosco.'],
      ctaOwner: 'Tenho um imóvel',
      ctaInvestor: 'Quero investir',
      cue: 'Ver mais',
    },

    approach: {
      eyebrow: 'Abordagem',
      h: 'Decisões sustentadas em *dados de transação.*',
      p1: 'Avaliamos cada oportunidade a partir do valor efectivamente praticado na zona, e não do valor pedido. A análise antecede sempre a proposta — para quem vende e para quem compra.',
      p2: 'Quando os números não sustentam o negócio, dizemo-lo. É uma posição que custa oportunidades no curto prazo e evita erros que se pagam durante anos.',
    },

    offer: {
      eyebrow: 'O que fazemos',
      h: 'Dois pontos de partida, o mesmo *critério.*',
      cards: [
        {
          title: 'Para proprietários',
          alt: 'Terraço e piscina de uma moradia com zona de estar coberta',
          body: 'Avaliamos o imóvel com dados de transação da zona e uma visita ao local. Quando os números o justificam, apresentamos proposta de compra directa.',
          cta: 'Receber uma avaliação',
          list: [
            'Avaliação com dados de transação',
            'Visita e verificação no local',
            'Proposta directa ou colocação em rede',
          ],
        },
        {
          title: 'Para investidores',
          alt: 'Fachada de um edifício residencial contemporâneo com piscina',
          body: 'Cada oportunidade passa por análise de viabilidade antes de ser apresentada. Trabalhamos por critério definido, não por listagem.',
          cta: 'Definir critérios',
          list: [
            'Análise de viabilidade prévia',
            'Oportunidades fora do mercado aberto',
            'Acompanhamento até à escritura',
          ],
        },
      ],
    },

    videoBand: {
      q: 'Um imóvel vale o que a zona *paga por ele* — não o que o anúncio pede.',
    },

    markets: {
      eyebrow: 'Onde trabalhamos',
      h: 'Mercados onde *operamos.*',
      items: [
        {
          alt: 'Vista aérea de uma povoação costeira sobre falésia',
          d: 'Concentra 17% das transações do Algarve, acima de 2.000 negócios por ano.',
        },
        {
          alt: 'Pátio caiado com piscina e vegetação mediterrânica',
          d: '73% do parque habitacional em residência permanente, com procura estável todo o ano.',
        },
        {
          alt: 'Moradia contemporânea branca com palmeiras e piscina',
          d: 'Valorização de 97,5% em seis anos — a mais elevada da região.',
        },
      ],
    },

    method: {
      eyebrow: 'O método',
      h: 'Como analisamos um *negócio.*',
      steps: [
        { t: 'Originação', d: 'Identificação do negócio junto de proprietários, rede local ou mercado aberto.' },
        { t: 'Dados', d: 'Cruzamento de fontes oficiais para apurar o valor praticado na zona e no período.' },
        { t: 'Verificação', d: 'Visita ao imóvel: estado de conservação, exposição, acessos e potencial de obra.' },
        { t: 'Decisão', d: 'Proposta ou recusa fundamentada, sempre com os números apresentados.' },
      ],
      sourcesLabel: 'Fontes',
    },

    contact: {
      eyebrow: 'Contacto',
      h: 'Apresente-nos o *negócio.*',
      lead: 'Descreva o que tem ou o que procura. Respondemos com uma avaliação fundamentada, incluindo quando a resposta é negativa.',
      direct: [
        { k: 'WhatsApp', v: '+351 935 904 830', href: 'https://wa.me/351935904830' },
        { k: 'Instagram', v: '@themagnaproperties', href: 'https://www.instagram.com/themagnaproperties' },
        { k: 'Licença', v: 'AMI 27435' },
        { k: 'Área', v: 'Algarve — Loulé, Faro, Olhão' },
      ],
      figAlt: 'Moradia contemporânea com piscina de bordo infinito',
      form: {
        title: 'Pedido de análise',
        note: 'Resposta em 24 h úteis.',
        legend: 'Sou',
        owner: 'Proprietário',
        investor: 'Investidor',
        name: 'Nome',
        contact: 'Telefone ou email',
        area: 'Concelho ou zona',
        deal: 'O negócio',
        submit: 'Enviar por WhatsApp',
        fine: 'Abre o WhatsApp com a mensagem já escrita. Nada é guardado neste site.',
        sent: 'Mensagem preparada no WhatsApp. Se não abriu, escreva-nos para +351 935 904 830.',
        errName: 'Diga-nos como o tratar.',
        errContact: 'Precisamos de uma forma de responder.',
        wa: {
          hello: 'Olá Magna Properties,',
          name: 'Nome',
          contact: 'Contacto',
          profile: 'Perfil',
          owner: 'Proprietário',
          investor: 'Investidor',
          area: 'Zona',
        },
      },
    },

    footer: {
      cols: [
        {
          title: 'Site',
          links: [
            { l: 'O que fazemos', h: '#fazemos' },
            { l: 'O método', h: '#metodo' },
            { l: 'Onde trabalhamos', h: '#onde' },
            { l: 'Contacto', h: '#contacto' },
          ],
        },
        {
          title: 'Directo',
          links: [
            { l: 'WhatsApp', h: 'https://wa.me/351935904830', ext: true },
            { l: 'Instagram', h: 'https://www.instagram.com/themagnaproperties', ext: true },
            { l: 'Livro de reclamações', h: 'https://www.livroreclamacoes.pt/inicio', ext: true },
          ],
        },
      ],
      claim: 'Investimento imobiliário no Algarve, decidido com dados reais de transação.',
      rights: 'Magna Properties, Lda. · AMI 27435 · Algarve',
      fine: 'Imagens meramente ilustrativas.',
      up: 'Topo ↑',
    },
  },

  en: {
    skip: 'Skip to content',
    common: { optional: '(optional)' },

    nav: {
      brand: 'Magna Properties — home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menu: 'Menu',
      links: [
        { href: '#fazemos', label: 'What we do' },
        { href: '#metodo', label: 'The method' },
        { href: '#onde', label: 'Where we work' },
        { href: '#contacto', label: 'Contact' },
      ],
      meta: [
        { k: 'Direct', v: '+351 935 904 830', href: 'https://wa.me/351935904830' },
        { k: 'Social', v: 'Instagram', href: 'https://www.instagram.com/themagnaproperties' },
        { k: 'Licence', v: 'AMI 27435' },
      ],
      drawerCta: 'Get in touch',
      langAria: 'Switch language to Portuguese',
    },

    hero: {
      eyebrow: 'Real estate investment · Algarve',
      titleLines: ['Do you own a property', 'or want to invest?', 'Talk to us.'],
      ctaOwner: 'I have a property',
      ctaInvestor: 'I want to invest',
      cue: 'See more',
    },

    approach: {
      eyebrow: 'Approach',
      h: 'Decisions grounded in *transaction data.*',
      p1: 'We assess every opportunity from the price actually paid in the area, not the asking price. Analysis always comes before the proposal — for sellers and buyers alike.',
      p2: 'When the numbers don’t support the deal, we say so. It’s a stance that costs opportunities in the short term and avoids mistakes that are paid for over years.',
    },

    offer: {
      eyebrow: 'What we do',
      h: 'Two starting points, the same *standard.*',
      cards: [
        {
          title: 'For owners',
          alt: 'Terrace and pool of a villa with a covered seating area',
          body: 'We value the property using local transaction data and an on-site visit. When the numbers justify it, we present a direct purchase offer.',
          cta: 'Get a valuation',
          list: [
            'Valuation with transaction data',
            'On-site visit and verification',
            'Direct offer or placement in our network',
          ],
        },
        {
          title: 'For investors',
          alt: 'Facade of a contemporary residential building with a pool',
          body: 'Every opportunity goes through a feasibility analysis before being presented. We work to a defined brief, not a listing.',
          cta: 'Set your criteria',
          list: [
            'Upfront feasibility analysis',
            'Off-market opportunities',
            'Support through to completion',
          ],
        },
      ],
    },

    videoBand: {
      q: 'A property is worth what the area *pays for it* — not what the listing asks.',
    },

    markets: {
      eyebrow: 'Where we work',
      h: 'Markets where we *operate.*',
      items: [
        {
          alt: 'Aerial view of a coastal town on a clifftop',
          d: 'Accounts for 17% of Algarve transactions, over 2,000 deals a year.',
        },
        {
          alt: 'Whitewashed courtyard with a pool and Mediterranean planting',
          d: '73% of the housing stock is primary residence, with steady demand year-round.',
        },
        {
          alt: 'Contemporary white villa with palm trees and a pool',
          d: 'Up 97.5% in six years — the highest in the region.',
        },
      ],
    },

    method: {
      eyebrow: 'The method',
      h: 'How we analyse a *deal.*',
      steps: [
        { t: 'Origination', d: 'Sourcing deals from owners, our local network or the open market.' },
        { t: 'Data', d: 'Cross-referencing official sources to establish the price paid in the area and period.' },
        { t: 'Verification', d: 'On-site visit: condition, exposure, access and renovation potential.' },
        { t: 'Decision', d: 'A reasoned offer or refusal, always with the numbers laid out.' },
      ],
      sourcesLabel: 'Sources',
    },

    contact: {
      eyebrow: 'Contact',
      h: 'Tell us about the *deal.*',
      lead: 'Describe what you have or what you’re looking for. We reply with a reasoned assessment, including when the answer is no.',
      direct: [
        { k: 'WhatsApp', v: '+351 935 904 830', href: 'https://wa.me/351935904830' },
        { k: 'Instagram', v: '@themagnaproperties', href: 'https://www.instagram.com/themagnaproperties' },
        { k: 'Licence', v: 'AMI 27435' },
        { k: 'Area', v: 'Algarve — Loulé, Faro, Olhão' },
      ],
      figAlt: 'Contemporary villa with an infinity-edge pool',
      form: {
        title: 'Request an analysis',
        note: 'Reply within 24 business hours.',
        legend: 'I am',
        owner: 'An owner',
        investor: 'An investor',
        name: 'Name',
        contact: 'Phone or email',
        area: 'Municipality or area',
        deal: 'The deal',
        submit: 'Send via WhatsApp',
        fine: 'Opens WhatsApp with the message ready. Nothing is stored on this site.',
        sent: 'Message ready in WhatsApp. If it didn’t open, write to us at +351 935 904 830.',
        errName: 'Please tell us your name.',
        errContact: 'We need a way to reply.',
        wa: {
          hello: 'Hello Magna Properties,',
          name: 'Name',
          contact: 'Contact',
          profile: 'Profile',
          owner: 'Owner',
          investor: 'Investor',
          area: 'Area',
        },
      },
    },

    footer: {
      cols: [
        {
          title: 'Site',
          links: [
            { l: 'What we do', h: '#fazemos' },
            { l: 'The method', h: '#metodo' },
            { l: 'Where we work', h: '#onde' },
            { l: 'Contact', h: '#contacto' },
          ],
        },
        {
          title: 'Direct',
          links: [
            { l: 'WhatsApp', h: 'https://wa.me/351935904830', ext: true },
            { l: 'Instagram', h: 'https://www.instagram.com/themagnaproperties', ext: true },
            { l: 'Complaints book', h: 'https://www.livroreclamacoes.pt/inicio', ext: true },
          ],
        },
      ],
      claim: 'Real estate investment in the Algarve, decided with real transaction data.',
      rights: 'Magna Properties, Lda. · AMI 27435 · Algarve',
      fine: 'Images for illustration only.',
      up: 'Top ↑',
    },
  },
};

const HTML_LANG = { pt: 'pt-PT', en: 'en' };
const STORAGE_KEY = 'magna-lang';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'pt' || saved === 'en') return saved;
    }
    return 'pt';
  });

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignora */ }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'pt' ? 'en' : 'pt')), []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang tem de ser usado dentro de <LangProvider>');
  return ctx;
}
