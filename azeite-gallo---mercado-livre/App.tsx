import React from 'react';
import { Header } from './components/Header';
import { ProductPage } from './components/ProductPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto p-4 w-full flex-grow">
        <ProductPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
