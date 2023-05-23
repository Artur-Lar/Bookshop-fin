const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production", // Режим сборки

  entry: "./src/index.js", // Входной файл вашего JS-кода

  output: {
    filename: "bundle.js", // Имя выходного JS-файла
    path: path.resolve(__dirname, "dist"), // Путь к выходной папке
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Используйте Babel для обработки JS-файлов
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Извлечь CSS в отдельный файл
          "css-loader", // Загрузить CSS
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin(), // Минификация JS-файлов
      new CssMinimizerPlugin(), // Минификация CSS-файлов
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // Имя выходного CSS-файла
    }),
  ],
};
