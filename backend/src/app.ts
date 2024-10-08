import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/routes';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/error';

const { PORT, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();

app.use(express.json());

app.use(errors());
app.use(requestLogger);

app.use(routes);

app.use(errorHandler);
app.use(errorLogger);

app.use(express.static(path.join(__dirname, 'public')));

const bootstrap = async () => {
  try {
    await mongoose.connect(DB_ADDRESS);
    app.listen(PORT, () => {
      console.log('listening on port 3000');
    });
  } catch (error) { console.log('Неизвестная ошибка'); }
};

bootstrap();
