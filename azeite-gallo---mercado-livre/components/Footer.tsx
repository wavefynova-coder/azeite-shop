import React from 'react';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <li>
        <a href={href} className="text-gray-600 hover:text-blue-500 transition-colors text-sm">
            {children}
        </a>
    </li>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Sobre o</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Mercado Livre</FooterLink>
              <FooterLink href="#">Investor relations</FooterLink>
              <FooterLink href="#">Tendências</FooterLink>
              <FooterLink href="#">Sustentabilidade</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Outros sites</h3>
            <ul className="space-y-2">
                <FooterLink href="#">Desenvolvedores</FooterLink>
                <FooterLink href="#">Mercado Pago</FooterLink>
                <FooterLink href="#">Mercado Envios</FooterLink>
                <FooterLink href="#">Mercado Shops</FooterLink>
                <FooterLink href="#">Mercado Ads</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contato</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Comprar</FooterLink>
              <FooterLink href="#">Vender</FooterLink>
              <FooterLink href="#">Resolução de problemas</FooterLink>
              <FooterLink href="#">Segurança</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Redes sociais</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Twitter</FooterLink>
              <FooterLink href="#">Facebook</FooterLink>
              <FooterLink href="#">Instagram</FooterLink>
              <FooterLink href="#">YouTube</FooterLink>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold text-gray-900 mb-3">Minha conta</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Resumo</FooterLink>
              <FooterLink href="#">Favoritos</FooterLink>
              <FooterLink href="#">Vender grátis</FooterLink>
              <FooterLink href="#">Assinaturas</FooterLink>
            </ul>
          </div>
        </div>
        
        <nav className="flex flex-wrap text-sm text-gray-800 mb-6">
          <a href="#" className="mr-6 mb-2 hover:text-blue-500">Trabalhe conosco</a>
          <a href="#" className="mr-6 mb-2 hover:text-blue-500">Termos e condições</a>
          <a href="#" className="mr-6 mb-2 hover:text-blue-500">Como cuidamos da sua privacidade</a>
          <a href="#" className="mr-6 mb-2 hover:text-blue-500">Acessibilidade</a>
          <a href="#" className="mr-6 mb-2 hover:text-blue-500">Contato</a>
          <a href="#" className="mr-6 mb-2 hover:text-blue-500">Informações sobre seguros</a>
        </nav>
        <p className="text-xs text-gray-500">Copyright © 1999-2024 Ebazar.com.br LTDA.</p>
        <p className="text-xs text-gray-500 mt-2">CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim, Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.</p>
      </div>
    </footer>
  );
};
