// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import minimist from 'minimist';
import postcss from 'rollup-plugin-postcss'
// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
    .toString()
    .split('\n')
    .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config')
    .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
    input: 'src/entry.js',
    plugins: {
        preVue: [
            alias({
                entries: [
                    {
                        find: '@',
                        replacement: `${path.resolve(projectRoot, 'src')}`,
                    },
                ],
            }),
        ],
        replace: {
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
        vue: {
            css: {
                loaderOptions: {
                    sass: {
                        additionalData: `@import '@/src/lib/_variables.scss';`
                    }
                }
            },
            template: {
                isProduction: true,
            },
            preprocessStyles: true,
            preprocessOptions: {
                scss: {
                    additionalData: `@import '../src/lib/_variables';`,
                },
            }
        },
        postVue: [
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            }),
            commonjs(),
        ],
        babel: {
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            babelHelpers: 'bundled',
        },
        postcss: {
            extract: true,
            modules: true,
            use: [
                ['sass', {
                    data: '@import "../src/lib/_variables";',
                    includePaths: [path.join(__dirname, 'src')]
                }]
            ],
            extensions: ['.scss'],
        }
    },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
    // list external dependencies, exactly the way it is written in the import statement.
    // eg. 'jquery'
    'vue',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
    // Provide global variable names to replace your external imports
    // eg. jquery: '$'
    vue: 'Vue',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
    const esConfig = {
        ...baseConfig,
        input: 'src/entry.esm.js',
        external,
        output: {
            file: 'dist/cutevue.esm.js',
            format: 'esm',
            exports: 'named',
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel({
                ...baseConfig.plugins.babel,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            ...babelPresetEnvConfig,
                            targets: esbrowserslist,
                        },
                    ],
                ],
            }),
            postcss(baseConfig.plugins.postcss),
        ],
    };
    buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
    const umdConfig = {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: 'dist/cutevue.ssr.js',
            format: 'cjs',
            name: 'Cutevue',
            exports: 'auto',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue({
                ...baseConfig.plugins.vue,
                template: {
                    ...baseConfig.plugins.vue.template,
                    optimizeSSR: true,
                },
            }),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
            postcss(baseConfig.plugins.postcss),
        ],
    };
    buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
    const unpkgConfig = {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: 'dist/cutevue.min.js',
            format: 'iife',
            name: 'Cutevue',
            exports: 'auto',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
            terser({
                output: {
                    ecma: 5,
                },
            }),
            postcss(baseConfig.plugins.postcss),
        ],
    };
    buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
