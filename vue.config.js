const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const path = require('path');
const fs = require('fs');
const browserWarning = fs.readFileSync(
    __dirname + '/node_modules/@nimiq/browser-warning/dist/browser-warning.html.template'
);

// Fix build for Node version with OpenSSL 3
const crypto = require('crypto');

const origCreateHash = crypto.createHash;
crypto.createHash = (alg, opts) => origCreateHash(alg === 'md4' ? 'md5' : alg, opts);

const configureWebpack = {
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/@nimiq/vue-components/dist/img', to: 'img' },
            { from: 'node_modules/@nimiq/browser-warning/dist', to: './' },
        ]),
        new WriteFileWebpackPlugin()
    ],
    // Resolve config for yarn build
    resolve: {
        alias: {
            'vue': path.resolve('./node_modules/vue')
        }
    },
    // Fix sourcemaps (https://www.mistergoodcat.com/post/the-joy-that-is-source-maps-with-vuejs-and-typescript)
    devtool: 'eval-source-map',
    output: {
        devtoolModuleFilenameTemplate: info => {
            var $filename = 'sources://' + info.resourcePath;
            if (info.resourcePath.match(/\.vue$/) && !info.query.match(/type=script/)) {
                $filename = 'webpack-generated:///' + info.resourcePath + '?' + info.hash;
            }
            return $filename;
        },
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },
};

const pages = {
    index: {
        // entry for the page
        entry: 'src/main.ts',
        // the source template
        template: 'public/index.html',
        // insert browser warning html templates
        browserWarning,
        // output as dist/index.html
        filename: 'index.html',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
};

const chainWebpack = config => {
    const svgRule = config.module.rule('svg');
    const svgDefaultHandler = svgRule.uses.values()[0];
    svgRule.uses.clear();

    config.module
        .rule('svg')
        // Add new icon SVG rule
        .oneOf('img')
            .test(/img/)
            .use('vue-svg-loader')
                .loader('vue-svg-loader')
                .options({ svgo: false })
                .end()
            .end()
            // Re-add default SVG rule
            .oneOf('default')
            .use()
                .loader(svgDefaultHandler.get('loader'))
                .options(svgDefaultHandler.get('options'))
                .end()
            .end()
};

module.exports = {
    pages,
    configureWebpack,
    chainWebpack,
    outputDir: 'deployment/dist',
    publicPath: '',
};
