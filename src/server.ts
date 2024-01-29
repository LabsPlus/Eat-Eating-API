import { App } from './app';

const corsConfig = {
  origin: ['https://eat-eating-web-app.vercel.app', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

const app = new App(corsConfig);

app.listen(PORT);
