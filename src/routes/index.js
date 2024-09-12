import { Router } from 'express';
import ContactRoute from './ContactRoute.js';

const routerIndex = Router();
routerIndex.use('/contact', ContactRoute);

export default routerIndex;
