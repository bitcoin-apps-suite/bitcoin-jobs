/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  outputFileTracingRoot: '/Users/b0ase/Projects/bitcoin-OS/apps/bitcoin-jobs',
}

module.exports = nextConfig