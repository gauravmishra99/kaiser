const app = require('./app.js')

const port  = process.env.port || 3000;
const server = app.listen(port);
console.log(`Listening to port ${port}`)