import { App } from './app';
// No início do seu aplicativo


const corsConfig = {
  origin: 'http://localhost:3003',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

const app = new App();

app.listen(PORT);
