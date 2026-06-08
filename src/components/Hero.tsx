import { Link } from "react-router-dom";
import PhotoCloseup from "./PhotoCloseup";
import Avatar, { AvatarGroup } from "./Avatar";
import { AMBASSADORS } from "../data/ambassadors";
import { COMMUNITY_AVATARS } from "../data/avatars";
import "./Hero.css";

export default function Hero() {
  const { football } = AMBASSADORS;

  return (
    <section className="hero bg-grid" aria-labelledby="hero-title">
      <div className="hero__glow hero__glow--green" aria-hidden />
      <div className="hero__glow hero__glow--magenta" aria-hidden />

      <div className="hero__inner container">
        <div className="hero__content">
          <AvatarGroup
            avatars={COMMUNITY_AVATARS.slice(0, 4)}
            extraCount={1999996}
            label="Torcedores e apostadores online agora"
          />

          <p className="hero__badge">
            <span className="hero__badge-dot" aria-hidden />
            Plataforma 100% · Licenciada · Imposto GOV em dia
          </p>

          <h1 id="hero-title" className="hero__title">
            Sua paixão pelo
            <br />
            <span className="hero__title-accent">jogo vira vitória</span>
          </h1>

          <p className="hero__desc">
            Com <strong>{football.name}</strong> na BetShow: odds explosivas,
            cashback e bônus de até <strong>R$ 500</strong> no 1º depósito.
          </p>

          <div className="hero__ctas">
            <Link to="/cadastro" className="btn btn-primary hero__cta-main">
              Ganhar bônus agora
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <a href="#embaixadores" className="btn btn-outline">
              Conhecer embaixadores
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>2M+</strong>
              <span>torcedores ativos</span>
            </div>
            <div>
              <strong>98,7%</strong>
              <span>payout médio</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>suporte humano</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__ambassador hero__ambassador--foot">
            <PhotoCloseup
              src={football.imageHero}
              alt={`${football.name} — garoto propaganda futebol`}
              height={400}
              fades={["left", "bottom"]}
              tint="green"
              ring="cta"
            >
              <div className="hero__amb-label">
                <Avatar src={football.image} alt={football.name} size="md" ring="gold" />
                <div>
                  <span>⚽ Embaixador</span>
                  <strong>{football.name}</strong>
                </div>
              </div>
            </PhotoCloseup>
          </div>

          <div className="hero__card hero__card--live">
            <span className="hero__live">AO VIVO</span>
            <p>Brasileirão · Flamengo x Palmeiras</p>
            <div className="hero__odds">
              <button type="button">1 · 2.10</button>
              <button type="button" className="active">
                X · 3.40
              </button>
              <button type="button">2 · 2.85</button>
            </div>
          </div>

          <div className="hero__float hero__float--bonus">
            <span>🎁</span>
            <div>
              <strong>+500%</strong>
              <small>bônus boas-vindas</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__ticker" aria-hidden>
        <div className="hero__ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i}>
              FUTEBOL · BASQUETE · MMA · TÊNIS · E-SPORTS · VÔLEI · F1 ·
              COPA · CHAMPIONS · NBA · UFC ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
