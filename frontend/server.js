const serve = require('serve');

const server = serve(__dirname + '/build', {
  port: 5000,
  ignore: ['node_modules']
});

console.log('Server is running on http://localhost:5000');
