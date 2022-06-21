const {createDefaultConfig} = require('@open-wc/testing-karma');
const merge = require('webpack-merge');

module.exports = (config) => {
  config.set(
      merge(createDefaultConfig(config), {
        files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep tests/foo/bar.test.js
        // npm run test -- --grep tests/bar/*
        // npm run test:watch -- --grep tests/foo/bar.test.js
          {pattern: config.grep ? config.grep : 'tests/**/*.test.js', type: 'module', watched: false},
        ],
        esm: {
          nodeResolve: true,
        },
        coverageIstanbulReporter: {
          thresholds: {
            global: {
              statements: 80,
              lines: 80,
              branches: 80,
              functions: 80,
            },
          },
        },
        reporters: ['progress', 'junit'],
        junitReporter: {
          outputDir: './tests/results',
        },
      // you can overwrite/extend the config further
      }),
  );
  return config;
};
