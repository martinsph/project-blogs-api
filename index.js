const express = require('express');
const error = require('./middlewares/error');
const loginRouter = require('./controllers/loginRouter');
const userRouter = require('./controllers/userRouter');
const categoriesRouter = require('./controllers/categoriesRouter');
const postRouter = require('./controllers/postRouter');

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);
app.use(error);

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
