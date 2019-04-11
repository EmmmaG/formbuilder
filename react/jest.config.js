'use strict'
module.exports = {
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
    ],
    collectCoverage: false,
    coverageDirectory: '<rootDir>/coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
    ],
    globals: {
        'ts-jest': {
            babelConfig: {
                presets: [
                    'react',
                    [
                        'env',
                        {
                            targets: {
                                node: '8',
                            },
                        },
                    ],
                ],
                plugins: [
                    'transform-object-rest-spread',
                    'transform-class-properties',
                ],
            },
        },
        ENVIRONMENT: 'test',
        APP_VERSION: '0.0.0',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
    ],
    setupFiles: [
        '<rootDir>/test/shim.js',
        '<rootDir>/test/setup.js',
    ],
    setupFilesAfterEnv: ['<rootDir>/node_modules/jest-enzyme/lib/index.js'],
    transform: {
        '.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
    moduleDirectories: [
        'src',
        'node_modules',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/assetsTransformer.js',
        '\\.(css|scss|less)$': '<rootDir>/test/assetsTransformer.js',
    }
}
