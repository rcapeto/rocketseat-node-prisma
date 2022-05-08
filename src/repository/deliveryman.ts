import { hash } from 'bcrypt';

import { prismaClient } from '../database/prisma';

export interface IDeliveryman {
   username: string;
   password: string;
};

export class DeliverymanRepository {
   private static INSTANCE: DeliverymanRepository;

   private constructor() {}

   public static getInstance() {
      if(!this.INSTANCE) {
         this.INSTANCE = new DeliverymanRepository();
      }

      return this.INSTANCE;
   }

   async create(data: IDeliveryman) {
      const hashPassword = await hash(data.password, 10);
      const username = data.username.toLowerCase();

      const deliveryman = await prismaClient.deliveryman.create({
         data: {
            username,
            password: hashPassword
         }
      });

      return deliveryman;
   }

   async checkHasDeliveryman(username: string) {
      const deliveryman = await prismaClient.deliveryman.findFirst({
         where: { 
            username: {
               equals: username.toLowerCase(),
            }
         }
      });

      return deliveryman;
   }

   async getDeliverymanWithID(id: string) {
      const client = await prismaClient.deliveryman.findFirst({
         where: {
            id
         }
      });

      return client;
   }

   async getAllDeliveryman() {
      return await prismaClient.deliveryman.findMany();
   }

   async getDeliveries(id_deliveryman: string) {
      const deliveries = await prismaClient.deliveryman.findMany({
         where: {
            id: id_deliveryman,
         },
         select: {
            username: true,
            id: true,
            Deliveries: true,
         }
      });

      return deliveries;
   }
};