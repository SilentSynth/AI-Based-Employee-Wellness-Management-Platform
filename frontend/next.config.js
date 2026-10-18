/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    // Ignore missing source map warnings (e.g., mappings.wasm) in development
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /ENOENT: no such file or directory.*mappings\.wasm/,
    ];
    return config;
  },
};

module.exports = nextConfig;
