import { Request, Response } from "express";

class HelloControler{

    public home(req: Request, res: Response){
        return res.json({
            response: "Hello"
        })
    }
}

export const helloControler = new HelloControler();