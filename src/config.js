module.exports = {
  development: {
    isProduction: false,
    port: process.env.PORT,
    api: process.env.API,
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
  },
}[process.env.NODE_ENV || 'development'];
