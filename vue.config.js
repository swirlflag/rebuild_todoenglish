const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
{MiniCssExtractPlugin}


module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/'),
                // 'styles': path.resolve('./src')
            }
        },
        module: {
            rules: [
                {
                    // test: /\.(sa|sc|c)ss$/,
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader', options: { injectType: 'singletonStyleTag' } },
                        'css-loader', 'sass-loader',
                    ],
                },
                // {
                //     test: /\.(sa|sc|c)ss$/,
                //     use: [
                //         MiniCssExtractPlugin.loader,
                //         'css-loader',
                //         'sass-loader',
                //     ],
                // },
            ],
        },
        plugins : [
            new webpack.DefinePlugin ({
                'process.env': {
                    // PACKAGE_dependencies : ' "'+ dependencies + '"' ,
                    // PACKAGE_devDependencies : ' "'+ devDependencies + '"'        ,
                }
            }),
            // new ExtractTextPlugin("style.css"),
            // new ExtractTextPlugin("style.css"),
        ],

    },


// sass-loader 7버전대 에서 작동하는 코드
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             data: `
    //                 @import '@/style/font/font.scss';
    //                 @import "@/style/global/_reset.scss";
    //                 @import "@/style/global/_variable.scss";
    //                 @import "@/style/global/_reset_custom.scss";
    //                 @import "@/style/global/_media.scss";
    //                 @import "@/style/global/_transition.scss";
    //                 @import "@/style/global/_global.scss";
    //                 @import "@/style/global/_icon.scss";
    //             `
    //         }
    //     }
    // },

    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import '@/style/_preload.scss';
                `
            }
        }
    },
// sass-loader 7버전대 에서 작동하는 코드




};













// css: {
//     loaderOptions: {
//         sass: {
//             additionalData: `
//                 @import '@/style/font/font.scss';
//                 @import "@/style/global/_reset.scss";
//                 @import "@/style/global/_variable.scss";
//                 @import "@/style/global/_reset_custom.scss";
//                 @import "@/style/global/_media.scss";
//                 @import "@/style/global/_transition.scss";
//                 @import "@/style/global/_global.scss";
//                 @import "@/style/global/_icon.scss";
//             `
//         }
//     }
// },

// css: {
//     loaderOptions: {
//         sass: {
//             additionalData: `
//                 @import "@/style/_preload.scss";
//             `
//         }
//     }
// },