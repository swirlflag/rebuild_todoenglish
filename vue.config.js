const path = require('path');
const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/'),
                // 'styles': path.resolve('./src')
            }
        },
        plugins : [
            new webpack.DefinePlugin ({
                'process.env': {
                    // PACKAGE_dependencies : ' "'+ dependencies + '"' ,
                    // PACKAGE_devDependencies : ' "'+ devDependencies + '"'        ,
                }
            })
        ]
    },

    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/_preload.scss";
                `
            }
        }
    }

};
