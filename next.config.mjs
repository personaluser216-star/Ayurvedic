/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/dmbkn7s2h/**",
    },
  ],
},

};

export default nextConfig;
