const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "public", "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".js", ".css"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 8080,
    },
};
