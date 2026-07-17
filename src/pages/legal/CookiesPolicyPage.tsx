import { Link } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import { BRAND } from "../../data/brand";
import "../../styles/legal.css";

export default function CookiesPolicyPage() {
  return (
    <div className="legal-page">
      <article className="legal-page__card">
        <div className="legal-page__nav">
          <Link to="/" className="legal-page__back">
            ← Voltar ao início
          </Link>
          <div className="legal-page__links">
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/cookies" aria-current="page">
              Cookies
            </Link>
          </div>
        </div>

        <Logo size="md" />
        <h1>Política de Cookies</h1>
        <p className="legal-page__updated">Última atualização: 17 de julho de 2026</p>

        <p>
          Esta Política de Cookies explica como a {BRAND.name} utiliza cookies e
          tecnologias semelhantes no site, em complemento à{" "}
          <Link to="/privacidade" style={{ color: "var(--neon-green)" }}>
            Política de Privacidade
          </Link>
          .
        </p>

        <h2>1. O que são cookies?</h2>
        <p>
          Cookies são pequenos arquivos armazenados no seu navegador quando você
          visita um site. Eles ajudam a lembrar preferências, manter a sessão
          ativa, medir desempenho e, quando autorizado, personalizar conteúdo.
        </p>

        <h2>2. Tipos de cookies que utilizamos</h2>
        <ul>
          <li>
            <strong>Essenciais:</strong> necessários para login, segurança,
            navegação e funcionamento básico da plataforma.
          </li>
          <li>
            <strong>Preferências:</strong> lembram escolhas como idioma e
            consentimento de cookies.
          </li>
          <li>
            <strong>Desempenho e analytics:</strong> ajudam a entender uso do
            site para melhorar a experiência.
          </li>
          <li>
            <strong>Marketing (opcional):</strong> podem ser usados para
            ofertas e campanhas, apenas com consentimento.
          </li>
        </ul>

        <h2>3. Cookies principais</h2>
        <ul>
          <li>
            <strong>betshow_cookie_consent:</strong> registra se você aceitou
            ou gerenciou cookies.
          </li>
          <li>
            <strong>Sessão de autenticação:</strong> mantém o usuário logado de
            forma segura enquanto a sessão estiver ativa.
          </li>
          <li>
            <strong>Preferências de interface:</strong> armazenam escolhas
            básicas de uso do site.
          </li>
        </ul>

        <h2>4. Base legal e consentimento</h2>
        <p>
          Cookies essenciais podem ser usados com base no legítimo interesse e
          na necessidade de prestar o serviço. Cookies não essenciais dependem
          do seu consentimento, que pode ser dado ou alterado pelo banner de
          cookies.
        </p>

        <h2>5. Como gerenciar cookies</h2>
        <ul>
          <li>Usar o banner de cookies do site para aceitar ou rejeitar opcionais.</li>
          <li>Limpar ou bloquear cookies nas configurações do navegador.</li>
          <li>
            Observar que bloquear cookies essenciais pode impedir login,
            cadastro ou outras funções.
          </li>
        </ul>

        <h2>6. Período de retenção</h2>
        <p>
          Cookies de sessão expiram ao fechar o navegador. Cookies persistentes
          ficam armazenados pelo tempo necessário à finalidade (por exemplo,
          lembrar o consentimento por até 12 meses), salvo exclusão anterior
          pelo usuário.
        </p>

        <h2>7. Atualizações</h2>
        <p>
          Esta política pode ser atualizada periodicamente. A versão atual estará
          sempre disponível nesta página.
        </p>

        <p className="legal-page__note">
          Conteúdo informativo para demonstração da plataforma {BRAND.name}. Em
          produção, revise a lista de cookies reais e a ferramenta de
          consentimento com assessoria jurídica.
        </p>
      </article>
    </div>
  );
}
