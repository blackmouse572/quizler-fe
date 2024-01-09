const withNextIntl = require("next-intl/plugin")()

module.exports = async (phase, { defaultConfig }) => {
  async function rewrites() {
    return [
      {
        source: "/vi/api/proxy/:path*",
        destination: "https://random-d.uk/api/random",
      },
      {
        source: "/en/api/proxy/:path*",
        destination: "https://random-d.uk/api/random",
      },
    ]
  }
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    rewrites,
  }

  return withNextIntl(nextConfig)
}
