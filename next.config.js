/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    hostShell: `host-shell@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
  };
};
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "pokemon-three",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(options.isServer),
        exposes: {
          "./pokemonThree": "./components/PokemonThree/index.tsx",
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },

  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
