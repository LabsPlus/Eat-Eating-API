import { Router } from "express";
import {helloControler} from "./controller/HelloController";
const router: Router = Router();

router.get('/', helloControler.home);

export{router};

