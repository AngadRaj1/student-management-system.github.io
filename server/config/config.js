const config = {
    default: {
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/studentDb',
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}