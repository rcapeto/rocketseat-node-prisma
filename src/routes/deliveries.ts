import { Router } from 'express';

import { CreateDeliveryController } from '../modules/deliveries/use-cases/createDelivery/createDeliveryController';
import { FindAllAvailableController } from '../modules/deliveries/use-cases/findAllAvailable/findAllAvailableController';
import { DeliveryRepository } from '../repository/deliveries';
import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymanController } from '../modules/deliveries/use-cases/updateDeliveryman/updateDeliverymanController';
import { UpdateEndDateController } from '../modules/deliveries/use-cases/updateEndDate/updateEndDateController';

const deliveryRepository = DeliveryRepository.getInstance();
const createDeliveryController = new CreateDeliveryController(deliveryRepository);
const findAllAvailableController = new FindAllAvailableController(deliveryRepository);
const updateDeliverymanController = new UpdateDeliverymanController(deliveryRepository);
const updateEndDateController = new UpdateEndDateController(deliveryRepository);

export const deliveriesRoute = Router();

const create = createDeliveryController.handle.bind(createDeliveryController);
const getAll = findAllAvailableController.handle.bind(findAllAvailableController);
const updateDeliveryman = updateDeliverymanController.handle.bind(updateDeliverymanController);
const updateEndDate = updateEndDateController.handle.bind(updateEndDateController);

deliveriesRoute.post('/create', ensureAuthenticateClient, create);
deliveriesRoute.get('/available', ensureAuthenticateDeliveryman, getAll);
deliveriesRoute.put('/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliveryman);
deliveriesRoute.put('/updateEndDate/:id', ensureAuthenticateDeliveryman, updateEndDate);