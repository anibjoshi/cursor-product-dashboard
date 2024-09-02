/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Other experimental features can stay
  },
  distDir: 'public', // Change the output directory to "public"
}

module.exports = nextConfig