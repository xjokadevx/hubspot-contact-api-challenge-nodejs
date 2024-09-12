import { param } from 'express-validator';

export const contactIdPathMwValidator = [
  param('contactId')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('contactId es requerido')
    .isNumeric()
    .withMessage('contactId debe ser un id válido'),
];
