/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Garante que cada build gera novos chunks com hash diferente
  swcMinify: true,

  // Configura cabeçalhos HTTP para os arquivos estáticos
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
