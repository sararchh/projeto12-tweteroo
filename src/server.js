import express from 'express';
import cors from 'cors';
import querystring from 'querystring';

const app = express();

const routes = express.Router();

app.use(cors());
app.use(express.json());

let avatar;
let arrayUser = [];
let arrayTweets = [];

app.post('/sign-up', (req, res) => {

  if (req.body.username === '' || req.body.avatar === '') {
    return res.status(400).json({ message: `Todos os campos são obrigatórios!` });
  }

  avatar = req.body.avatar;
  arrayUser.push(req.body);
  return res.status(201).send({ message: `Ok` })
});

app.get('/tweets/:USERNAME', (req, res) => {
  let user = req.params.USERNAME;

  const filterTweets = arrayTweets.filter((i) => i.username === user);
  return res.send(filterTweets);
});

app.get('/tweets', (req, res) => {
  let page = req.query.page;
  let init = ((Number(page) * 10) - 10);
  let end = (Number(page) * 10);

  if (page >= 1) {
    return res.send(arrayTweets.slice(init, end));
  }

  return res.status(400).json({ message: `Informe uma página válida!` });
});

app.post('/tweets', (req, res) => {
  let username = req.headers.user;
  let tweet = req.body.tweet;

  const obj = {
    username,
    tweet,
    avatar
  }

  if(tweet !== ''){
    arrayTweets.push(obj);
    return res.status(201).send(obj)
  }
  return res.status(400).json({ message: `Informe tweet válido!` });
})

app.get('*', (req, res) => {
  return res.status(404).json({ message: `Não existe rota para a requisicao solicitada ${req.url},verifique` })
});

app.listen(5000, () => {
  console.log('Running on PORT 5000')
});
