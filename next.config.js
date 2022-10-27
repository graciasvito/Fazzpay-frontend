/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },

  env: {
    URL_BACKEND: "https://fazzpay-rose.vercel.app",
  },
};

module.exports = nextConfig;
