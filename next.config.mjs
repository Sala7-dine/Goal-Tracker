/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/goal-tracker/' : '',
  basePath: isProd ? '/goal-tracker' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
  