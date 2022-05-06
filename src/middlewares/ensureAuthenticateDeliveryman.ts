import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { config } from "../config";
import { renderError } from '../utils/error';

export const ensureAuthenticateDeliveryman = async (
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
      const { sub } = verify(token, config.secret_key.deliveryman);
      const id_deliveryman = sub as string;

      request.id_deliveryman = id_deliveryman;

      return next();

   } catch(err) {
      return renderError(response, 'Invalid Token');
   }
};