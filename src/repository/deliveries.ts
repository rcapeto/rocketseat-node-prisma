
import { prismaClient } from '../database/prisma';

export interface IDelivery {
   id_client: string;
   item_name: string;
};

interface UpdateDelivery {
   id_deliveryman: string;
   id_delivery: string;
};

interface UpdateEndDate {
   id_deliveryman: string;
   id_delivery: string;
};

export class DeliveryRepository {
   private static INSTANCE: DeliveryRepository;

   private constructor() {}

   public static getInstance() {
      if(!this.INSTANCE) {
         this.INSTANCE = new DeliveryRepository();
      }

      return this.INSTANCE;
   }

   async create(data: IDelivery) {
      const delivery = await prismaClient.deliveries.create({ data });
      return delivery;
   }

   async getAllAvailable() {
      return await prismaClient.deliveries.findMany({
         where: {
            end_at: null,
            id_deliveryman: null
         }
      });
   }

   async update({ id_delivery, id_deliveryman }: UpdateDelivery) {
      const result = await prismaClient.deliveries.update({
         where: {
            id: id_delivery,
         },
         data: {
            id_deliveryman
         }
      });

      return result;
   }

   async updateEndDate({ id_delivery, id_deliveryman }: UpdateEndDate) {
      const result = await prismaClient.deliveries.updateMany({
         where: {
            id: id_delivery, 
            id_deliveryman

         },
         data: {
            end_at: new Date(),
         }
      });
      return result;
   }
};