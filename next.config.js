/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use a custom dist directory to reduce collisions with
  // leftover/locked `.next` artifacts on Windows.
  distDir: ".next-cache",
};
module.exports = nextConfig;
