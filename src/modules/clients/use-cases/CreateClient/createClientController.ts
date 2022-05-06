import { Request, Response } from 'express';

import { config } from '../../../../config';
import { CreateClassUseCase } from './createClientUseCase';
import { logger } from '../../../../utils/logger';
import { renderError } from '../../../../utils/error';
import { ClientsRepository } from '../../../../repository/clients';

export class CreateClientController {
   constructor(
      private clientsRepository: ClientsRepository
   ) {}

   async handle(request: Request, response: Response) {
      const { username, password } = request.body;

      const createClientUseCase = new CreateClassUseCase(this.clientsRepository);
      
      try {
         const client = await createClientUseCase.execute({ username, password });

         logger('success', `Create client with success! data: ${JSON.stringify(client)}`);

         return response.status(config.status.created).json({ data: client });

      } catch(err) {
         const message = `${(err as Error).message} - Error create Client`;
         return renderError(response, message, `${message} with username: ${username}`);
      }
   }
};