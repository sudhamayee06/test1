// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-mocha-own-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['mocha-own'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: true,
        browsers: ['FirefoxHeadless'],
        customLaunchers: {
            'FirefoxHeadless': {
                base: 'Firefox',
                flags: [
                    '-headless',
                ]
            }
        },
        singleRun: true,
        mochaOwnReporter: {
            reporter: 'json'
        }
    });
};