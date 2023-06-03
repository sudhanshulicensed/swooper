module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          config: './postcss.config.js',
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
};