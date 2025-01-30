import express from 'express';
import routesPetShop from './routes/petshops.routes';
import routesPet from './routes/pets.routes';

const app = express();

app.use(express.json());

//Rotas
app.use(routesPetShop);
app.use(routesPet);

export default app;