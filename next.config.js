module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home"
      },
      {
        source: "/admin",
        destination: "/admin/index.html"
      }
    ];
  }
};
