const withTM = require('next-transpile-modules')(['interpreter']);
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
};

module.exports = withVanillaExtract(withTM(nextConfig));
