/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.rossignol.com',
      },
      {
        protocol: 'https',
        hostname: '**.head.com',
      },
      {
        protocol: 'https',
        hostname: '**.salomoncdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.voelkl.com',
      },
      {
        protocol: 'https',
        hostname: '**.fischersports.com',
      },
      {
        protocol: 'https',
        hostname: '**.atomic.com',
      },
      {
        protocol: 'https',
        hostname: '**.tecnicablizzard.com',
      },
      {
        protocol: 'https',
        hostname: 'k2snow.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'lineskis.com',
      },
      {
        protocol: 'https',
        hostname: 'factionskis.com',
      },
      {
        protocol: 'https',
        hostname: 'armadaskis.com',
      }
    ],
  },
}

module.exports = nextConfig
