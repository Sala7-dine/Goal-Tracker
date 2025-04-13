/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // For Next.js 13+
    images: {
      unoptimized: true, // if you're using <Image> and want export to work
    },
  };
  
  const isProd = process.env.NODE_ENV === 'production';

  module.exports = {
    assetPrefix: isProd ? '/Goal-Tracker/' : '',
    basePath: isProd ? '/Goal-Tracker' : '',
    output: 'export',
  };
  