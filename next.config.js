const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true,
  },
  typescript: { ignoreBuildErrors: true },
}

const withTranspilation = require('next-transpile-modules')([
  'lodash-es',
  '@nativewaves/platform-sdk-browser',
  '@nativewaves/exp-core-foundation',
  '@nativewaves/exp-core-playback',
  '@nativewaves/exp-core',
  '@nativewaves/exp-default',
])

module.exports = withTranspilation(nextConfig)
