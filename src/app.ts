import express from "express"
import cors from "cors"
import morgan from "morgan"
import "reflect-metadata"
import { createConnections } from "typeorm"

import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import ProductosRoutes from "./routes/productsRoutes"
import userRoutes from "./routes/userRoutes"

// Initialization
const app = express();
createConnections()

// Settings
app.set('port', process.env.port || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


//Routes
app.get('/', (req, res) => {
    res.send(`The API is at http://localhost:${app.get('port')}`);
});
app.use('/api/', ProductosRoutes);
app.use('/api/', userRoutes);

export default app;