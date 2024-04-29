/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-dark-mode',
    "@storybook/addon-webpack5-compiler-swc"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {},
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../public'],
};
export default config;
