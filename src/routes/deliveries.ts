import { Router } from 'express';

import { CreateDeliveryController } from '../modules/deliveries/use-cases/createDelivery/createDeliveryController';
import { FindAllAvailableController } from '../modules/deliveries/use-cases/findAllAvailable/findAllAvailableController';
import { DeliveryRepository } from '../repository/deliveries';
import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';

const deliveryRepository = DeliveryRepository.getInstance();
const createDeliveryController = new CreateDeliveryController(deliveryRepository);
const findAllAvailableController = new FindAllAvailableController(deliveryRepository);

export const deliveriesRoute = Router();

const create = createDeliveryController.handle.bind(createDeliveryController);
const getAll = findAllAvailableController.handle.bind(findAllAvailableController);

deliveriesRoute.post('/create', ensureAuthenticateClient, create);
deliveriesRoute.get('/available', ensureAuthenticateDeliveryman, getAll);