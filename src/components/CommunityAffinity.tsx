import Avatar, { AvatarGroup } from "./Avatar";
import PhotoCloseup from "./PhotoCloseup";
import { COMMUNITY_AVATARS, SUPPORT_AVATAR } from "../data/avatars";
import "./CommunityAffinity.css";

const TESTIMONIALS = [
  {
    name: "Pedro, SP",
    text: "Me sinto em casa. O avatar do suporte responde na hora.",
    avatar: COMMUNITY_AVATARS[0],
  },
  {
    name: "Camila, RJ",
    text: "Cashback toda segunda — já virou tradição com as amigas.",
    avatar: COMMUNITY_AVATARS[3],
  },
];

export default function CommunityAffinity() {
  return (
    <section className="affinity" aria-labelledby="affinity-title">
      <div className="container affinity__inner">
        <div className="affinity__faces">
          <PhotoCloseup
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80&fit=crop&crop=faces"
            alt="Modelo fitness — comunidade BetShow"
            height={380}
            fades={["left", "bottom"]}
            tint="magenta"
            ring="magenta"
          />
          <div className="affinity__model-badge">
            <Avatar src={SUPPORT_AVATAR.src} alt={SUPPORT_AVATAR.alt} size="md" ring="cyan" />
            <span>Sua gerente VIP</span>
          </div>
        </div>

        <div className="affinity__content">
          <h2 id="affinity-title" className="section-title">
            Avatares que criam <span>simpatia real</span>
          </h2>
          <p className="section-sub">
            Rostos humanos em cada touchpoint — do chat ao ranking — para o
            apostador sentir proximidade com a marca, não só com odds frias.
          </p>

          <AvatarGroup
            avatars={COMMUNITY_AVATARS}
            extraCount={1999995}
            label={
              <>
                <strong>+2 milhões</strong> de perfis com foto · comunidade ativa agora
              </>
            }
          />

          <ul className="affinity__testimonials">
            {TESTIMONIALS.map((t) => (
              <li key={t.name}>
                <Avatar src={t.avatar.src} alt={t.avatar.alt} size="md" ring="green" />
                <div>
                  <p>“{t.text}”</p>
                  <cite>— {t.name}</cite>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
