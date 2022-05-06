import { Request, Response } from 'express';

import { config } from '../../../config';
import { logger } from '../../../utils/logger';
import { renderError } from '../../../utils/error';
import { AuthenticateClientUseCase } from './authenticateClientUseCase';
import { ClientsRepository } from '../../../repository/clients';

export class AuthenticateClientController {
   constructor(
      private clientsRepository: ClientsRepository
   ) {}
   
   async handle(request: Request, response: Response) {
      const { username, password } = request.body;

      try {
         const authenticateClientUseCase = new AuthenticateClientUseCase(this.clientsRepository);
         const token = await authenticateClientUseCase.execute({ username, password });
         
         logger('success', `Login CLIENT with success: ${JSON.stringify({ token })}`);

         return response.status(config.status.ok).json({ token });

      } catch(err) {
         const message = `${(err as Error).message} - Error authenticate Client`;
         return renderError(response, message, `${message} with username: ${username}`);
      }
   }
};