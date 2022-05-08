import { Router } from 'express';

import { AuthenticateClientController } from '../modules/account/authenticateClient/authenticateClientController';
import { CreateClientController } from '../modules/clients/use-cases/CreateClient/createClientController';
import { FindAllDeliveriesController } from '../modules/clients/use-cases/FindAllDeliveries/findAllDeliveriesController';
import { ClientsRepository } from '../repository/clients';
import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';

export const clientsRoute = Router();

const clientsRepository = ClientsRepository.getInstance();

const createClientController = new CreateClientController(clientsRepository);
const authenticateClientController = new AuthenticateClientController(clientsRepository);
const findAllDeliveriesController = new FindAllDeliveriesController(clientsRepository);

const create = createClientController.handle.bind(createClientController);
const authenticate = authenticateClientController.handle.bind(authenticateClientController);
const findAllDeliveries = findAllDeliveriesController.handle.bind(findAllDeliveriesController);

clientsRoute.post('/create', create);
clientsRoute.post('/authenticate', authenticate);
clientsRoute.get('/deliveries', ensureAuthenticateClient, findAllDeliveries);