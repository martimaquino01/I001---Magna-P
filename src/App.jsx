import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Approach from './components/Approach.jsx';
import Offer from './components/Offer.jsx';
import VideoBand from './components/VideoBand.jsx';
import Markets from './components/Markets.jsx';
import Method from './components/Method.jsx';
import Band from './components/Band.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // partilhado entre os CTAs e o formulário: um clique em "Quero investir"
  // deixa o formulário já no perfil certo.
  const [perfil, setPerfil] = useState('proprietario');

  return (
    <>
      <a className="skip" href="#main">Saltar para o conteúdo</a>
      <Nav />
      <main id="main">
        {/* ritmo: escuro → claro → claro → vídeo → claro → petróleo → gradiente → escuro */}
        <Hero onPick={setPerfil} />
        <Approach />
        <Offer onPick={setPerfil} />
        <VideoBand />
        <Markets />
        <Method />
        <Band />
        <Contact perfil={perfil} onPick={setPerfil} />
      </main>
      <Footer />
    </>
  );
}
