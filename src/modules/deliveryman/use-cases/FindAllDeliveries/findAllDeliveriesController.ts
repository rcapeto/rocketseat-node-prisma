import { Request, Response } from 'express';

import { config } from '../../../../config';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';


import { FindAllDeliveriesUseCase } from './findAllDeliveriesUseCase';
import { DeliverymanRepository } from '../../../../repository/deliveryman';

export class FindAllDeliveriesController {
   constructor(
      private deliverymanRepository: DeliverymanRepository 
   ) {}

   async handle(request: Request, response: Response) {
      const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(this.deliverymanRepository);

      const id_deliveryman = request.id_deliveryman;

      if(!id_deliveryman) {
         logger('error', 'Error find deliveryman deliveries, because deliveryman is not logged!');
         return response.status(config.status.bad_request).json({
            message: 'Please sign in'
         });
      }

      try {
         const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman);

         logger('success', `Get deliveryman deliveries with success! quantity: ${deliveries.length}`);

         return response.status(config.status.created).json({ data: deliveries });

      } catch(err) {
         const message = `${(err as Error).message} - Error get deliveryman deliveries`;
         return renderError(response, message, `${message} with id_deliveryman: ${id_deliveryman}`);
      }
   }
};