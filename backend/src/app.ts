import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/error';

const { PORT, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errors());
app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use(errorHandler);
app.use(errorLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('listening on port 3000');
});
