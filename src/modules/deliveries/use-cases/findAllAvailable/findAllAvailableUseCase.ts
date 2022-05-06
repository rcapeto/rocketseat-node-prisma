import { DeliveryRepository } from "../../../../repository/deliveries";

export class FindAllAvailableUseCase {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async execute() {
      const deliveries = await this.deliveryRepository.getAllAvailable();
      return deliveries;
   }
};