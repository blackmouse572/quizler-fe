const withNextIntl = require("next-intl/plugin")()

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return withNextIntl(nextConfig)
}
