import { matchedData } from 'express-validator';
import { ApiResponse } from '../models/ApiResponse.js';
import {
  schemaErrorFormater,
  schemaErrorHandler,
} from '../utils/customSchemaValidator.js';

export const errorsMwValidator = (req, res, next) => {
  const errors = schemaErrorHandler(req);
  if (!errors.isEmpty()) {
    const errorsResult = schemaErrorFormater(errors.array());
    return res.status(422).json(
      new ApiResponse({
        id: req.id,
        status: 'fail',
        code: 422,
        message: 'Error de validación',
        description: 'Por favor verifique los datos enviados.',
        data: {
          errors: errorsResult,
        },
      })
    );
  }
  req.body = matchedData(req, { onlyValidData: true });
  next();
};
