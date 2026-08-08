import { Link } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import LegalNav from "../../components/legal/LegalNav";
import PageMeta from "../../components/PageMeta";
import { BRAND } from "../../data/brand";
import "../../styles/legal.css";

export default function TermsOfUsePage() {
  return (
    <div className="legal-page" id="main">
      <PageMeta
        title="Termos de Uso"
        description="Termos de uso da plataforma BetShow — regras de cadastro, apostas, bônus e responsabilidades do usuário."
      />
      <article className="legal-page__card">
        <LegalNav current="termos" />

        <Logo size="md" />
        <h1>Termos de Uso</h1>
        <p className="legal-page__updated">Última atualização: 7 de agosto de 2026</p>

        <p>
          Estes Termos de Uso regulam o acesso e a utilização da plataforma {BRAND.name},
          operada em conformidade com a Lei nº 14.790/2023 (apostas de quota fixa). Ao
          criar uma conta ou utilizar os serviços, você declara ter lido, compreendido e
          aceito integralmente estas condições.
        </p>

        <h2>1. Elegibilidade</h2>
        <ul>
          <li>Ser maior de 18 anos e residente em território onde o serviço é permitido.</li>
          <li>Fornecer dados verdadeiros, incluindo CPF válido e verificação de identidade (KYC).</li>
          <li>Não possuir conta duplicada ou compartilhar credenciais de acesso.</li>
        </ul>

        <h2>2. Cadastro e conta</h2>
        <p>
          O cadastro exige informações pessoais, de contato e de pagamento. A {BRAND.name}
          pode solicitar documentos adicionais para verificação. Contas incompletas ou
          suspeitas de fraude podem ser suspensas.
        </p>

        <h2>3. Apostas e pagamentos</h2>
        <ul>
          <li>Odds, mercados e resultados são exibidos em tempo real e podem variar.</li>
          <li>Depósitos e saques seguem os métodos disponíveis (PIX, cartão, transferência).</li>
          <li>Bônus, cashback e promoções possuem regras específicas de rollover e validade.</li>
          <li>A plataforma não garante lucro — apostas envolvem risco financeiro.</li>
        </ul>

        <h2>4. Bônus e promoções</h2>
        <p>
          Ofertas como o código {BRAND.promoCode} e bônus de {BRAND.welcomeBonus} estão
          sujeitas a termos promocionais. Abuso de promoções, múltiplas contas ou
          arbitragem pode resultar em cancelamento de bônus e encerramento da conta.
        </p>

        <h2>5. Conduta do usuário</h2>
        <p>É proibido:</p>
        <ul>
          <li>Utilizar bots, scripts ou qualquer meio automatizado para apostar.</li>
          <li>Lavagem de dinheiro, fraude ou manipulação de resultados.</li>
          <li>Violar leis locais ou regulamentação de apostas.</li>
        </ul>

        <h2>6. Propriedade intelectual</h2>
        <p>
          Marcas, logotipos, layout e conteúdo da {BRAND.name} são protegidos. É vedada a
          reprodução sem autorização prévia.
        </p>

        <h2>7. Limitação de responsabilidade</h2>
        <p>
          A {BRAND.name} não se responsabiliza por interrupções de serviço, falhas de
          terceiros (pagamentos, internet) ou perdas decorrentes de apostas. Consulte a{" "}
          <Link to="/jogo-responsavel" style={{ color: "var(--neon-green)" }}>
            política de jogo responsável
          </Link>
          .
        </p>

        <h2>8. Encerramento</h2>
        <p>
          Você pode solicitar o encerramento da conta a qualquer momento. A {BRAND.name}
          pode encerrar ou suspender contas que violem estes termos ou exigências legais.
        </p>

        <h2>9. Alterações</h2>
        <p>
          Estes termos podem ser atualizados. Alterações relevantes serão comunicadas por
          e-mail ou aviso na plataforma. O uso continuado após a publicação implica aceite.
        </p>

        <h2>10. Lei aplicável</h2>
        <p>
          Estes termos são regidos pelas leis da República Federativa do Brasil. Foro da
          comarca do domicílio do usuário, quando aplicável pela legislação consumerista.
        </p>

        <p className="legal-page__note">
          Conteúdo informativo para demonstração da plataforma {BRAND.name}. Em operação
          real, revise com assessoria jurídica e adapte CNPJ, licenças e canais oficiais.
        </p>
      </article>
    </div>
  );
}
