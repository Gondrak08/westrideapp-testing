// eslint-disable-next-line @typescript-eslint/no-require-imports
const { redirect } = require("next/dist/server/api-utils");
const path = require("path");

module.exports = (phase, { defaultConfig }) => {
  if ("sassOptions" in defaultConfig) {
    defaultConfig["sassOptions"] = {
      includePaths: [path.join(__dirname, "styles")],
      prependData: `@import "~@/app/styles/variables.scss";`,
    };
  }
  return {
    ...defaultConfig,
    output: 'export',
    distDir: 'dist',
  };
};
