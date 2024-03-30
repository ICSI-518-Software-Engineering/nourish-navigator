/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        pathname: "**",
        hostname: "**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
