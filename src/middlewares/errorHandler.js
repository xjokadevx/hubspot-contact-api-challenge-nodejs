import { ApiError } from '../models/ApiError.js';
import { ApiResponse } from '../models/ApiResponse.js';

export function errorHandler(err, req, res, next) {
  const apiResponse = new ApiResponse({
    id: req.id,
    data: {},
    status: 'error',
    code: 400,
    message: 'Algo salio mal al intentar realizar la petición.',
    description:
      'Por favor comunicate con administrador con este id. ' + req.id,
  });
  if (err instanceof ApiError) {
    switch (err.category) {
      case 'INVALID_AUTHENTICATION':
        apiResponse.message = 'Algo salio mal al realizar la petición.';
        break;
      case 'MISSING_SCOPES':
        apiResponse.message = 'La petición solicitada no puede ser realizada.';
        break;
      case 'OBJECT_NOT_FOUND':
        apiResponse.message = 'Id invalido, por favor verifique.';
        break;
      case 'VALIDATION_ERROR':
        apiResponse.message =
          'No fue posible procesar la petición con hubspot.';
        break;
      case 'CONFLICT':
        apiResponse.message =
          'Esquema de datos no valido, por favor verifique.';
        if (err.code === 409) {
          apiResponse.message = 'Un contacto ya tiene asociado este email.';
        }
        break;
    }
  } else {
    apiResponse.code = 500;
    apiResponse.message =
      'Error interno del servidor. Por favor intenta de nuevo.';
  }
  return res.status(apiResponse.code).json(apiResponse);
}
