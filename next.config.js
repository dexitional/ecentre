/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ['cdn.ucc.edu.gh','ehub.ucc.edu.gh','cdn.ucc.edu.gh','cloud.appwrite.io']
  }
}

module.exports = nextConfig
