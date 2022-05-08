import { Request, Response } from 'express';

import { DeliveryRepository } from "../../../../repository/deliveries";
import { config } from '../../../../config';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';
import { FindAllAvailableUseCase } from './findAllAvailableUseCase';


export class FindAllAvailableController {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async handle(request: Request, response: Response) {
      try {
         const findAllWithoutEndDateUseCase = new FindAllAvailableUseCase(this.deliveryRepository);
         const deliveries = await findAllWithoutEndDateUseCase.execute();

         logger('success', `Get deliveries with success! quantity: ${deliveries.length}`);
         return response.status(config.status.ok).json({ data: deliveries });

      } catch(err) {
         const message = `${(err as Error).message} - Error get Deliveries without enddate`;
         return renderError(response, message);
      }
   }
};