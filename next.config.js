/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const prod = process.env.NODE_ENV === "production";

const url = prod ? "https://host-shell.vercel.app" : "http://localhost:3000";
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    hostShell: `host-shell@${url}/_next/static/${location}/remoteEntry.js`,
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
