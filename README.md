# Magna Properties — site

React + Vite. Sem bibliotecas de animação, sem framework de CSS — só React, um ficheiro de
estilos e três hooks.

```
index.html                  entrada do Vite
vite.config.js
src/
  main.jsx
  App.jsx
  styles/global.css         tokens, tipografia e todas as secções
  assets/texture-wool.jpg   fundo do menu lateral (empacotado pelo Vite)
  hooks/useMotion.js        useReducedMotion · useInView · useRafScroll
  components/
    Motion.jsx              Reveal · Split · Stat
    Logo.jsx  Nav.jsx  Hero.jsx  Approach.jsx  Offer.jsx
    Method.jsx  Markets.jsx  Band.jsx  Contact.jsx  Footer.jsx
public/
  favicon.svg
  img/     6 fotos + 2 posters + poster do hero
  video/   hero-1080 · hero-720 · loop-costa · loop-litoral
legacy-static/              versão anterior em HTML puro — pode apagar
16638089_3840_2160_30fps.mp4  original 4K (19,9 MB), não é servido
pexels-eva-bronzini-7599716.jpg  original 4000×6000 da textura, não é servido
```

## Media

**Nenhum ficheiro se repete no site.** São 9 peças distintas:

| Ficheiro | Onde | Origem |
|---|---|---|
| `video/hero-1080.mp4` · `hero-720.mp4` | hero | vídeo do cliente (o 4K da raiz, recomprimido) |
| `img/p-terraco.jpg` | cartão "Para proprietários" | Pexels |
| `img/p-torre.jpg` | cartão "Para investidores" | Pexels |
| `img/p-costa.jpg` | mercado Loulé | Pexels |
| `img/p-patio.jpg` | mercado Faro | Pexels |
| `img/p-villa.jpg` | mercado Olhão | Pexels |
| `img/p-infinity.jpg` | contacto | Pexels |
| `video/loop-costa.mp4` | faixa full-bleed | Pexels |
| `video/loop-litoral.mp4` | método (vertical) | Pexels |

**Licença Pexels:** utilização livre, incluindo comercial, sem atribuição obrigatória.
Não é permitido revender as imagens tal como estão nem sugerir que os autores
subscrevem a marca. Nada disso se aplica aqui.

**Gradação.** O stock vem em azul de meio-dia e batia de frente com a paleta quente do
site. Todas as peças levaram o mesmo tratamento de "hora dourada" via ffmpeg
(`eq` + `colorbalance` + `curves` no canal azul), o que as unifica sem parecer filtro.
O comando está em `scripts/` do histórico — para acrescentar media nova, aplique a mesma
gradação para manter a coerência.

## Correr

```powershell
npm install
npm run dev          # http://localhost:5173
npm run build        # → dist/
npm run preview      # serve o dist
```

O `base` está em `'./'`, por isso o `dist/` funciona tanto na raiz de um domínio como
numa subpasta (GitHub Pages incluído). Para publicar, é o conteúdo de `dist/`.

---

## Sistema de desenho

**Paleta** — cada cor com uma função, não como decoração:

| Token | Cor | Onde |
|---|---|---|
| `--teal` | `#335C67` | secção do método, topo do gradiente |
| `--butter` | `#FFF3B0` | acentos claros, diagonal do monograma |
| `--amber` | `#E09F3E` | acção — botões, acentos sobre escuro |
| `--brick` | `#9E2A2B` | números e palavras de acento sobre claro |
| `--maroon` | `#540B0E` | base do gradiente, texto sobre âmbar |

**O pôr-do-sol é a estrutura, não um filtro.** As secções descem do escuro para o claro e
voltam a fechar: hero → areia → verde-petróleo → areia → faixa de gradiente → tinta →
rodapé. O mesmo gradiente aparece no filete do hero, no topo de cada mercado e no remate
do rodapé.

**Forma** — `border-radius: 0` em todo o lado.

