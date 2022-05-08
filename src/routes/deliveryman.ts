import { Router } from 'express';

import { AuthenticateDeliverymanController } from '../modules/account/authenticateDeliveryman/authenticateDeliverymanController';
import { CreateDeliverymanController } from '../modules/deliveryman/use-cases/CreateDeliveryman/createDeliverymanController';
import { FindAllDeliveriesController } from '../modules/deliveryman/use-cases/FindAllDeliveries/findAllDeliveriesController';
import { DeliverymanRepository } from '../repository/deliveryman';
import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';

export const deliverymanRoutes = Router();

const deliverymanRepository = DeliverymanRepository.getInstance();

const createDeliverymanController = new CreateDeliverymanController(deliverymanRepository);
const authenticateDeliverymanController = new AuthenticateDeliverymanController(deliverymanRepository);
const findAllDeliveriesController = new FindAllDeliveriesController(deliverymanRepository);

const authenticate = authenticateDeliverymanController.handle.bind(authenticateDeliverymanController);
const create = createDeliverymanController.handle.bind(createDeliverymanController);
const findAll = findAllDeliveriesController.handle.bind(findAllDeliveriesController);

deliverymanRoutes.post('/create', create);
deliverymanRoutes.post('/authenticate', authenticate);
deliverymanRoutes.get('/deliveries', ensureAuthenticateDeliveryman, findAll);