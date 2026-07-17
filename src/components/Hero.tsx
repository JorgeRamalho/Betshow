import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AvatarGroup } from "./Avatar";
import { AMBASSADORS } from "../data/ambassadors";
import { COMMUNITY_AVATARS } from "../data/avatars";
import "./Hero.css";

const HERO_SPORTS = [
  {
    label: "Futebol",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80&fit=crop",
  },
  {
    label: "Basquete",
    src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80&fit=crop",
  },
  {
    label: "Tênis",
    src: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=80&fit=crop",
  },
  {
    label: "MMA",
    src: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&q=80&fit=crop",
  },
  {
    label: "E-Sports",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&fit=crop",
  },
  {
    label: "Automobilismo",
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&fit=crop",
  },
  {
    label: "Vôlei",
    src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=900&q=80&fit=crop",
  },
  {
    label: "Estádio",
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900&q=80&fit=crop",
  },
  {
    label: "Bola em jogo",
    src: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=900&q=80&fit=crop",
  },
  {
    label: "Natação",
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80&fit=crop",
  },
] as const;

const CAROUSEL_INTERVAL_MS = 4000;

export default function Hero() {
  const { football } = AMBASSADORS;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SPORTS.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

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
            <a href="#odds" className="btn btn-outline">
              Ver odds ao vivo
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
          <div
            className="hero__carousel"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Imagens de esportes"
          >
            <div className="hero__carousel-frame">
              {HERO_SPORTS.map((sport, index) => (
                <figure
                  key={sport.label}
                  className={`hero__carousel-slide${
                    index === activeSlide ? " hero__carousel-slide--active" : ""
                  }`}
                  aria-hidden={index !== activeSlide}
                >
                  <img src={sport.src} alt="" />
                  <figcaption className="hero__carousel-label">{sport.label}</figcaption>
                </figure>
              ))}
            </div>

            <div className="hero__carousel-dots" role="tablist" aria-label="Slides do carrossel">
              {HERO_SPORTS.map((sport, index) => (
                <button
                  key={sport.label}
                  type="button"
                  role="tab"
                  aria-selected={index === activeSlide}
                  aria-label={`Ver ${sport.label}`}
                  className={`hero__carousel-dot${
                    index === activeSlide ? " hero__carousel-dot--active" : ""
                  }`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>

          <div className="hero__card hero__card--live">
            <span className="hero__live">AO VIVO</span>
            <p className="hero__match-league">Brasileirão</p>
            <p className="hero__match-teams">Flamengo x Palmeiras</p>
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
    </section>
  );
}
