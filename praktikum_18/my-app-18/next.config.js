/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // ← sudah ada sebelumnya
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",
        pathname: "/**",
      },
      // ← sudah ada sebelumnya
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // ← sudah ada sebelumnya
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      // ← tambahkan untuk gambar dari Shopee
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        pathname: "/**",
      },
      // ← tambahkan untuk gambar dari Pinterest
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      // ← tambahkan untuk gambar dari Nike
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;