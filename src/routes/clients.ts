import { Router } from 'express';

import { AuthenticateClientController } from '../modules/account/authenticateClient/authenticateClientController';
import { CreateClientController } from '../modules/clients/use-cases/CreateClient/createClientController';
import { ClientsRepository } from '../repository/clients';

export const clientsRoute = Router();

const clientsRepository = ClientsRepository.getInstance();

const createClientController = new CreateClientController(clientsRepository);
const authenticateClientController = new AuthenticateClientController(clientsRepository);

const create = createClientController.handle.bind(createClientController);
const authenticate = authenticateClientController.handle.bind(authenticateClientController);

clientsRoute.post('/create', create);
clientsRoute.post('/authenticate', authenticate);