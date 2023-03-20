const nextI18nextConfig = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: nextI18nextConfig.i18n,
};

module.exports = nextConfig;
