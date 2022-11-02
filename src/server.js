import express from 'express';
import cors from 'cors';
import querystring from 'querystring';

const app = express();

const routes = express.Router();

app.use(cors());
app.use(express.json());

let arrayUser = [];
let arrayTweets = [
  {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub"
  },
  {
    username: "sara",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub"
  },
];

app.post('/sign-up', (req, res) => {

  if (req.body.username === '' || req.body.avatar === '') {
    return res.status(400).json({ message: `Todos os campos são obrigatórios!` });
  }

  arrayUser.push(req.body);
  return res.status(201).send({ message: `Ok` })
});

app.get('/tweets/:USERNAME', (req, res) => {
  let user = req.params.USERNAME;
  
 const filterTweets = arrayTweets.filter((i)=> i.username === user);
 return res.send(filterTweets);
});

app.get('/tweets', (req, res) => {
  if (req.query.page >= 1) {
    return res.send(arrayTweets);
  }
  
  return res.status(400).json({ message: `Informe uma página válida!` });
});

app.get('*', (req, res) => {
  return res.status(404).json({ message: `Não existe rota para a requisicao solicitada ${req.url},verifique` })
});

app.listen(5000, () => {
  console.log('Running on PORT 5000')
});
