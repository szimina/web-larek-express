import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { Error as MongooseError } from 'mongoose';
import { errorMessage400, errorMessage409, errorMessage500 } from '../constants/errors';

import Product from '../models/product';

const registerOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  const id = faker.string.uuid();

  let calculateTotal = 0;
  await Promise.all(items.map(async (item:string) => {
    const product = await Product.findOne({ _id: item });
    if (product) {
      if (product.price === null) {
        const error = new MongooseError(errorMessage400.PRODUCT_NULL);
        return next(error);
      }
      calculateTotal += (product.price);
    } else {
      const error = new MongooseError(errorMessage400.PRODUCT_NOT_FOUND);
      return next(error);
    }
    return calculateTotal;
  }))
    .then(() => {
      if (total !== calculateTotal) {
        const error = new MongooseError(errorMessage400.ORDER_WRONG_TOTAL);
        return next(error);
      } return res.status(200).send({ id, total: calculateTotal });
    })
    .catch(() => {
      const error = new MongooseError(errorMessage400.ORDER_UNKNOWN_ERROR);
      return next(error);
    });
};

export default registerOrder;