**Tipografia** — **Open Sans** faz tudo: títulos, corpo, interface, números. Os títulos
usam o peso 300 com `letter-spacing` apertado, o que dá presença sem aumentar o corpo de
letra. Valores reais em desktop: h1 ~56px, h2 ~38px, corpo 15,5px. Números com
`tabular-nums`.

A **Instrument Serif** itálica é o único elemento decorativo e aparece em dois sítios
apenas — a palavra de acento de cada título (`*assim*` no JSX) e o "Properties" do
logótipo. É deliberadamente discreta: se der por ela antes de ler o título, está a ser
usada demais. Para acrescentar um acento novo, envolva a palavra em asteriscos no
componente `<Split>`; não aplique `--serif` a blocos inteiros.

## Animações

Discretas e todas em `transform`/`opacity`, dentro de `requestAnimationFrame`:

- `<Reveal>` — bloco que sobe 18px e aparece ao entrar no ecrã.
- `<Split>` — título que sobe palavra a palavra. Envolver um troço em asteriscos pinta-o
  com a cor de acento: `Dados de *transação.*`
- `<Stat>` — contador com formatação pt-PT (`+97,5%`).
- Hero: título linha a linha na montagem, parallax discreto no vídeo.
- Faixa do pôr-do-sol: parallax do gradiente.
- Mercados: filete de gradiente que se estende ao revelar.

`prefers-reduced-motion` desliga o movimento e nada fica escondido à espera de uma
animação que não vai correr.

### Duas armadilhas que vale a pena não repetir

1. **`clip-path` no próprio alvo mata o IntersectionObserver.** Um elemento com
   `clip-path: inset(0 0 100% 0)` devolve `isIntersecting: false` no Chromium — a
   revelação nunca dispara. Está anotado em `useInView`.
2. **Cortina de revelação vs. reprodução.** `LoopVideo` usa dois estados: `inView` liga e
   desliga o vídeo com o scroll, mas a cortina abre uma vez e fica (`revealed`). Ligar a
   cortina a `inView` faz o vídeo voltar a ficar tapado sempre que sai do ecrã.
3. **Ids duplicados.** O input de contacto chama-se `contacto-campo` porque a secção já
   usa `#contacto`; com o mesmo id, o `<label>` e o foco de erro apontam para a secção.

## Conteúdo e integrações

- **Formulário → WhatsApp.** Não há backend. O formulário compõe a mensagem e abre
  `wa.me/351935904830` com o texto já escrito. Nada é guardado nem enviado a terceiros.
  O perfil (proprietário/investidor) é estado partilhado em `App.jsx`: clicar num CTA do
  hero deixa o formulário já no perfil certo.
- **Vídeo.** `preload="none"`; a fonte é escolhida pela largura do ecrã e respeita
  `Save-Data`. O poster aparece de imediato.
- **Dados de mercado** (17% Loulé, 73% Faro, +97,5% Olhão) e as fontes citadas (INE,
  Confidencial Imobiliário, PORDATA, Censos) vêm do site actual.

## Por fechar

- Os links legais do rodapé (termos, privacidade, cookies, gestão de dados, RAL) apontam
  para `#`. As páginas ainda não existem. O Livro de Reclamações já liga ao site oficial.
- **Todo o media é ilustrativo, nenhum é da carteira.** O rodapé di-lo em letra pequena e
  convém manter enquanto assim for. Atenção especial aos cartões de mercado: as imagens
  sob "Loulé", "Faro" e "Olhão" são arquitectura e litoral genéricos, **não** fotografia
  desses concelhos. Um visitante pode lê-las como documentais. Substituir por fotografia
  local é a melhoria com mais retorno que este site pode ter.
- Sem analytics nem banner de cookies. Como está, o site não põe cookies nem guarda nada,
  por isso não precisa de banner. Se acrescentar analytics, passa a precisar.
- Sem `og:image` dedicada — está a usar o poster do vídeo.
