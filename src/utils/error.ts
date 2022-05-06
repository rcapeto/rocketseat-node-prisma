import { Response } from 'express';

import { logger } from './logger';
import { config } from '../config';

export const renderError = (response: Response, message: string, loggerMessage?: string) => {
   logger('error', loggerMessage ?? message);
   
   return response.status(config.status.internal_server_error).json({
      error: true,
      errorMessage: message,
   });
};