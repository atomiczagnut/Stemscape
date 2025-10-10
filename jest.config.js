export default {
    // Use Node environment for testing
    testEnvironment: 'node',
   
    // Don't transform files
    transform: {},

    // Enable ES module support
    extensionsToTreatAsEsm: ['.js'],
  
    // Set up module globals for ES modules
    globals: {
        'jest': {
        useESM: true
        }
    }
};
