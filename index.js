const express = require('express');
const error = require('./middlewares/error');
const { loginRouter } = require('./controllers/loginRouter');
const { userRouter } = require('./controllers/userRouter');

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use(error);

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
