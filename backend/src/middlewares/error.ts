import { ErrorRequestHandler } from 'express';
import { Error as MongooseError } from 'mongoose';
import { isCelebrateError } from 'celebrate';
import { errorMessage400, errorMessage409, errorMessage500 } from '../constants/errors';
import BadRequestError from '../errors/bad-request-error';
import BadRequestErrorItemExists from '../errors/item-exists-error';
import DefaultError from '../errors/default-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (isCelebrateError(err)) {
    console.log('Сработал Celebrate err');
    let errMessage = err.message;

    const errDetails = err.details;
    /* eslint-disable-next-line */
    for (const key of errDetails.keys()) {
      const errorKey = errDetails.get(key);

      if (errorKey && errorKey.details && errorKey.details.length > 0) {
        const errorMessage = errorKey.details[0].message;
        console.log(errorMessage);
        errMessage = errorMessage;
      }
    }

    const resultError = new BadRequestError(errMessage);
    return res
      .status(resultError.statusCode)
      .json({ message: resultError.message });
  }

  if (Object.values(errorMessage400).includes(err.message)) {
    console.log('Сработал 400 err');
    const resultError = new BadRequestError(err.message);
    return res
      .status(resultError.statusCode)
      .json({ message: resultError.message });
  }

  if (err.message.includes('E11000')) {
    console.log('Сработал 409 err');
    const resultError = new BadRequestErrorItemExists(errorMessage409.PRODUCT_EXSISTS);
    return res
      .status(resultError.statusCode)
      .json({ message: resultError.message });
  }

  if (Object.values(errorMessage500).includes(err.message) || err.name === 'ValidatorError') {
    console.log('Сработал 500 err или Validator Error');

    const resultError = new DefaultError(err.message);
    return res
      .status(resultError.statusCode)
      .json({ message: resultError.message });
  }

  if (err.name === 'CastError' || err instanceof MongooseError.ValidationError) {
    console.log('Сработал CastError err MongooseError.ValidationError');

    const resultError = new NotFoundError(err.message);
    return res
      .status(resultError.statusCode)
      .json({ message: resultError.message });
  }
  console.log('Сработал общий err');
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' });
};

export default errorHandler;
