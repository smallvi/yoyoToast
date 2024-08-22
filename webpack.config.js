const path = require('path');

module.exports = [
    {
        // ESM format configuration
        mode: 'production',
        entry: './src/yoyoToast.js',
        output: {
            filename: 'yoyoToast.min.mjs',
            path: path.resolve(__dirname, 'dist'),
            library: {
                type: 'module', // ESM format
            },
        },
        experiments: {
            outputModule: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
        optimization: {
            minimize: true,
        },
    },
    {
        // UMD format configuration
        mode: 'production',
        entry: './src/yoyoToast.js',
        output: {
            filename: 'yoyoToast.umd.min.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'MyLibrary',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
        optimization: {
            minimize: true,
        },
    },
    {
        // Original Minified format configuration
        mode: 'production',
        entry: './src/yoyoToast.js',
        output: {
            filename: 'yoyoToast.min.js',
            path: __dirname + '/dist',
        },
        optimization: {
            minimize: true,
        },
    },
];
