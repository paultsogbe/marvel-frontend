const webpack = require('webpack');

module.exports = function override(config) {
   const sassRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('scss')
   );

   if (sassRule) {
      const sassLoader = sassRule.use.find((loader) =>
         loader.loader.includes('sass-loader')
      );

      if (sassLoader) {
         sassLoader.options = {
            ...sassLoader.options,
            warnRuleAsWarning: false, // Suppress warnings
         };
      }
   }

   // Add fallback for process
   config.plugins.push(
      new webpack.ProvidePlugin({
         process: 'process/browser',
      })
   );

   return config;
};
