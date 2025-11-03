
import React, { useState } from 'react';
import { HeartIcon, StarIcon, TruckIcon, ReturnIcon, CheckIcon, ChevronRightIcon, ThumbsUpIcon, MoreIcon } from './Icons';

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


// Reusable Star Rating Component
const StarRating = ({ rating, totalStars = 5, className = "w-5 h-5" }: { rating: number; totalStars?: number; className?: string }) => (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <StarIcon key={i} filled={i < rating} className={className} />
      ))}
    </div>
);

// Product Card Component defined outside the main component to prevent re-renders
// FIX: Explicitly type ProductCard as React.FC to allow for React-specific props like `key`. This resolves type errors when using ProductCard within a .map() loop.
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 min-w-[220px] max-w-[220px] flex flex-col">
    <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-4"/>
    <p className="text-sm text-gray-700 mb-2 flex-grow">{product.name}</p>
    <p className="text-xs text-gray-500 line-through">R$ {product.oldPrice}</p>
    <div className="flex items-baseline">
      <p className="text-2xl font-light">R$ {product.price}</p>
      <p className="text-sm text-green-600 font-semibold ml-2">{product.discount}% OFF</p>
    </div>
    <p className="text-sm text-gray-500">12x R$ {(parseFloat(product.price) / 10).toFixed(2).replace('.', ',')}</p>
    {product.coupon && <p className="text-xs text-blue-500 mt-2">Cupom 10% OFF</p>}
    <p className="text-sm text-green-600 font-semibold mt-2">Frete grátis</p>
  </div>
);

