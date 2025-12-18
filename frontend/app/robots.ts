import { MetadataRoute } from 'next';
import { HOST } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${HOST}/sitemap.xml`,
  };
}
