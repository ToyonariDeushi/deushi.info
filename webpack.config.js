const { VueLoaderPlugin } = require('vue-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

var settings = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        "card-search/bundle": './src/assets/js/_webpack/card-search/bundle.js',
        "card-search/bundle-sp": './src/assets/js/_webpack/card-search/bundle-sp.js'
    },
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: __dirname + `dist/assets/js/`,
        // 出力ファイル名
        filename: '[name].js'
    },
    // productionモードで有効になるoptimization.minimizerを上書きする
    optimization: {
        minimizer: [
        new UglifyJSPlugin({
            uglifyOptions: {
            compress: {
                drop_console: true,//production時はconsole.logなどを消す
                warnings: false
            }
            }
        })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            // {
            //     enforce: "pre",//babel-loader でES5に変換する前にコード検証させるために必要
            //     test: /\.(js|vue)$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            //   },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: {
                            loader: 'vue-style-loader!css-loader!sass-loader',
                            // options: {
                            //     data: '@import "pokemon-card/core/mixins";',
                            //     includePaths: [path.resolve(__dirname, './src/assets/css/')],
                            // }
                        },
                    }
                }
            },
            
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // Babel のオプションを指定する
                options: {
                    presets: [
                        // プリセットを指定することで、ES2018 を ES5 に変換
                        '@babel/preset-env',
                    ]
                }
            },
        ]

    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src/assets/js/_webpack")
        ] // rootにしたいパスを指定
        ,// Webpackで利用するときの設定
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']

    }, plugins: [
        // Vueを読み込めるようにするため
        new VueLoaderPlugin(),
    ],

};
if (process.env.NODE_ENV == 'production') {
    settings.mode = "production";
} else {
    settings.devtool= 'inline-source-map'
}

var yellow = '\u001b[33m';
var reset = '\u001b[0m';
console.log(yellow + '[webpack mode] ' + settings.mode + reset);
module.exports = settings;