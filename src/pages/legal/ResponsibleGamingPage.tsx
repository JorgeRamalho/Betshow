import { Link } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import LegalNav from "../../components/legal/LegalNav";
import PageMeta from "../../components/PageMeta";
import { BRAND } from "../../data/brand";
import "../../styles/legal.css";

export default function ResponsibleGamingPage() {
  return (
    <div className="legal-page" id="main">
      <PageMeta
        title="Jogo Responsável"
        description="Política de jogo responsável da BetShow — limites, autoexclusão, sinais de alerta e canais de apoio."
      />
      <article className="legal-page__card">
        <LegalNav current="jogo-responsavel" />

        <Logo size="md" />
        <h1>Jogo Responsável</h1>
        <p className="legal-page__updated">Última atualização: 7 de agosto de 2026</p>

        <p>
          A {BRAND.name} acredita que apostas esportivas devem ser uma forma de
          entretenimento. Apostar nunca deve comprometer sua saúde financeira, emocional
          ou familiar. Esta página descreve ferramentas e recursos para manter o controle.
        </p>

        <h2>1. Compromisso da plataforma</h2>
        <ul>
          <li>Proibição de cadastro para menores de 18 anos.</li>
          <li>Verificação de identidade (CPF/KYC) em conformidade com a Lei 14.790/2023.</li>
          <li>Ferramentas de limites de depósito, perda e tempo de sessão.</li>
          <li>Opção de autoexclusão temporária ou permanente.</li>
          <li>Comunicação clara sobre riscos financeiros em toda a plataforma.</li>
        </ul>

        <h2>2. Sinais de alerta</h2>
        <p>Procure ajuda se você:</p>
        <ul>
          <li>Aposta mais do que pode perder ou usa dinheiro destinado a contas essenciais.</li>
          <li>Sente necessidade de recuperar perdas apostando mais (perseguição de perdas).</li>
          <li>Esconde suas apostas de familiares ou amigos.</li>
          <li>Apostar afeta seu trabalho, estudos ou relacionamentos.</li>
          <li>Sente ansiedade, irritação ou depressão relacionados a apostas.</li>
        </ul>

        <h2>3. Ferramentas de controle</h2>
        <ul>
          <li>
            <strong>Limites de depósito:</strong> defina valores diários, semanais ou mensais
            na área da conta.
          </li>
          <li>
            <strong>Limites de perda:</strong> bloqueie apostas após atingir o teto definido.
          </li>
          <li>
            <strong>Pausa na conta:</strong> suspenda o acesso por 24h, 7 dias ou 30 dias.
          </li>
          <li>
            <strong>Autoexclusão:</strong> encerre o acesso por período determinado ou
            permanentemente, mediante solicitação ao suporte.
          </li>
          <li>
            <strong>Histórico transparente:</strong> consulte apostas, depósitos e saques no
            dashboard.
          </li>
        </ul>

        <h2>4. Proteção de menores</h2>
        <p>
          Apostas são estritamente proibidas para menores de 18 anos. Pais e responsáveis
          devem utilizar controles parentais em dispositivos e nunca compartilhar credenciais
          de acesso com menores.
        </p>

        <h2>5. Canais de apoio no Brasil</h2>
        <ul>
          <li>
            <strong>CVV — Centro de Valorização da Vida:</strong> ligue 188 (24h, gratuito).
          </li>
          <li>
            <strong>Jogadores Anônimos (JA):</strong> grupos de apoio presenciais e online —
            consulte jogadoresanonimos.org.br.
          </li>
          <li>
            <strong>CAPS — Centros de Atenção Psicossocial:</strong> atendimento pelo SUS na
            sua cidade.
          </li>
        </ul>

        <h2>6. Como solicitar ajuda na {BRAND.name}</h2>
        <p>
          Entre em contato com o suporte 24/7 pela central do site, ouvidoria ou telefone
          0800 indicado no rodapé. Para autoexclusão imediata, informe sua matrícula e CPF
          cadastrados.
        </p>

        <h2>7. Recursos relacionados</h2>
        <p>
          Leia também os{" "}
          <Link to="/termos" style={{ color: "var(--neon-green)" }}>
            Termos de Uso
          </Link>
          , a{" "}
          <Link to="/privacidade" style={{ color: "var(--neon-green)" }}>
            Política de Privacidade
          </Link>{" "}
          e a{" "}
          <Link to="/cookies" style={{ color: "var(--neon-green)" }}>
            Política de Cookies
          </Link>
          .
        </p>

        <p className="legal-page__note">
          Conteúdo informativo para demonstração. Em operação real, integre ferramentas de
          jogo responsável exigidas pelo regulador e parceiros certificados.
        </p>
      </article>
    </div>
  );
}
