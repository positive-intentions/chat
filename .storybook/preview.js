import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { withThemeFromJSXProvider } from '@storybook/addon-themes';
// import { lightTheme, darkTheme } from '../src/themes.js';

// /* snipped for brevity */

// export const decorators = [
//   withThemeFromJSXProvider({
//   themes: {
//     light: lightTheme,
//     dark: darkTheme,
//   },
//   defaultTheme: 'light',
//   Provider: ThemeProvider,
//   GlobalStyles: CssBaseline,
// })];

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // add branch image

  },
};

export default preview;
