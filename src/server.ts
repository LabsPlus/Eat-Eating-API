import { CorsOptions } from 'cors';
import { App } from './app';

const corsConfig: CorsOptions = {
  origin: ['https://eat-eating-web-app.vercel.app/', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  maxAge: 300,
};

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

const app = new App(corsConfig);

app.listen(PORT);
