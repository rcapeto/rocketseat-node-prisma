import { DeliveryRepository } from "../../../../repository/deliveries";

import { config } from '../../../../config';
import { renderError } from '../../../../utils/error';
import { logger } from '../../../../utils/logger';
import { UpdateDeliverymanUseCase } from "./updateDeliverymanUseCase";
import { Request, Response } from "express";

export class UpdateDeliverymanController {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async handle(request: Request, response: Response) {
      const id_deliveryman = request.id_deliveryman;
      const { id: id_delivery } = request.params;

      if(!id_delivery) {
         logger('error', 'Error update delivery, because user do not pass id params');
         return response.status(config.status.bad_request).json({
            message: 'Please inform any delivery id in params'
         });
      }

      const data = { id_delivery, id_deliveryman };

      const updateDeliverymanUseCase = new UpdateDeliverymanUseCase(this.deliveryRepository);

      try {
         const delivery = await updateDeliverymanUseCase.execute(data);

         logger('success', `Upadated delivery with success! data: ${JSON.stringify(delivery)}`);
         return response.status(config.status.created).json({ data: delivery });

      } catch(err) {
         const message = `${(err as Error).message} - Error update Delivery`;
         return renderError(response, message, `${message} with : ${JSON.stringify(data)}`);
      }
   }
};