// require('babel/polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

function createMeta(title) {
  return {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': 'Create Anywhere Publish Everywhere',
      'twitter:card': 'summary',
      'twitter:site': '@CAPE_io',
      'twitter:creator': '@CAPE_io',
      'twitter:title': title,
      'twitter:description': 'Create Anywhere Publish Everywhere',
    },
  };
}

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'edit.cape.io',
  apiPort: process.env.APIPORT || 80,
  app: {
    title: 'CAPE Editor',
    description: 'All the modern best practices in one example.',
    meta: createMeta('CAPE Editor'),
  },
}, environment);
