'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV: '"dev"',
    PROTOCOL: '"https://"',
    URLAPI: '"rcapi.todomath.com"',
    LINK_TODOLIVE: '"https://rc-live.todoenglish.io"'
})
