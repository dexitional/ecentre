/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: false,
  },
  images: {
    domains: ['cdn.ucc.edu.gh','ehub.ucc.edu.gh','cdn.ucc.edu.gh','cloud.appwrite.io','firebasestorage.googleapis.com']
  }
}

module.exports = nextConfig
