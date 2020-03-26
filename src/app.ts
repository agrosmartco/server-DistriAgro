import express, {Application} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'reflect-metadata';
import {createConnections} from 'typeorm';

import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import ProductosRoutes from './routes/productsRoutes';
import userRoutes from './routes/userRoutes';

class Server {
  // Initialization
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    createConnections();
  }

  config(): void {
    // Settings
    this.app.set('port', process.env.port || 3000);

    //Middlewares
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(express.json());
    this.app.use(passport.initialize());
    passport.use(passportMiddleware);
  }

  routes(): void {
    //Routes
    this.app.get('/', (req, res) => {
      res.send(`The API is at http://localhost:${this.app.get('port')}`);
    });
    this.app.use('/api/', ProductosRoutes);
    this.app.use('/api/', userRoutes);
  }

  start(): void {
    this.app.listen(this.app.get('port'));
    console.log('Server on Port', this.app.get('port'));
  }
}

const server = new Server();
export default server.app;
