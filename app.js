import app from './routes/index.js';

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
