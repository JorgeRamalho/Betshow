import PhotoCloseup from "./PhotoCloseup";
import { AvatarGroup } from "./Avatar";
import { COMMUNITY_AVATARS } from "../data/avatars";
import "./FamilyClub.css";

export default function FamilyClub() {
  return (
    <section className="family" aria-labelledby="family-title">
      <div className="container family__inner">
        <div className="family__visual">
          <PhotoCloseup
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=80&fit=crop&crop=faces"
            alt="Amigos torcendo — close com degradê BetShow"
            height={400}
            fades={["left", "bottom"]}
            tint="gold"
            ring="gold"
          />
          <div className="family__avatar-row">
            <AvatarGroup
              avatars={COMMUNITY_AVATARS}
              label="Sua torcida, seu clube"
            />
          </div>
        </div>

        <div className="family__content">
          <h2 id="family-title" className="section-title">
            Ambiente <span>familiar</span>, emoção de estádio
          </h2>
          <p className="section-sub">
            Rostos reais na comunidade — criamos afinidade para torcedores,
            simpatizantes e quem aposta com responsabilidade.
          </p>

          <ul className="family__list">
            <li>
              <strong>Salas de torcida</strong> — chat ao vivo por time e por jogo
            </li>
            <li>
              <strong>Ranking social</strong> — compare palpites com amigos, sem pressão
            </li>
            <li>
              <strong>Jogo responsável</strong> — limites, pausas e suporte 24/7
            </li>
            <li>
              <strong>Programa fidelidade</strong> — pontos em cada aposta válida
            </li>
          </ul>

          <a href="#cadastro" className="btn btn-gold">
            Entrar no clube grátis
          </a>
        </div>
      </div>
    </section>
  );
}
