/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Vercel 배포를 위해 빌드 시 ESLint 검사를 비활성화합니다.
  },
};
module.exports = nextConfig;
