const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withTranspilation = require('next-transpile-modules')([
  '@nativewaves/exp-core-foundation',
  '@nativewaves/exp-default',
])

module.exports = withTranspilation(nextConfig)
