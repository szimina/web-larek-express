import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import { errorMessage400, errorMessage500 } from '../constants/errors';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({ items: products, total: products.length }))
  .catch(() => {
    const resultError = new MongooseError(errorMessage500.PRODUCTS);
    next(resultError);
  });

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  return Product.create({
    title, image, category, description, price,
  })
    .then((product) => res.send({ item: product }))
    .catch((err) => {
      const resultError = new MongooseError(err.message);
      return next(resultError);
    });
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const existingUser = await Product.findOne({ _id: id });
  if (!existingUser) {
    const resultError = new MongooseError(errorMessage400.PRODUCT_NOT_EXSISTS);
    return next(resultError);
  }
  return Product.deleteOne(
    { _id: new ObjectId(id) },
  )
    .then(() => res.send({ success: id }));
};
