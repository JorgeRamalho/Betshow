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
  image: string;
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
      "https://images.unsplash.com/photo-1579952363873-27f960b365ec?w=400&q=80&fit=crop&crop=faces",
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
      "https://images.unsplash.com/photo-1517466787929-09156a833c36?w=400&q=80&fit=crop&crop=faces",
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
      "https://images.unsplash.com/photo-1508098682722-e99c43a406a2?w=400&q=80&fit=crop&crop=faces",
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
      "https://images.unsplash.com/photo-1574623452339-49342a45d1f5?w=400&q=80&fit=crop&crop=faces",
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
      "https://images.unsplash.com/photo-1566577731033-469dffedda09?w=400&q=80&fit=crop&crop=faces",
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
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Canais de palpite, podcast esportivo, streamers",
  },
];

export const BASKETBALL_SUGGESTIONS: AmbassadorSuggestion[] = [
  {
    id: "ball-nba-star",
    name: "Perfil: Astro NBA / NBB",
    profile: "Scorer · highlights e lifestyle",
    tier: "A",
    fit: "Empurra odds NBA, live betting e parlay",
    audience: "18–40 · fã NBA",
    image:
      "https://images.unsplash.com/photo-1627627250823-849683127338?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Estilo: referência LeBron, Curry; no BR: estrelas NBB",
  },
  {
    id: "ball-center",
    name: "Perfil: Pivot dominante",
    profile: "Centro · força e presença",
    tier: "A",
    fit: "Visual impactante em close-up com degradê dourado",
    audience: "20–45",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba2cda0?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Estilo: pivots All-Star NBB / WNBA parceiras",
  },
  {
    id: "ball-playmaker",
    name: "Perfil: Armador criativo",
    profile: "PG · assistências e triple-double",
    tier: "B",
    fit: "Conecta com apostas em estatísticas de jogador",
    audience: "18–32",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Estilo: armadores estilo NBA playmaker",
  },
  {
    id: "ball-street",
    name: "Perfil: Streetball / 3x3",
    profile: "Ação urbana · cultura jovem",
    tier: "B",
    fit: "Marca jovem, urban, cores vibrantes do site",
    audience: "16–28",
    image:
      "https://images.unsplash.com/photo-1544298960-1926620c4c82?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Circuitos 3x3, Red Bull, creators streetball BR",
  },
  {
    id: "ball-coach-icon",
    name: "Perfil: Técnico / comentarista",
    profile: "Voz tática · credibilidade TV",
    tier: "B",
    fit: "Confiança para cashback e regras de bônus",
    audience: "30–55",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Ex-treinadores e narradores ESPN/Band",
  },
  {
    id: "ball-female",
    name: "Perfil: Estrela basquete feminino",
    profile: "LF · diversidade e crescimento",
    tier: "A",
    fit: "Amplia base feminina e simpatia da marca",
    audience: "18–45",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&fit=crop&crop=faces",
    marketRef: "Estilo: referência WNBA/NBB feminino em alta",
  },
];
