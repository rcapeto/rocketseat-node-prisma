import express from 'express';

const app = express();

app.get('/', (request, response) => {
   return response.send('Hello World');
});

app.listen(3000, function() {
   console.log('Server is running...');
});