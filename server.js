const app = require('./app.js')

const port  = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
});

//TYPESCIPT
// import app from './app';

// const port: number = parseInt(process.env.port, 10) || 3000;
// app.listen(port, () => {
//   console.log(`Listening to port ${port}`);
// });
