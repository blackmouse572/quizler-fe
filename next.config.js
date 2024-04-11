const withNextIntl = require("next-intl/plugin")()

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/external/:path*",
          destination: process.env.API_SERVER_URL + "/:path*",
        },
      ]
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }
  return withNextIntl(nextConfig)
}
