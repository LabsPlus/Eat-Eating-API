import { NextFunction, Request, Response } from "express";

class HelloControler {
  public home(req: Request, res: Response, next: NextFunction) {
    return res.json({
      response: "Hello",
    });
  }
}

export { HelloControler };
