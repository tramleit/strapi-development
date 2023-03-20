/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-GB", "de-AU"],
    defaultLocale: "en-GB",
    localeDetection: true,
  },
};

module.exports = nextConfig;
