import express from "express";
import { router } from "./routes";
import morgan from "morgan";

export class App{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.json());
    this.server.use(morgan('dev'));
    this.server.use((req, res, next) =>{
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain
        res.header("Access-Control-Allow-Credentials", "true");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });
  }

  private router(){
    this.server.use(router);
  }
}



