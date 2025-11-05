import React, { useState } from 'react';
import { HeartIcon, StarIcon, TruckIcon, ChevronRightIcon, ThumbsUpIcon, MoreIcon } from './Icons';

const productImages = [
  "https://http2.mlstatic.com/D_NQ_NP_2X_893985-MLB88882583771_072025-F.webp",
  "https://http2.mlstatic.com/D_NQ_NP_2X_616320-MLB88534377464_072025-F.webp",
  "https://http2.mlstatic.com/D_NQ_NP_2X_644192-MLB88882849669_072025-F.webp",
  "https://http2.mlstatic.com/D_NQ_NP_2X_891860-MLB88882504427_072025-F.webp",
  "https://http2.mlstatic.com/D_NQ_NP_2X_860306-MLB88882672455_072025-F.webp",
];

const sellerProducts = [
  { name: 'Kit 2 Azeite De Oliva Extra Virgem Clássico Gallo Vid...', price: '51.99', oldPrice: '59.99', discount: '13', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_963358-MLB88534145826_072025-F.webp' },
  { name: 'Kit 3 Unidades Azeite De Oliva Gallo Único Vidro...', price: '57.99', oldPrice: '69.99', discount: '17', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_616320-MLB88534377464_072025-F.webp' },
];

const alsoBought = [
  { name: 'Azeite De Oliva Extra Virgem Gallo 500 Ml', price: '29.99', oldPrice: '45.19', discount: '33', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_891860-MLB88882504427_072025-F.webp', coupon: true },
  { name: 'Azeite De Oliva Extra Virgem Português Andorinha Vidro...', price: '32.39', oldPrice: '47.99', discount: '32', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_860306-MLB88882672455_072025-F.webp', coupon: true },
  { name: 'Kit 3 Unidades Azeite De Oliva Gallo Único Vidro 250ml', price: '57.99', oldPrice: '69.99', discount: '17', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_893985-MLB88882583771_072025-F.webp' },
];

const reviews = [
  {
    rating: 5,
    title: "Excelente produto",
    comment: "O azeite é de ótima qualidade, saboroso e com um aroma marcante. Ideal para saladas e finalização de pratos. A embalagem é prática e bonita. Recomendo a compra!",
    likes: 12,
    date: "25 de outubro de 2025"
  },
  {
    rating: 5,
    title: "Muito bom!",
    comment: "Saboroso e de qualidade. Chegou super rápido e bem embalado. Com certeza comprarei novamente.",
    likes: 8,
    date: "15 de outubro de 2025"
  },
  {
    rating: 4,
    title: "Bom custo-benefício",
    comment: "Um bom azeite para o dia a dia. Não é o mais premium, mas pelo preço, vale muito a pena. O sabor é suave.",
    likes: 5,
    date: "02 de novembro de 2025"
  }
];

const userReviewPhotos = [
  "https://eficazjf.com.br/wp-content/uploads/2024/08/gallo-classico-1.jpg",
  "https://m.media-amazon.com/images/I/71Spq-iA+2L.jpg",
  "https://m.media-amazon.com/images/I/71H1BUZwZ7L.jpg",
  "https://m.media-amazon.com/images/I/618+2WxbkcL.jpg",
];

// ⭐ Componente reutilizável de estrelas
const StarRating = ({ rating, totalStars = 5, className = "w-5 h-5" }: { rating: number; totalStars?: number; className?: string }) => (
  <div className="flex items-center">
    {[...Array(totalStars)].map((_, i) => (
      <StarIcon key={i} filled={i < rating} className={className} />
    ))}
  </div>
);

// 🛒 Card de Produto
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 min-w-[220px] max-w-[220px] flex flex-col hover:shadow-lg transition-shadow">
    <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-4" />
    <p className="text-sm text-gray-700 mb-2 flex-grow">{product.name}</p>
    <p className="text-xs text-gray-500 line-through">R$ {product.oldPrice}</p>
    <div className="flex items-baseline">
      <p className="text-2xl font-light">R$ {product.price}</p>
      <p className="text-sm text-green-600 font-semibold ml-2">{product.discount}% OFF</p>
    </div>
    <p className="text-sm text-gray-500">12x R$ {(parseFloat(product.price) / 10).toFixed(2).replace('.', ',')}</p>
    {product.coupon && <p className="text-xs text-blue-500 mt-2 font-semibold">Cupom 10% OFF</p>}
    <p className="text-sm text-green-600 font-semibold mt-2">Frete grátis</p>
  </div>
);

// 🧩 Carrossel de produtos
const ProductCarousel = ({ title, products }: { title: string; products: any[] }) => (
  <div className="bg-white p-6 rounded-md shadow-sm mb-6">
    <h2 className="text-xl font-light text-gray-800 mb-4">{title}</h2>
    <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
      {products.map((p, index) => <ProductCard key={index} product={p} />)}
    </div>
  </div>
);

export const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const checkoutUrl = "https://pagamento.kit3gallo.shop/checkout?product=a1619e79-b51e-11f0-b47c-46da4690ad53";

  return (
    <>
      <div className="pb-24">
        <div className="bg-white p-4 rounded-md shadow-sm mt-4">
          <div className="text-xs text-blue-500 mb-4 space-x-1">
            <a href="#" className="hover:underline">Voltar à lista</a>|
            <a href="#" className="hover:underline">Alimentos e Bebidas</a> &gt;
            <a href="#" className="hover:underline"> Mercearia</a> &gt;
            <a href="#" className="hover:underline"> Azeites e Vinagres</a> &gt;
            <a href="#" className="hover:underline"> Azeites para Cozinha</a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* IMAGEM PRINCIPAL */}
            <div className="col-span-10 lg:col-span-7">
              <div className="flex flex-col md:flex-row">
                <div className="flex md:flex-col items-center md:items-start space-x-2 md:space-x-0 md:space-y-2 mr-4 order-2 md:order-1 mt-4 md:mt-0">
                  {productImages.map(img => (
                    <div
                      key={img}
                      className={`w-12 h-12 border rounded-md cursor-pointer flex items-center justify-center ${selectedImage === img ? 'border-blue-500' : 'border-gray-300'}`}
                      onMouseEnter={() => setSelectedImage(img)}>
                      <img src={img} alt="thumbnail" className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>

                <div
                  className="relative flex-1 flex items-center justify-center overflow-hidden rounded-md h-96 order-1 md:order-2"
                  onMouseEnter={() => setZoomActive(true)}
                  onMouseLeave={() => setZoomActive(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={selectedImage}
                    alt="Azeite Gallo"
                    className="max-h-full w-auto object-contain transition-transform duration-300 ease-in-out cursor-zoom-in"
                    style={{
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      transform: `scale(${zoomActive ? 2 : 1})`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* DETALHES DO PRODUTO */}
            <div className="col-span-10 lg:col-span-3">
              <div className="border border-gray-200 rounded-md p-6 sticky top-24">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-500">Novo | +100 vendidos</p>
                  <HeartIcon className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors" />
                </div>

                <h1 className="text-xl font-semibold text-gray-800 mt-2">
                  Kit 3 Azeite De Oliva Extra Virgem Clássico Gallo Vd 250ml
                </h1>

                <div className="flex items-center mt-2">
                  <StarRating rating={4.7} />
                  <a href="#reviews" className="text-sm text-blue-500 ml-2 hover:underline cursor-pointer">(459)</a>
                </div>

                <p className="text-lg text-gray-500 line-through mt-4">R$ 67,44</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-4xl font-light text-gray-800">R$ 29,90</p>
                  <p className="text-lg text-green-600 font-semibold ml-2">55% OFF</p>
                </div>

                <p className="text-base text-gray-800 mt-2">
                  em <span className="text-green-600 font-semibold">12x R$ 2,99</span>
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={checkoutUrl}
                    className="block w-full text-center bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Comprar agora
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <ProductCarousel title="Quem comprou este produto, também comprou" products={alsoBought} />
          </div>
        </div>
      </div>
    </>
  );
};
