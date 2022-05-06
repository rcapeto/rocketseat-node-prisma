
import { prismaClient } from '../database/prisma';

export interface IDelivery {
   id_client: string;
   item_name: string;
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
         }
      });
   }
};