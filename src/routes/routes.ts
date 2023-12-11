import { Router } from "express";
import { HelloControler } from "../controller/HelloController";

class Routers {
  private router: Router;
  private helloControler: HelloControler;
  constructor() {
    this.router = Router();
    this.helloControler = new HelloControler();
  }

  getRoutes() {
    this.router.get("/", this.helloControler.home);

    return this.router;
  }
}
export { Routers };
