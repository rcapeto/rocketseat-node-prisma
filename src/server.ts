import express from 'express';

import { config } from './config';
import { clientsRoute } from './routes/clients';
import { deliverymanRoutes } from './routes/deliveryman';
import { deliveriesRoute } from './routes/deliveries';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.use('/clients', clientsRoute);
app.use('/deliveryman', deliverymanRoutes);
app.use('/deliveries', deliveriesRoute);

app.listen(config.port, function() {
   console.log(`Server is running at port: ${config.port}`);
});