import PhotoCloseup from "./PhotoCloseup";
import Avatar from "./Avatar";
import { AMBASSADORS } from "../data/ambassadors";
import "./Ambassadors.css";

export default function Ambassadors() {
  const { football } = AMBASSADORS;

  return (
    <section className="ambassadors" id="embaixadores" aria-labelledby="amb-title">
      <div className="ambassadors__bg-gradient" aria-hidden />
      <div className="container">
        <header className="ambassadors__header">
          <p className="ambassadors__eyebrow">Garotos propaganda · Rostos da marca</p>
          <h2 id="amb-title" className="section-title">
            Ícones que <span>confiam na BetShow</span>
          </h2>
          <p className="section-sub">
            Close-ups com degradê de marca — os maiores nomes do futebol abraçam a
            plataforma e criam simpatia instantânea.
          </p>
        </header>

        <div className="ambassadors__showcase ambassadors__showcase--single">
          <article className="ambassadors__hero-card ambassadors__hero-card--foot">
            <PhotoCloseup
              src={football.imageHero}
              alt={`${football.name} — embaixador de futebol BetShow`}
              height={520}
              fades={["left", "bottom"]}
              tint="green"
              ring="cta"
              className="ambassadors__photo"
            >
              <div className="ambassadors__caption">
                <span className="ambassadors__sport">⚽ {football.sport}</span>
                <Avatar
                  src={football.image}
                  alt={football.name}
                  size="lg"
                  ring="gold"
                  className="ambassadors__mini-avatar"
                />
                <h3>{football.name}</h3>
                <p className="ambassadors__role">{football.role}</p>
                <p className="ambassadors__tag">{football.tagline}</p>
                <blockquote>“{football.quote}”</blockquote>
                <a href="#cadastro" className="btn btn-primary">
                  Apostar como {football.name.split(" ")[0]}
                </a>
              </div>
            </PhotoCloseup>
          </article>
        </div>

        <p className="ambassadors__disclaimer">
          Nomes e imagens ilustrativos para layout — substitua pelo atleta
          contratado e direitos de imagem oficiais.
        </p>
      </div>
    </section>
  );
}
