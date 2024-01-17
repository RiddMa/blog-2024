module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.riddma.com"
      },
      {
        protocol: "https",
        hostname: "blog-2024-three.vercel.app"
      },
      {
        protocol: "https",
        hostname: "assets.tina.io"
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ]
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
