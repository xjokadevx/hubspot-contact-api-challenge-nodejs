import { body } from 'express-validator';
import { RX_JUST_LETTERS, RX_JUST_NUMBERS } from '../utils/constants.js';

export const contactSchemaMwValidator = [
  body('email')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('email es requerido')
    .isEmail({ host_whitelist: ['gmail.com', 'hotmail.com', 'hubspot.com'] })
    .withMessage(
      "email debe ser un correo valido en 'gmail.com', 'hotmail.com' o 'hubspot.com'"
    )
    .escape(),
  body('firstname')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('firstname es requerido')
    .isLength({ min: 5 })
    .withMessage('firstname debe tener al menos 5 caracteres')
    .matches(RX_JUST_LETTERS)
    .withMessage('firstname deben ser solo letras')
    .isString()
    .withMessage('firstname debe ser una cadena de caracteres')
    .escape(),
  body('lastname')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('lastname es requerido')
    .isLength({ min: 5 })
    .withMessage('lastname debe tener al menos 5 caracteres')
    .matches(RX_JUST_LETTERS)
    .withMessage('lastname debe ser solo letras')
    .isString()
    .withMessage('lastname debe ser una cadena de caracteres')
    .escape(),
  body('phone')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('phone es requerido')
    .isLength({ min: 10 })
    .withMessage('phone debe tener al menos 10 caracteres')
    .matches(RX_JUST_NUMBERS)
    .withMessage('phone deben ser solo numeros')
    .isString()
    .withMessage('phone debe ser una cadena de caracteres')
    .escape(),
];
