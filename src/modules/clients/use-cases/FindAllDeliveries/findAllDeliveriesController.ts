import { Request, Response } from 'express';

import { config } from '../../../../config';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';


import { ClientsRepository } from "../../../../repository/clients";
import { FindAllDeliveriesUseCase } from './findAllDeliveriesUseCase';

export class FindAllDeliveriesController {
   constructor(
      private clientsRepository: ClientsRepository 
   ) {}

   async handle(request: Request, response: Response) {
      const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(this.clientsRepository);

      const id_client = request.id_client;

      if(!id_client) {
         logger('error', 'Error find client deliveries, because client is not logged!');
         return response.status(config.status.bad_request).json({
            message: 'Please sign in'
         });
      }

      try {
         const deliveries = await findAllDeliveriesUseCase.execute(id_client);

         logger('success', `Get client deliveries with success! quantity: ${deliveries.length}`);

         return response.status(config.status.created).json({ data: deliveries });

      } catch(err) {
         const message = `${(err as Error).message} - Error get client deliveries`;
         return renderError(response, message, `${message} with id_client: ${id_client}`);
      }
   }
};