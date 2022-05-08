import { DeliverymanRepository } from "../../../../repository/deliveryman";

export class FindAllDeliveriesUseCase {
   constructor(
      private deliverymanRepository: DeliverymanRepository,
   ) {}

   async execute(id_deliveryman: string) {
      const deliveries = await this.deliverymanRepository.getDeliveries(id_deliveryman);
      return deliveries;
   }
};