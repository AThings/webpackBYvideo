// webpack 是node写出来的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin') // 类
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let terserJSPlugin = require('terser-webpack-plugin')
let webpack = require('webpack')
module.exports = {
    optimization:{
        minimizer: [
            new terserJSPlugin({}),
            new OptimizeCss({})
        ]
    },
    devServer: { //开发服务器配置
        port: 3000,
        progress: true ,// 进度条
        contentBase: './fengjialue'
    },
    mode: 'development',// 模式 production development
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js',  // 打包后文件名
        path: path.resolve(__dirname,'fengjialue')// 路径必须是绝对路径
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {    压缩html development下也会压缩
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        // new webpack.ProvidePlugin({
        //     $:'jquery'  // 向文件中注入$
        // })
    ],
    externals:{
        jquery:'$'
    },
    module:{ // 模块
        rules:[ // 规则
            {
                test:/\.html$/,
                use: 'html-withimg-loader'
            },
            // {
            //     test:/\.(png|jpg|gif)$/,
            //     use: 'file-loader'
            // },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        // 做一个限制 当小于多少k时转为base64 否则使用file-loader
                        loader:'url-loader',
                        options:{
                            limit:20*1024
                        }
                    }
                ]
            },
            // {
            //     test:require.resolve('jquery'), // 当文件中引入jquery时
            //     use: 'expose-loader?$'
            // },
            // {
            //     test: /\.js$/,
            //     use:[
            //         {
            //             loader: 'eslint-loader'
            //         }
            //     ],
            //     enforce: 'pre'
            // },
            { 
                test: /\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{ 
                        presets:[ // es6转es5
                            [
                                '@babel/preset-env'
                            ]
                        ],
                        plugins:[
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            ["@babel/plugin-transform-runtime"]
                        ]   
                    }
                }],
                include:path.resolve(__dirname,'src'), // 包括 处理那些文件夹下的js
                exclude: /node_modules/  // 排除 不处理那些文件夹下的js
        },
            // css-loader 解析 @import
            // style-loader 将css插入html
            // loader 希望单一
            // loader 有顺序 从右向左 从下到上
            { test: /\.css$/,
                use:[ 
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    'css-loader','postcss-loader']},
            { test: /\.less$/,use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader',{
                loader:'less-loader'
            }]}
        ]
    }
}