// Product Carousel Component
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

    const handleMouseEnter = () => {
        setZoomActive(true);
    };

    const handleMouseLeave = () => {
        setZoomActive(false);
    };

    const checkoutUrl = "https://pagamento.kit3gallo.shop/checkout?product=a1619e79-b51e-11f0-b47c-46da4690ad53";

    return (
        <>
            <div className="pb-24">
                <div className="bg-white p-4 rounded-md shadow-sm mt-4">
                    {/* Breadcrumbs */}
                    <div className="text-sm text-blue-500 mb-4">
                        <a href="#" className="hover:underline">Alimentos e Bebidas</a> &gt;
                        <a href="#" className="hover:underline"> Mercearia</a> &gt;
                        <a href="#" className="hover:underline"> Azeites e Vinagres</a> &gt;
                        <a href="#" className="hover:underline"> Azeites para Cozinha</a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                        {/* Left Panel: Image Gallery */}
                        <div className="col-span-10 lg:col-span-7">
                            <div className="flex">
                                {/* Thumbnails */}
                                <div className="flex flex-col space-y-2 mr-4">
                                    {productImages.map(img => (
                                        <div key={img}
                                            className={`w-12 h-12 border rounded-md cursor-pointer flex items-center justify-center ${selectedImage === img ? 'border-blue-500' : 'border-gray-300'}`}
                                            onMouseEnter={() => setSelectedImage(img)}>
                                            <img src={img} alt="thumbnail" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                                {/* Main Image */}
                                <div
                                    className="flex-1 flex items-center justify-center overflow-hidden rounded-md"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                >
                                    <img
                                        src={selectedImage}
                                        alt="Azeite Gallo"
                                        className="max-h-96 object-contain transition-transform duration-300 ease-in-out cursor-zoom-in"
                                        style={{
                                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                            transform: `scale(${zoomActive ? 2 : 1})`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Purchase Info */}
                        <div className="col-span-10 lg:col-span-3">
                            <div className="border border-gray-200 rounded-md p-6 sticky top-4">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm text-gray-500">Novo | +100 vendidos</p>
                                    <HeartIcon className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600" />
                                </div>
                                <h1 className="text-xl font-semibold text-gray-800 mt-2">Kit 3 Azeite De Oliva Extra Virgem Clássico Gallo Vd 250ml</h1>
                                <div className="flex items-center mt-2">
                                    <StarRating rating={4.7}/>
                                    <span className="text-sm text-blue-500 ml-2 hover:underline cursor-pointer">(459)</span>
                                </div>
                                <p className="text-lg text-gray-500 line-through mt-4">R$ 67,44</p>
                                <div className="flex items-baseline mt-1">
                                    <p className="text-4xl font-light text-gray-800">R$ 29,90</p>
                                    <p className="text-lg text-green-600 font-semibold ml-2">55% OFF</p>
                                </div>
                                <p className="text-base text-gray-800 mt-2">em <span className="text-green-600 font-semibold">12x R$ 2,99</span></p>
                                <a href="#" className="text-sm text-blue-500 hover:underline mt-2 block">Ver os meios de pagamento</a>

                                <div className="border-t border-gray-200 my-6"></div>

                                <div className="flex items-start">
                                    <TruckIcon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-green-600">Receba grátis entre 12 e 13/nov</p>
                                        <p className="text-sm text-gray-600 mt-1">Chegará entre domingo e segunda-feira</p>
                                        <a href="#" className="text-sm text-blue-500 hover:underline mt-1 block">Ver mais detalhes e formas de entrega</a>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="font-semibold text-gray-800 mb-2">Quantidade</p>
                                    <div className="flex items-center space-x-3">
                                        <div className="border border-gray-300 rounded-md py-2 px-4">
                                            <p className="font-semibold">1 unidade</p>
                                        </div>
                                        <p className="text-sm text-gray-500">(+50 disponíveis)</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <a href={checkoutUrl} className="block w-full text-center bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors">Comprar agora</a>
                                </div>
                            </div>
                        </div>
                        
                        {/* Product Details Sections */}
                        <div className="col-span-10 lg:col-span-7">
                            <div className="mt-12">
                                {/* Seller Products */}
                                <div className="p-6 border-t border-b border-gray-200">
                                    <h2 className="text-xl font-light text-gray-800 mb-4">Produtos do vendedor</h2>
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-4">
                                            {sellerProducts.map((p, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <img src={p.image} alt={p.name} className="w-20 h-20 object-contain border rounded-md"/>
                                                    <div>
                                                        <p className="text-sm text-gray-700 w-40">{p.name}</p>
                                                        <p className="text-lg font-light mt-1">R$ {p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#" className="text-blue-500 hover:underline text-sm flex items-center">
                                            Ver mais produtos do vendedor <ChevronRightIcon className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <h2 className="text-xl font-light text-gray-800 mb-4">O que você precisa saber sobre este produto</h2>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        <li>Livre de glúten.</li>
                                        <li>É um produto orgânico.</li>
                                        <li>Ideal para temperar e cozinhar.</li>
                                        <li>Conservar em local seco e arejado.</li>
                                    </ul>
                                </div>
                                
                                {/* Description */}
                                <div className="p-6 border-t border-gray-200">
                                    <h2 className="text-2xl font-light text-gray-800 mb-4">Descrição</h2>
                                    <div className={`text-gray-600 space-y-4 overflow-hidden transition-all duration-500 ${isDescriptionExpanded ? 'max-h-full' : 'max-h-24'}`}>
                                        <p>O Azeite de Oliva Extra Virgem Clássico da Gallo é um azeite de categoria superior, obtido diretamente de azeitonas, unicamente por processos mecânicos.</p>
                                        <p>Com um sabor equilibrado de frutado, amargo e picante, e notas de frutos frescos, é ideal para o dia a dia e para realçar o sabor dos alimentos. Use para temperar saladas, finalizar pratos ou para cozinhar.</p>
                                        <p>Este kit contém 3 unidades de 250ml cada, perfeito para quem busca qualidade e praticidade na cozinha. A embalagem em vidro escuro protege o azeite da luz, preservando suas propriedades e sabor por mais tempo.</p>
                                    </div>
                                    <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="text-blue-500 hover:underline mt-4">
                                        {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
                                    </button>
                                </div>

                                {/* Reviews */}
                                <div id="reviews" className="p-6 border-t border-gray-200">
                                    <h2 className="text-xl font-light text-gray-800 mb-2">Opiniões sobre o produto</h2>
                                    <div className="flex items-center mb-6">
                                        <p className="text-5xl font-light mr-4">4.7</p>
                                        <div>
                                            <StarRating rating={4.7} className="w-6 h-6"/>
                                            <p className="text-sm text-gray-500 mt-1">Média entre 459 opiniões</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Fotos dos compradores</h3>
                                        <div className="flex space-x-3 overflow-x-auto custom-scrollbar pb-2">
                                            {userReviewPhotos.map((photo, index) => (
                                                <img 
                                                    key={index} 
                                                    src={photo} 
                                                    alt={`Foto de avaliação de usuário ${index + 1}`} 
                                                    className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {reviews.map((review, index) => (
                                        <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                                            <div className="flex items-center mb-2">
                                                <StarRating rating={review.rating} className="w-4 h-4" />
                                                <p className="text-sm text-gray-500 ml-auto">{review.date}</p>
                                            </div>
                                            <p className="font-semibold text-gray-800 mb-1">{review.title}</p>
                                            <p className="text-gray-700 text-sm">{review.comment}</p>
                                            <div className="flex items-center mt-3 text-gray-500">
                                                <button className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100">
                                                    <ThumbsUpIcon className="w-4 h-4"/>
                                                    <span>É útil</span>
                                                </button>
                                                <p className="ml-3 text-sm">{review.likes}</p>
                                                <button className="ml-auto">
                                                    <MoreIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Ver todas as opiniões</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Also Bought Carousel */}
                <div className="mt-8">
                    <ProductCarousel title="Quem comprou este produto, também comprou" products={alsoBought} />
                </div>
            </div>
            {/* Sticky Buy Now Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={productImages[0]} alt="Produto" className="w-10 h-10 object-contain rounded-sm" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800 truncate w-48 md:w-96">Kit 3 Azeite De Oliva Extra Virgem Clássico Gallo Vd 250ml</p>
                            <p className="text-lg font-light text-gray-800">R$ 29,90</p>
                        </div>
                    </div>
                    <a href={checkoutUrl} className="bg-blue-500 text-white font-semibold py-2 px-6 md:px-12 rounded-md hover:bg-blue-600 transition-colors flex-shrink-0">Comprar agora</a>
                </div>
            </div>
        </>
    );
};
