import { Router } from 'express';

import { AuthenticateClientController } from '../modules/account/authenticateClient/authenticateClientController';
import { CreateClientController } from '../modules/clients/use-cases/CreateClient/createClientController';
import { ClientsRepository } from '../repository/clients';

export const clientsRoute = Router();

const clientsRepository = ClientsRepository.getInstance();

const createClientController = new CreateClientController(clientsRepository);
const authenticateClientController = new AuthenticateClientController(clientsRepository);

clientsRoute.post('/create', createClientController.handle.bind(createClientController));
clientsRoute.post('/authenticate', authenticateClientController.handle.bind(authenticateClientController));