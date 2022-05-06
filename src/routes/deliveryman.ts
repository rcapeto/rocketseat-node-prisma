import { Router } from 'express';
import { AuthenticateDeliverymanController } from '../modules/account/authenticateDeliveryman/authenticateDeliverymanController';
import { CreateDeliverymanController } from '../modules/deliveryman/use-cases/CreateDeliveryman/createDeliverymanController';

import { DeliverymanRepository } from '../repository/deliveryman';

export const deliverymanRoutes = Router();

const deliverymanRepository = DeliverymanRepository.getInstance();

const createDeliverymanController = new CreateDeliverymanController(deliverymanRepository);
const authenticateDeliverymanController = new AuthenticateDeliverymanController(deliverymanRepository);

const authenticate = authenticateDeliverymanController.handle.bind(authenticateDeliverymanController);
const create = createDeliverymanController.handle.bind(createDeliverymanController);

deliverymanRoutes.post('/create', create);
deliverymanRoutes.post('/authenticate', authenticate);