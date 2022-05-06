import { Request, Response } from "express";

import { DeliveryRepository } from "../../../../repository/deliveries";
import { CreateDeliveryUseCase } from "./createDeliveryUseCase";

import { config } from '../../../../config';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';

export interface ICreateDelivery {
   id_client: string;
   item_name: string;
};

export class CreateDeliveryController {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async handle(request: Request, response: Response) {
      const { item_name } = request.body;
      const id_client = request.id_client;

      if(!id_client) {
         return response.status(config.status.bad_request).json({
            message: 'Client not signed!'
         });
      }

      const createDeliveryUseCase = new CreateDeliveryUseCase(this.deliveryRepository);

      try {
         const delivery = await createDeliveryUseCase.execute({ item_name, id_client });

         logger('success', `Create delivery with success! data: ${JSON.stringify(delivery)}`);
         return response.status(config.status.created).json({ data: delivery });

      } catch(err) {
         const message = `${(err as Error).message} - Error create Delivery`;
         return renderError(response, message, `${message} with item_name: ${item_name}`);
      }
   }
};