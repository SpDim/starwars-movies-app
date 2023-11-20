module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        'node-fetch': '<rootDir>/components/SearchEpisode/mock-node-fetch-file.js',
    },
};
