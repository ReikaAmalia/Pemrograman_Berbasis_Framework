/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      // gambar dari Shopee
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        pathname: "/**",
      },
      // gambar dari Pinterest
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      //gambar dari Nike
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;