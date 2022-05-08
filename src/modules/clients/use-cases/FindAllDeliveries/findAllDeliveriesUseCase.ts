import { ClientsRepository } from "../../../../repository/clients";

export class FindAllDeliveriesUseCase {
   constructor(
      private clientsRepository: ClientsRepository 
   ) {}

   async execute(id_client: string) {
      const deliveries = await this.clientsRepository.getDeliveries(id_client);
      return deliveries;
   }
};