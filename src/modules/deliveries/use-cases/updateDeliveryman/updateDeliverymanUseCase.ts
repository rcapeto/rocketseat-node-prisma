import { DeliveryRepository } from "../../../../repository/deliveries";

interface IUpdateDeliveryman {
   id_delivery: string;
   id_deliveryman: string;
};

export class UpdateDeliverymanUseCase {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async execute(data: IUpdateDeliveryman) {
      const delivery = await this.deliveryRepository.update(data);
      return delivery;
   }
};