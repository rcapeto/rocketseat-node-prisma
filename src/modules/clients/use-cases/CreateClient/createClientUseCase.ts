import { ClientsRepository } from '../../../../repository/clients';

interface ICreateClient {
   password: string;
   username: string;
};

export class CreateClassUseCase {
   constructor(
      private clientsRepository: ClientsRepository
   ) {}

   async execute(data: ICreateClient) {
      const clientExists = await this.clientsRepository.checkHasClient(data.username);

      if(clientExists) {
         throw new Error('Client already exists!');
      }

      return await this.clientsRepository.create(data);
   }
};