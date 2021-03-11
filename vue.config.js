module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    "vuetify",
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: Infinity,
        automaticNameDelimiter: ".",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return packageName.replace("@", "");
            },
            chunks: "all",
          },
        },
      },
    },
  },
};
