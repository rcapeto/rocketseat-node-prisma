import { Request, Response } from 'express';

import { DeliveryRepository } from "../../../../repository/deliveries";
import { config } from '../../../../config';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';
import { UpdateEndDateUseCase } from './updateEndDateUseCase';


export class UpdateEndDateController {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async handle(request: Request, response: Response) {
      const { id: id_delivery } = request.params;
      const id_deliveryman = request.id_deliveryman;

      try {
         const updateEndDateUseCase = new UpdateEndDateUseCase(this.deliveryRepository);
         await updateEndDateUseCase.execute({ id_delivery, id_deliveryman });

         logger('success', `Update end date delivery with success! id_delivery: ${id_delivery}`);
         return response.status(config.status.ok).json({ data: { message: 'Finish delivery' }});

      } catch(err) {
         const message = `${(err as Error).message} - Error update delivery end date`;
         return renderError(response, message);
      }
   }
};