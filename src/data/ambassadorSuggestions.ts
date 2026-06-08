/**
 * Sugestões de perfis para garoto propaganda — contrate atleta/influencer com direito de imagem.
 * Nomes abaixo são personas de layout; troque pelo contratado.
 */

export type AmbassadorSuggestion = {
  id: string;
  name: string;
  profile: string;
  tier: "A" | "B" | "C";
  fit: string;
  audience: string;
  /** Avatar circular no corpo do card */
  image: string;
  /** Rostos/figuras no fundo do bloco (visual superior) */
  backgroundImage: string;
  /** Referência de mercado (categoria, não contrato) */
  marketRef: string;
};

export const FOOTBALL_SUGGESTIONS: AmbassadorSuggestion[] = [
  {
    id: "foot-striker",
    name: "Perfil: Artilheiro ídolo",
    profile: "Atacante · gols e celebrações virais",
    tier: "A",
    fit: "Converte torcedor emocionado; ideal para bônus de gol e apostas ao vivo",
    audience: "18–35 · massa Série A e Champions",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f960b365ec?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1431324155629-1a6eb1b81ebb?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: craque com +15M seguidores (ex.: referência Neymar, Gabigol)",
  },
  {
    id: "foot-goalkeeper",
    name: "Perfil: Goleiro confiança",
    profile: "Goleiro · defesas decisivas",
    tier: "A",
    fit: "Mensagem de site seguro, CPF verificado e apostas protegidas",
    audience: "25–45 · famílias e apostadores conservadores",
    image:
      "https://images.unsplash.com/photo-1517466787929-09156a833c36?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: referência Alisson, Ederson — credibilidade",
  },
  {
    id: "foot-captain",
    name: "Perfil: Capitão líder",
    profile: "Volante/meia · voz de vestiário",
    tier: "B",
    fit: "Tom responsável + jogo consciente; bom para compliance GOV",
    audience: "28–50",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406a2?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1577215205642-2ab98d7b77c6?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: capitães de seleção e clubes grandes",
  },
  {
    id: "foot-youth",
    name: "Perfil: Revelação Sub-23",
    profile: "Jovem promessa · hype redes",
    tier: "B",
    fit: "Atrai primeiro cadastro e público TikTok/Reels",
    audience: "16–28",
    image:
      "https://images.unsplash.com/photo-1574623452339-49342a45d1f5?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1517927033932-fbf691732d81?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: joias do Brasileirão e europeus em ascensão",
  },
  {
    id: "foot-legend",
    name: "Perfil: Lenda aposentada",
    profile: "Ícone 90/00 · nostalgia",
    tier: "B",
    fit: "Autoridade da marca; campanhas TV e YouTube longo",
    audience: "35–60",
    image:
      "https://images.unsplash.com/photo-1566577731033-469dffedda09?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: ex-Copa do Mundo e Libertadores (Rivaldo, Kaká tier)",
  },
  {
    id: "foot-creator",
    name: "Perfil: Creator futebol",
    profile: "Influencer · palpites e reacts",
    tier: "C",
    fit: "Custo menor; alto ROI em tráfego pago e afiliados",
    audience: "18–34",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Canais de palpite, podcast esportivo, streamers",
  },
  {
    id: "foot-master-league",
    name: "Perfil: Master League",
    profile: "Elite internacional · Champions e ligas premium",
    tier: "A",
    fit: "Posiciona a BetShow como casa das grandes competições e mercados de elite",
    audience: "22–45 · torcedores experientes e apostadores de alto ticket",
    image:
      "https://images.unsplash.com/photo-1593341646782-e0b495cff961?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1459866232614-755658eee698?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: embaixadores ligados à Champions, Premier League e Libertadores",
  },
  {
    id: "foot-rising-star",
    name: "Perfil: Rumo ao Estrelato",
    profile: "Reality esportivo · jornada do aspirante ao profissional",
    tier: "B",
    fit: "Narrativa emocional de superação; ideal para séries, bastidores e primeiro cadastro",
    audience: "16–30 · Gen Z e fãs de reality esportivo",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a1155a69d95?w=120&h=120&fit=crop&crop=face",
    backgroundImage:
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=400&fit=crop&crop=faces",
    marketRef: "Estilo: formatos documentário, academias, seleções Sub-20 e talent shows",
  },
];
