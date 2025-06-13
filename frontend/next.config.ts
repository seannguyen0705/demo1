import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/my-jobs',
      destination: '/my-jobs/applied',
    },
    {
      source: '/admin',
      destination: '/admin/sign-in',
    },
  ],
};

export default nextConfig;
