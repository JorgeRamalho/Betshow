import { Link } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import { BRAND } from "../../data/brand";
import "../../styles/legal.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <article className="legal-page__card">
        <div className="legal-page__nav">
          <Link to="/" className="legal-page__back">
            ← Voltar ao início
          </Link>
          <div className="legal-page__links">
            <Link to="/privacidade" aria-current="page">
              Privacidade
            </Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>

        <Logo size="md" />
        <h1>Política de Privacidade</h1>
        <p className="legal-page__updated">Última atualização: 17 de julho de 2026</p>

        <p>
          Esta Política de Privacidade descreve como a {BRAND.name} coleta, usa,
          armazena e protege dados pessoais de usuários da plataforma de apostas
          esportivas, em conformidade com a Lei Geral de Proteção de Dados
          (LGPD — Lei nº 13.709/2018) e com a regulamentação de apostas (Lei nº
          14.790/2023).
        </p>

        <h2>1. Controlador dos dados</h2>
        <p>
          O controlador dos dados pessoais é a {BRAND.name}. Em caso de dúvidas
          sobre privacidade, utilize os canais de suporte disponíveis no site ou
          o e-mail de contato indicado na plataforma.
        </p>

        <h2>2. Dados que coletamos</h2>
        <ul>
          <li>
            <strong>Identificação e cadastro:</strong> nome completo, CPF, data
            de nascimento, e-mail, telefone e endereço.
          </li>
          <li>
            <strong>Conta e autenticação:</strong> senha (armazenada de forma
            segura), matrícula e status de verificação KYC.
          </li>
          <li>
            <strong>Financeiros:</strong> método de pagamento, chave PIX,
            histórico de depósitos, saques e apostas.
          </li>
          <li>
            <strong>Navegação e dispositivo:</strong> IP, tipo de navegador,
            páginas visitadas e dados técnicos para segurança e desempenho.
          </li>
          <li>
            <strong>Cookies e tecnologias similares:</strong> conforme a{" "}
            <Link to="/cookies" style={{ color: "var(--neon-green)" }}>
              Política de Cookies
            </Link>
            .
          </li>
        </ul>

        <h2>3. Finalidades do tratamento</h2>
        <ul>
          <li>Criar e gerenciar a conta do usuário.</li>
          <li>Verificar identidade (CPF/KYC) e cumprir obrigações legais.</li>
          <li>Processar apostas, pagamentos, bônus e cashback.</li>
          <li>Prevenir fraude, lavagem de dinheiro e uso indevido da plataforma.</li>
          <li>Enviar comunicações operacionais e, com consentimento, ofertas.</li>
          <li>Melhorar a experiência, segurança e desempenho do site.</li>
        </ul>

        <h2>4. Bases legais (LGPD)</h2>
        <p>
          Tratamos dados com base em execução de contrato, cumprimento de
          obrigação legal/regulatória, legítimo interesse (segurança e melhoria
          do serviço) e consentimento, quando aplicável (por exemplo, cookies
          não essenciais e marketing).
        </p>

        <h2>5. Compartilhamento de dados</h2>
        <p>
          Podemos compartilhar dados com prestadores de pagamento, verificação
          de identidade, hospedagem e autoridades competentes, sempre nos
          limites da lei. Não vendemos dados pessoais a terceiros.
        </p>

        <h2>6. Retenção e segurança</h2>
        <p>
          Mantemos os dados pelo tempo necessário às finalidades informadas e
          às exigências legais. Adotamos medidas técnicas e organizacionais
          razoáveis, incluindo criptografia em trânsito (SSL/TLS) e controles
          de acesso.
        </p>

        <h2>7. Direitos do titular</h2>
        <p>Você pode solicitar, nos termos da LGPD:</p>
        <ul>
          <li>Confirmação e acesso aos dados.</li>
          <li>Correção de dados incompletos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação, quando cabível.</li>
          <li>Portabilidade e informação sobre compartilhamentos.</li>
          <li>Revogação do consentimento, quando o tratamento se basear nele.</li>
        </ul>

        <h2>8. Menores de idade</h2>
        <p>
          A plataforma é exclusiva para maiores de 18 anos. Não coletamos
          intencionalmente dados de menores. Contas identificadas como de
          menores serão bloqueadas.
        </p>

        <h2>9. Alterações desta política</h2>
        <p>
          Podemos atualizar esta política periodicamente. A versão vigente
          estará sempre publicada nesta página, com a data de atualização.
        </p>

        <p className="legal-page__note">
          Conteúdo informativo para demonstração da plataforma {BRAND.name}. Em
          operação real, revise com assessoria jurídica e adapte CNPJ, DPO e
          canais oficiais.
        </p>
      </article>
    </div>
  );
}
