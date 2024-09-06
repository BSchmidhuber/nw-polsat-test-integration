const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true,
  },
};

const withTranspilation = require("next-transpile-modules")([
  "lodash-es",
  "@nativewaves/platform-sdk-browser",
  "@nativewaves/exp-core-playback",
  "@nativewaves/exp-core-localization",
  "@nativewaves/exp-core-foundation",
  "@nativewaves/exp-app-config-loader",
  "@nativewaves/exp-app-experiences-loader",
  "@nativewaves/nw-exp-drag-racing",
]);

module.exports = withTranspilation(nextConfig);
