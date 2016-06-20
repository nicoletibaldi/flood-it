module.exports = {
  context: __dirname,
  entry: "./lib/js/main.js",
  output: {
    path: "./lib/js",
    publicPath: "/js/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
