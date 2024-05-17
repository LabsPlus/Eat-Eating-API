import 'express-async-errors';
import express, { Application } from 'express';
import { LoginRoutes } from './routes/login.routes';
import { UserRoutes } from './routes/user.routes';
import { TicketsRoutes } from './routes/tickets.routes'
import {OperatedTicketsRoutes} from './routes/operatedTickets.routes';
import { errorMiddleware } from './middlewares/error.middlewares';
import requestIp from 'request-ip';
import { CorsMiddleware } from './server';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

export class App {
  private app: Application;

  constructor(corsConfig: CorsMiddleware) {
    this.app = express();
    this.middleware(corsConfig);
    this.setupAllRoutes();
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    this.app.use(errorMiddleware);
  }

  private setupAllRoutes() {
    this.setupLoginRoutes();
    this.setupUserRoutes();
    this.setupTicketsRoutes();
    this.setupOperatedTicketsRoutes();
    this.setupSwagger();
  }

  private setupSwagger() {
    this.app.use(
      '/documentation',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec),
    );
  }

  private setupUserRoutes() {
    const userRoutes = new UserRoutes();
    const userBaseRoute = '/user';

    this.app.use(userBaseRoute, userRoutes.postRoutes());
    this.app.use(userBaseRoute, userRoutes.putRoutes());
    this.app.use(userBaseRoute, userRoutes.getRoutes());
    this.app.use(userBaseRoute, userRoutes.deleteRoutes());
  }

  private setupLoginRoutes() {
    const loginRoutes = new LoginRoutes();
    const loginBaseRoute = '/login';

    this.app.use(loginBaseRoute, loginRoutes.patchRoutes());
    this.app.use(loginBaseRoute, loginRoutes.postRoutes());
  }

  private setupTicketsRoutes(){
    const ticketsRoutes = new TicketsRoutes();
    const ticketsBaseRoute = '/tickets';

    this.app.use(ticketsBaseRoute, ticketsRoutes.postRoutes());
    this.app.use(ticketsBaseRoute, ticketsRoutes.getRoutes());
     this.app.use(ticketsBaseRoute, ticketsRoutes.putRoutes());
  }
  private setupOperatedTicketsRoutes(){
    const operatedTicketsRoutes = new OperatedTicketsRoutes();
    const OperatedTicketsBaseRoute = '/operated-tickets';
     this.app.use(OperatedTicketsBaseRoute , operatedTicketsRoutes.putRoutes());
  }

  private middleware(corsConfig: CorsMiddleware) {
    this.app.use(express.json());
    this.app.use(corsConfig);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestIp.mw());
  }
}
