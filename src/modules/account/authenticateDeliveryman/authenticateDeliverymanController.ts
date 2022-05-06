import { Request, Response } from 'express';

import { config } from '../../../config';
import { logger } from '../../../utils/logger';
import { renderError } from '../../../utils/error';
import { AuthenticateDeliverymanUseCase } from './authenticateDeliverymanUseCase';
import { DeliverymanRepository } from '../../../repository/deliveryman';

export class AuthenticateDeliverymanController {
   constructor(
      private deliverymanRepository: DeliverymanRepository
   ) {}
   
   async handle(request: Request, response: Response) {
      const { username, password } = request.body;

      try {
         const authenticateDeliveryUseCase = new AuthenticateDeliverymanUseCase(this.deliverymanRepository);
         const token = await authenticateDeliveryUseCase.execute({ username, password });
         
         logger('success', `Login DELIVERYMAN with success: ${JSON.stringify({ token })}`);

         return response.status(config.status.ok).json({ token });

      } catch(err) {
         const message = `${(err as Error).message} - Error authenticate Deliveryman`;
         return renderError(response, message, `${message} with username: ${username}`);
      }
   }
};