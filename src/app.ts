import 'express-async-errors';
import express, { Application } from 'express';
import { LoginRoutes } from './routes/login.routes';
import { UserRoutes } from './routes/user.routes';
import { AdministratorRoutes } from './routes/administrator.routes';
import { TicketsRoutes } from './routes/tickets.routes'
import {OperatedTicketsRoutes} from './routes/operatedTickets.routes';
import { RfidCardRoutes } from './routes/rfid.routes';
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
      return this.setupAllRoutes()
    });
    this.app.use(errorMiddleware);
  }

  private setupAllRoutes() {
    this.setupLoginRoutes();
    this.setupUserRoutes();
    this.setupTicketsRoutes();
    this.setupOperatedTicketsRoutes();
    this.setupRfidCardRoutes();
    this.setupSwagger();
    this.setupAdministratorRoutes();
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
  private setupAdministratorRoutes() {
    const administratorRoutes = new AdministratorRoutes();
    const administratorBaseRoute = '/administrator';

    this.app.use(administratorBaseRoute, administratorRoutes.postRoutes());
    
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

  private setupRfidCardRoutes() {
    const rfidCardRoutes = new RfidCardRoutes();
    const rfidBaseRoute = '/rfid-card';

    this.app.use(rfidBaseRoute, rfidCardRoutes.getRoutes());
  }

  private middleware(corsConfig: CorsMiddleware) {
    this.app.use(express.json());
    this.app.use(corsConfig);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestIp.mw());
  }
}
