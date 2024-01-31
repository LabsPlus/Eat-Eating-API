import { Request, Response, NextFunction } from 'express';
import { App } from './app';

export type CorsMiddleware = (req: Request, res: Response, next: NextFunction) => void;

const corsConfig : CorsMiddleware = (req, res, next) => {
  const allowedOrigins = ['https://eat-eating-web-app.vercel.app', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin || '')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, HEAD, PATCH");
  next();
};

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

const app = new App(corsConfig);

app.listen(PORT);

  // const corsConfig = {
  //   origin: ['https://eat-eating-web-app.vercel.app', 'http://localhost:3000'],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   optionsSuccessStatus: 204,
  // };