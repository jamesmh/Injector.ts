module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "/dist/bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "babel-loader!ts-loader" }
        ]
    }
}