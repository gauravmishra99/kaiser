import app from './app'

const port  = process.env.port || 3000;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
});
