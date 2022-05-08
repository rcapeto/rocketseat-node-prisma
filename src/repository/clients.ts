import { hash } from 'bcrypt';

import { prismaClient } from '../database/prisma';

export interface IClient {
   username: string;
   password: string;
};

export class ClientsRepository {
   private static INSTANCE: ClientsRepository;

   private constructor() {}

   public static getInstance() {
      if(!this.INSTANCE) {
         this.INSTANCE = new ClientsRepository();
      }

      return this.INSTANCE;
   }

   async create(data: IClient) {
      const hashPassword = await hash(data.password, 10);
      const username = data.username.toLowerCase();

      const client = await prismaClient.clients.create({
         data: {
            username,
            password: hashPassword
         }
      });

      return client;
   }

   async checkHasClient(username: string) {
      const client = await prismaClient.clients.findFirst({
         where: { 
            username: {
               equals: username.toLowerCase(),
            }
         }
      });

      return client;
   }

   async getClientWithID(id: string) {
      const client = await prismaClient.clients.findFirst({
         where: {
            id
         }
      });

      return client;
   }

   async getClients() {
      return await prismaClient.clients.findMany();
   }

   async getDeliveries(id_client: string) {
      const deliveries = await prismaClient.clients.findMany({
         where: {
            id: id_client,
         },
         select: {
            username: true,
            id: true,
            Deliveries: true
         },
      });

      return deliveries;
   }
};