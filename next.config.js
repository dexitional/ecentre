/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ['cdn.ucc.edu.gh','ehub.ucc.edu.gh']
  }
}

module.exports = nextConfig
