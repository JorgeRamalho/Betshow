import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <span className="footer__logo">BetShow</span>
          <p>
            Apostas esportivas com tecnologia, transparência e respeito ao
            apostador brasileiro.
          </p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Produto</h4>
            <a href="#esportes">Esportes</a>
            <a href="#odds">Ao vivo</a>
            <a href="#bonus">Bônus</a>
            <a href="#cashback">Cashback</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Termos de uso</a>
            <Link to="/privacidade">Política de privacidade</Link>
            <Link to="/cookies">Política de cookies</Link>
            <a href="#">Jogo responsável</a>
            <a href="#">Impostos e tributação GOV</a>
          </div>
          <div>
            <h4>Suporte</h4>
            <a href="#">Central 24/7</a>
            <a href="#">Ouvidoria</a>
            <a href="tel:0800">0800 000 0000</a>
          </div>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          <strong>Aviso regulatório:</strong> Apostas esportivas são reguladas
          pela Lei nº 14.790/2023. A BetShow opera em conformidade com exigências
          de licenciamento, verificação de identidade (CPF), recolhimento de
          impostos à Receita Federal e políticas de jogo responsável. Proibido
          para menores de 18 anos. Jogue com moderação — apostas envolvem risco
          financeiro.
        </p>
        <p className="footer__copy">
          © {new Date().getFullYear()} BetShow. Todos os direitos reservados.
          CNPJ fictício para demonstração · Imagens Unsplash
        </p>
      </div>
    </footer>
  );
}
