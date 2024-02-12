/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  swMinify: true,
  disable: false,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});
module.exports = withPWA({
  images: {
    domains: [
      "i.postimg.cc",
      "lh3.googleusercontent.com",
      "source.unsplash.com",
    ],
  },
});
