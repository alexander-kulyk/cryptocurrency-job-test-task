/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config = () => {
  /** @type {import('next').NextConfig} */
  const config = {
    cacheComponents: true,
    redirects: async () => {
      return [
        {
          source: '/',
          destination: '/guide',
          permanent: true,
        },
      ];
    },
    // Same-origin reverse proxy for the swap APIs: the browser calls these
    // local paths (no CORS), and Next forwards them to the upstream hosts
    // server-side, where CORS does not apply.
    rewrites: async () => {
      return [
        {
          source: '/api/miex/:path*',
          destination: 'https://api.miex.one/api/v1/public/:path*',
        },
        {
          source: '/api/devgateway/:path*',
          destination: 'https://devgateway.miex.one/api/:path*',
        },
      ];
    },
    env: {},
    reactStrictMode: false,
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.miex.one",
        },
      ],
    },
  };

  return withNextIntl(config);
};

export default config;
