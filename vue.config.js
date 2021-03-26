const path = require('path');
const webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/'),
                // 'styles': path.resolve('./src')
            }
        },
        // loaders : {
        //     css: ExtractTextPlugin.extract("css"),
        //     sass: ExtractTextPlugin.extract("scss"),
        // },
        plugins : [
            new webpack.DefinePlugin ({
                'process.env': {
                    // PACKAGE_dependencies : ' "'+ dependencies + '"' ,
                    // PACKAGE_devDependencies : ' "'+ devDependencies + '"'        ,
                }
            }),
            // new ExtractTextPlugin("style.css"),
        ]
    },

    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import '@/styles/font/font.scss';
                    @import "@/styles/global/_reset.scss";
                    @import "@/styles/global/_variable.scss";
                    @import "@/styles/global/_reset_custom.scss";
                    @import "@/styles/global/_media.scss";
                    @import "@/styles/global/_transition.scss";
                    @import "@/styles/global/_global.scss";
                    @import "@/styles/global/_icon.scss";
                `
            }
        }
    },

    // css: {
    //     loaderOptions: {
    //         sass: {
    //             additionalData: `
    //                 @import "@/styles/_preload.scss";
    //             `
    //         }
    //     }
    // },

};

