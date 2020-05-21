process.env.CHROME_BIN = require('puppeteer').executablePath()

const crossBrowser = process.env.CROSS_BROWSER === 'true'

module.exports = (config) => {
  config.set({
    files: ['test/karmaTests.ts'],

    preprocessors: {
      'test/karmaTests.ts': ['webpack', 'sourcemap'],
    },

    frameworks: ['jasmine'],

    browsers: crossBrowser ? ['ie11'] : ['ChromeHeadless'],

    reporters: ['dots'].concat(crossBrowser ? 'saucelabs' : []),

    // Sauce Connect takes time to download,
    // so increase capture timeout to give it time
    captureTimeout: crossBrowser ? 3000000 : 60000,

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',

      resolve: {
        extensions: ['.json', '.js', '.ts'],
      },

      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
      },
    },

    webpackMiddleware: {
      stats: 'errors-only',
    },

    sauceLabs: {
      testName: 'js-fns cross-browser tests',
    },

    customLaunchers: {
      ie11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11',
      },
    },
  })
}
