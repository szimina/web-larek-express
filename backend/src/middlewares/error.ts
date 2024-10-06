import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { errorMessage400, errorMessage409, errorMessage500 } from '../constants/errors';
import BadRequestError from '../errors/bad-request-error';
import BadRequestErrorItemExists from '../errors/item-exists-error';
import DefaultError from '../errors/default-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (Object.values(errorMessage400).includes(err.message)) {
    const result = new BadRequestError(err.message);
    return res
      .status(result.statusCode)
      .json({ message: result.message });
  }

  if (err.message.includes(errorMessage409.PRODUCT_EXSISTS)) {
    const result = new BadRequestErrorItemExists(err.message);
    return res
      .status(result.statusCode)
      .json({ message: result.message });
  }

  if (Object.values(errorMessage500).includes(err.message) || err.name === 'ValidatorError') {
    const result = new DefaultError(err.message);
    return res
      .status(result.statusCode)
      .json({ message: result.message });
  }

  if (err.name === 'CastError' || err instanceof MongooseError.ValidationError) {
    const result = new NotFoundError(err.message);
    return res
      .status(result.statusCode)
      .json({ message: result.message });
  }

  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' });
};

export default errorHandler;
