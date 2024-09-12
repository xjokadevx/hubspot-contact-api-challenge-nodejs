import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import requestId from 'express-request-id';

import swaggerDocs from '../utils/swagger.js';
import routerIndex from '../routes/index.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { requestLogMw } from '../middlewares/requestLogMw.js';

dotenv.config();
const { NODE_ENV } = process.env;
const origin_allowed =
  NODE_ENV === 'prod' ? 'https://www.hubspot.com' : 'http://localhost:3300';

const app = express();
app.use(requestId());
app.use(requestLogMw);
app.use(cors({ origin: origin_allowed }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (_, res) => {
  res.redirect('/api-docs');
});

app.get('/health-check', (req, res) => {
  res.send('Works!');
});

app.use('/api', routerIndex);
app.use(errorHandler);
export default app;
