const env = require('./.env.js');

module.exports = {
    // the port the app is running on
    port: env.port,
    // page defaults
    page: {
        title: 'Default page title',
        meta: {
            description: 'Default page description'
        },
    },
    // site defaults
    site: {
        analyticsId: env.analyticsId,
    },
}
