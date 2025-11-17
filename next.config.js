const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during Vercel build
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

// Sentry webpack plugin options
const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  widenClientFileUpload: true,
};

// Export without Sentry temporarily to debug Vercel build issue
module.exports = nextConfig;

// Uncomment when Sentry is configured:
// module.exports = process.env.NODE_ENV === 'production'
//   ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
//   : nextConfig;



