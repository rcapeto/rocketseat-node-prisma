import { DeliverymanRepository } from "../../../../repository/deliveryman";

interface ICreateDeliveryman {
   username: string;
   password: string;
};

export class CreateDeliverymanUseCase {
   constructor(
      private deliverymanRepository: DeliverymanRepository
   ) {}

   async execute(data: ICreateDeliveryman) {
      const deliverymanExists = await this.deliverymanRepository.checkHasDeliveryman(data.username);

      if(deliverymanExists) {
         throw new Error('Deliveryman already exists!');
      }

      return await this.deliverymanRepository.create(data);
   };
};