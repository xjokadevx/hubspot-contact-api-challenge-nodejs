import { body } from 'express-validator';
import { RX_PROPERTIES_ALLOWED } from '../utils/constants.js';

export const searchSchemaMwValidator = [
  body('property')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('property es requerido')
    .matches(RX_PROPERTIES_ALLOWED)
    .withMessage(
      "property debe contener una propiedad permitida 'email', 'firstname', 'lastname' o 'phone'"
    )
    .isString()
    .withMessage('property debe ser una cadena de caracteres')
    .escape(),
  body('value')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('value es requerido')
    .isString()
    .withMessage('value debe ser una cadena de caracteres')
    .escape(),
];
