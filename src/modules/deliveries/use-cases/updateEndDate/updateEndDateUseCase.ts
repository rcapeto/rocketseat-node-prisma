import { DeliveryRepository } from "../../../../repository/deliveries";

interface IUpdateEndDate {
   id_delivery: string;
   id_deliveryman: string;
};

export class UpdateEndDateUseCase {
   constructor(
      private deliveryRepository: DeliveryRepository
   ) {}

   async execute(data: IUpdateEndDate) {
      const delivery = await this.deliveryRepository.updateEndDate(data);
      return delivery;
   }
};