const path = require('path');
module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
}



module.exports = {
    webpackFinal : (config) => {
        config.module.rules.push({
            include: path.resolve(__dirname, '../'),
        });
        return config
    }
    // webpackFinal: (config) => {
    //     // config.module.rules.push({
    //     //     test: /\.css$/,
    //     //     use: ['style-loader', 'css-loader', 'sass-loader'],
    //     //     include: path.resolve(__dirname, '../'),
    //     // });

    //     // return config;

    //     // const newCfg = {
    //     //     ...config,
    //     //     module: {
    //     //         ...config.module,
    //     //         rules: [
    //     //             {
    //     //                 test: /\.css$/,
    //     //                 use: ['style-loader', 'css-loader', 'sass-loader'],
    //     //                 include: path.resolve(__dirname, '../'),
    //     //             },
    //     //             ...config.module.rules,
    //     //         ]
    //     //     }
    //     // };
    //     console.log('hey!!!!!!!!!!');
    //     console.log([...config.module.rules])
    //     return config;

    // },
};