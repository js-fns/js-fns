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

    reporters: ['dots'].concat(crossBrowser ? 'BrowserStack' : []),

    webpack: {
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

    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },

    customLaunchers: {
      ie11: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11',
        os: 'Windows',
        os_version: '10',
      },
    },
  })
}
