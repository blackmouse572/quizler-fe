const withNextIntl = require("next-intl/plugin")()

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {}
  return withNextIntl(nextConfig)
}
