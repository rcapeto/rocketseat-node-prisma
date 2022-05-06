import { DeliveryRepository } from "../../../../repository/deliveries";

export interface ICreateDelivery {
   id_client: string;
   item_name: string;
};

export class CreateDeliveryUseCase {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async execute(data: ICreateDelivery) {
      const delivery = await this.deliveryRepository.create(data);
      return delivery;
   }
};