// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path, { resolve } from "path";
import preactCliSwPrecachePlugin from "preact-cli-sw-precache";
// import CopyWebpackPlugin from "copy-webpack-plugin";

// const preactCliSvgLoader = require("preact-cli-svg-loader");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const WebpackConfigHelpers = require("webpack-config-helper");
import dotenv from "dotenv";

export default {
    /**
     * Function that mutates the original webpack config.
     * Supports asynchronous changes when a promise is returned (or it's an async function).
     *
     * @param {import("preact-cli").Config} config - original webpack config
     * @param {import("preact-cli").Env} env - current environment and options pass to the CLI
     * @param {import("preact-cli").Helpers} helpers - object with useful helpers for working with the webpack config
     * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
     */

    webpack(config, env, helpers, options) {
        delete config.entry.polyfills;

        config.node.process = true;
        console.log("!=========!");

        //https://github.com/preactjs/preact-cli/wiki/Webpack-Config-Helpers
        const webpack = helpers.webpack;

        // config.output.publicPath = '/relativepath/';
        dotenv.config();
        const environment = process.env.ENVIRONMENT;
        const isProduction = environment === "production";
        const isStaging = environment === "staging";
        const isDevelopment = environment === "development";

        console.log(`environment is ${environment}`);
        if (!isDevelopment) {
            config.plugins.push(
                new helpers.webpack.DefinePlugin({
                    "process.env.ENVIRONMENT": JSON.stringify(environment)
                })
            );
            const getURLPrefix = (environment) => `https://uiwiwidget.${environment}.ippen.space/`;
            config.output.publicPath = getURLPrefix(environment);

            console.log(getURLPrefix(environment));
        }

        const fileloader = helpers.getLoadersByName(config, "file-loader")[0];
        fileloader.rule.options = {
            esModule: false,
            // name: getURLPrefix() + '[name].[ext][query]',
            name: "[hash].[ext][query]"
        };

        // console.log(helpers.getLoadersByName(config, "url-loader"))

        // config.module.rules.push({
        //     test: /\.(png|jpg|jpeg|gif)$/i,
        //     use: [{
        //         loader: 'url-loader',
        //         options: {
        //             limit: 8192 // in bytes
        //         }
        //     }]
        // })
        // config.module.rules.push(
        //       {
        //             test: /\.svg$/,
        //             use: ["preact-svg-loader"],
        //       });

        const matchingRules = helpers.getRulesByMatchingFile(
            config,
            "src/uiwiwidget/components/Quiz/Newsletter/Newsletter.scss"
        );
        // console.log(matchingRules)
        // console.log(helpers.getLoadersByName(config, "sass-loader"))
        // console.log(JSON.stringify(config, null, 2))

        const css = helpers.getLoadersByName(config, "css-loader");
        css.map(({ ruleIndex, loaderIndex }) => {
            //             "style-loader", // Injects style into DOM
            //             "css-loader",   // Turns CSS into JS
            //             {
            //                 loader: 'resolve-url-loader',
            //             },
            //             "sass-loader"   // Turns SCSS into CSS
            if (config.module.rules[ruleIndex].use[loaderIndex].loader !== "resolve-url-loader") {
                config.module.rules[ruleIndex].use.splice(loaderIndex + 1, 0, {
                    loader: "resolve-url-loader"
                });
            }
            // console.log(config.module.rules[ruleIndex])
            // config.module.rules[ruleIndex].use.splice(loaderIndex+2, 0, {
            //         loader: 'resolve-url-loader',
            //     },
            // )
        });

        const loaders = helpers.getLoaders(config);
        // console.log(JSON.stringify(loaders, null, 2))
        // const loader = helpers.getLoadersByName(config, "url-loader")[0];
        // console.log(loader)

        const rules = helpers.getRules(config);
        const rulesNames = helpers.getRules(config).map((r) => r.rule);
        // console.log(JSON.stringify(rulesNames, null, 2))
        // console.log(rulesNames)
        const plugins = helpers.getPlugins(config);
        const pluginNames = helpers.getPlugins(config).map((p) => p.plugin.constructor.name);
        // console.log(pluginNames)
        const babelLoader = helpers.getLoadersByName(config, "babel-loader")[0];
        const MiniCssExtractPlugin = helpers.getPluginsByName(config, "MiniCssExtractPlugin")[0];
        MiniCssExtractPlugin.plugin.options = {
            ...MiniCssExtractPlugin.plugin.options,
            filename: "[name].css",
            chunkFilename: "[id].css"
        };

        // config.module.rules = [
        //     ...config.module.rules.map((rule) => {
        //         console.log(rule)
        //         if (rule.loader === "babel-loader") {
        //             const use = [
        //                 {
        //                     loader: "babel-loader",
        //                     options: rule.options
        //                 },
        //                 {
        //                     loader: "ts-loader"
        //                 }
        //             ];
        //             return {
        //                 ...rule,
        //                 loader: undefined,
        //                 options: undefined,
        //                 use
        //             };
        //         }
        //         return rule;
        //     })
        // ]

        // console.log(JSON.stringify(config.module.rules, null, 2))
        // config.plugins =
        //     [
        //         ...config.plugins.filter((plugin) => (
        //             true
        //             // plugin.constructor.name !== "NoEmitOnErrorsPlugin"
        //             // && plugin.constructor.name !== "MiniCssExtractPlugin"
        //         ))
        //     ]
        // config.plugins.push(
        //       new OptimizeCssAssetsPlugin({
        //             assetNameRegExp: /\.optimize\.css$/g,
        //             cssProcessor: require("cssnano"),
        //             cssProcessorPluginOptions: {
        //                   preset: ["default", { discardComments: { removeAll: true } }],
        //             },
        //             canPrint: true,
        //       }),
        // );
        // config.plugins.push(
        //     new CopyWebpackPlugin({
        //         patterns: [{
        //             from: 'bundle.production.js',
        //             context: resolve(__dirname, './')
        //         }],
        //     }),
        // );

        if (isProduction) {
            config.devtool = false;
            // config.output = {
            //       ...config.output,
            //       libraryTarget: "umd"
            //       //                sed -i'' -e 's/else if("function"==typeof define&&define.amd)define([],t);//g' dist/bundle.production.js
            //       //                else if("function"==typeof define&&define.amd)define([],t);
            //       //                library: "UIWIWidget",
            //       //                libraryExport: "MyModule",
            //       //                umdNamedDefine: true,
            //       //                globalObject: `(typeof self !== 'undefined' ? self : this)`
            // };
        }
        if (!isProduction) {
            config.devtool = "source-map";
        }
        if (/newsletter/.test(env.dest) || /newsletter/.test(env.template)) {
            const newsletter = resolve("src", "newsletter");
            if (config.entry["ssr-bundle"]) {
                config.entry["ssr-bundle"] = newsletter;
            }
            config.resolve.alias["preact-cli-entrypoint"] = newsletter;

            config.entry = {
                newsletter
            };
            !isDevelopment ? (config.output.publicPath = `${config.output.publicPath}newsletter/`) : null;
        } else {
            const uiwiwidget = resolve("src", "uiwiwidget");
            if (config.entry["ssr-bundle"]) {
                config.entry["ssr-bundle"] = uiwiwidget;
            }
            config.resolve.alias["preact-cli-entrypoint"] = uiwiwidget;
            config.entry = {
                uiwiwidget
            };

            !isDevelopment ? (config.output.publicPath = `${config.output.publicPath}uiwiwidget/`) : null;
        }
        console.log(`config.output.publicPath is ${config.output.publicPath}`);
        // console.log(config.output)
        // console.log(config.resolve.alias['preact-cli-entrypoint'])
        config.output = {
            ...config.output,
            // publicPath: getURLPrefix(),
            filename: "[name].js",
            libraryTarget: "umd"
        };
        // console.log(config.entry)

        config.resolve.alias = {
            ...config.resolve.alias,
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat", // Must be below test-utils
            "react/jsx-runtime": "preact/jsx-runtime"
        };

        // console.log(JSON.stringify(config, null, 2))

        // preactCliSvgLoader(config, helpers);

        const precacheConfig = {
            staticFileGlobs: ["app/css/**.css", "app/**.html", "app/images/**.*", "app/js/**.js"],
            stripPrefix: "app/",
            maximumFileSizeToCacheInBytes: 1024 * 1024,
            runtimeCaching: [
                {
                    urlPattern: /this\\.is\\.a\\.regex/,
                    handler: "networkFirst"
                }
            ]
        };
        return preactCliSwPrecachePlugin(config, precacheConfig);
    }
};
