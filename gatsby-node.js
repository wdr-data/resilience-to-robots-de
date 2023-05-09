exports.onCreateWebpackConfig = ({ stage, actions }) => {
  console.log("hello gatsby", stage);
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: "csv-loader",
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true,
          },
        },
        {
          test: /node_modules\\react-collapsed\\dist\\index.mjs/,
          type: "javascript/auto",
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
              plugins: [
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-syntax-class-properties",
              ],
            },
          },
        },
      ],
    },
  });
};
