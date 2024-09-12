import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactListController,
  getContactsBySearchController,
  updateContactController,
} from '../controllers/ContactController.js';
import { contactSchemaMwValidator } from '../middlewares/contactSchemaValidator.js';
import { errorsMwValidator } from '../middlewares/errorsMwValidator.js';
import { contactIdPathMwValidator } from '../middlewares/contactIdPathValidator.js';
import { searchSchemaMwValidator } from '../middlewares/searchSchemaValidator.js';

const contactRouter = Router();

contactRouter.get('/list', getContactListController);
contactRouter.get(
  '/:contactId',
  [contactIdPathMwValidator, errorsMwValidator],
  getContactByIdController
);
contactRouter.post(
  '/search',
  [searchSchemaMwValidator, errorsMwValidator],
  getContactsBySearchController
);
contactRouter.delete(
  '/delete/:contactId',
  [contactIdPathMwValidator, errorsMwValidator],
  deleteContactByIdController
);
contactRouter.post(
  '/add',
  [contactSchemaMwValidator, errorsMwValidator],
  createContactController
);
contactRouter.put(
  '/update/:contactId',
  [contactIdPathMwValidator, contactSchemaMwValidator, errorsMwValidator],
  updateContactController
);

export default contactRouter;
