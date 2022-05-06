import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ClientsRepository } from '../../../repository/clients';
import { config } from '../../../config';

interface IAuthenticateClient {
   username: string;
   password: string;
};

export class AuthenticateClientUseCase {
   constructor(
      private clientsRepository: ClientsRepository
   ) {}

   async execute({ username, password }: IAuthenticateClient) {
      const client = await this.clientsRepository.checkHasClient(username);

      if(!client) {
         throw new Error('Username or password is incorrect!');
      }

      const passwordMatch = await compare(password, client.password);

      if(!passwordMatch) {
         throw new Error('Password is incorrect!');
      }

      const token = sign({ username }, config.secret_key.client, { 
         subject: client.id,
         expiresIn: '1d',
      });

      return token;
   };
};