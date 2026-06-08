import Avatar from "./Avatar";
import {
  FOOTBALL_SUGGESTIONS,
  type AmbassadorSuggestion,
} from "../data/ambassadorSuggestions";
import "./AmbassadorSuggestions.css";

function SuggestionCard({ item }: { item: AmbassadorSuggestion }) {
  return (
    <article className="suggest-card">
      <div className="suggest-card__visual">
        <img src={item.backgroundImage} alt="" loading="lazy" />
        <div className="suggest-card__fade" aria-hidden />
        <span className={`suggest-card__tier suggest-card__tier--${item.tier.toLowerCase()}`}>
          Tier {item.tier}
        </span>
      </div>
      <div className="suggest-card__body">
        <Avatar src={item.image} alt={item.name} size="sm" ring="green" />
        <h4>{item.name}</h4>
        <p className="suggest-card__profile">{item.profile}</p>
        <p className="suggest-card__fit">{item.fit}</p>
        <p className="suggest-card__audience">
          <strong>Público:</strong> {item.audience}
        </p>
        <p className="suggest-card__ref">{item.marketRef}</p>
      </div>
    </article>
  );
}

function SuggestionGrid({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: AmbassadorSuggestion[];
}) {
  return (
    <div className="suggest-block">
      <h3 className="suggest-block__title">
        {icon} {title}
      </h3>
      <div className="suggest-block__grid">
        {items.map((item) => (
          <SuggestionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function AmbassadorSuggestions() {
  return (
    <section
      className="suggest"
      id="sugestoes-embaixadores"
      aria-labelledby="suggest-title"
    >
      <div className="container">
        <header className="suggest__header">
          <h2 id="suggest-title" className="section-title">
            Outras ideias de <span>garoto propaganda</span>
          </h2>
          <p className="section-sub">
            Perfis recomendados para contrato — combine tier de investimento com
            o público que você quer atrair. Troque fotos e nomes após fechar com
            o atleta ou influencer.
          </p>
        </header>

        <SuggestionGrid
          title="Futebol — 8 perfis"
          icon="⚽"
          items={FOOTBALL_SUGGESTIONS}
        />

        <aside className="suggest__tip">
          <strong>Como escolher:</strong> Tier A = máximo alcance e licença cara ·
          Tier B = equilíbrio custo/impacto · Tier C = volume digital e afiliados.
          Para produção, edite <code>src/data/ambassadors.ts</code> com o contratado.
        </aside>
      </div>
    </section>
  );
}
