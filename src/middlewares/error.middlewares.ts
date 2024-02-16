import { NextFunction, Request, Response } from 'express';
import { ErrorsHelpers } from '../helpers/errors.helpers';

export const errorMiddleware = (
  error: Error & Partial<ErrorsHelpers>,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.message 
  return response.status(statusCode).json({ statusCode, message });
};
