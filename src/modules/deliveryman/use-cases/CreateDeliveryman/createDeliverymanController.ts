import { Request, Response } from 'express';

import { config } from '../../../../config';
import { CreateDeliverymanUseCase } from './createDeliverymanUseCase';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';
import { DeliverymanRepository } from '../../../../repository/deliveryman';

export class CreateDeliverymanController {
   constructor(
      private deliverymanRepository: DeliverymanRepository
   ) {}

   async handle(request: Request, response: Response) {
      const { username, password } = request.body;

      const createDeliverymanUseCase = new CreateDeliverymanUseCase(this.deliverymanRepository);
      
      try {
         const deliveryman = await createDeliverymanUseCase.execute({ username, password });

         logger('success', `Create deliveryman with success! data: ${JSON.stringify(deliveryman)}`);

         return response.status(config.status.created).json({ data: deliveryman });

      } catch(err) {
         const message = `${(err as Error).message} - Error create Deliveryman`;
         return renderError(response, message, `${message} with username: ${username}`);
      }
   }
};