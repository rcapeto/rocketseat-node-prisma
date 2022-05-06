import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { DeliverymanRepository } from '../../../repository/deliveryman';
import { config } from '../../../config';

interface IAuthenticateDeliveryman {
   username: string;
   password: string;
};

export class AuthenticateDeliverymanUseCase {
   constructor(
      private deliverymanRepository: DeliverymanRepository
   ) {}

   async execute({ username, password }: IAuthenticateDeliveryman) {
      const deliveryman = await this.deliverymanRepository.checkHasDeliveryman(username);

      if(!deliveryman) {
         throw new Error('Username or password is incorrect!');
      }

      const passwordMatch = await compare(password, deliveryman.password);

      if(!passwordMatch) {
         throw new Error('Password is incorrect!');
      }

      const token = sign({ username }, config.secret_key.deliveryman, { 
         subject: deliveryman.id,
         expiresIn: '1d',
      });

      return token;
   };
};