import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { config } from "../config";
import { renderError } from '../utils/error';

export const ensureAuthenticateClient = async (
   request: Request, 
   response: Response, 
   next: NextFunction
) => {
   const authHeader = request.headers.authorization;

   if(!authHeader) {
      return response.status(config.status.bad_request).json({
         message: 'Token missing',
      });
   }

   const [_, token] = authHeader.split(' ');

   try {
      const { sub } = verify(token, config.secret_key.client);
      const id_client = sub as string;

      request.id_client = id_client;

      return next();

   } catch(err) {
      return renderError(response, 'Invalid Token');
   }
};