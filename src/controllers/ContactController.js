import { request, response } from 'express';

import logger from '../utils/logger.js';
import { ApiError } from '../models/ApiError.js';
import { ApiResponse } from '../models/ApiResponse.js';
import { ContactBussiness } from '../bussiness/ContactBussiness.js';

export async function updateContactController(
  req = request,
  res = response,
  next
) {
  try {
    const _apiResponse = new ApiResponse({
      id: req.id,
    });
    logger.info(
      `${req.id}#[updateContactController]:Make petition to ContactAPI`
    );
    const tmpBodyRequest = {
      properties: {
        lastname: req.body.lastName,
        firstname: req.body.firstName,
        email: req.body.email,
        phone: req.body.phone,
      },
      contactId: req.body.contactId,
      id: req.id,
    };
    const _result = await new ContactBussiness(tmpBodyRequest).updateContact();
    logger.info(
      `${req.id}#[updateContactController]:Petition maked to ContactAPI successfully`
    );
    _apiResponse.message = 'Petición realizada correctamente..';
    _apiResponse.description = `Se actualizó correctamente el contacto ${req.params.contactId}.`;
    _apiResponse.data = _result;
    logger.info(
      `${req.id}#[updateContactController]: Returning data to client with ${_result.totalElements} contacts`
    );
    res.send(_apiResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`${req.id}#` + error.stack);
      logger.error(
        `${req.id}#${error.section}: ${error.code} ${error.category}`
      );
    }
    logger.error(`${req.id}#[updateContactController] `, error);
    next(error);
  }
}

export async function createContactController(
  req = request,
  res = response,
  next
) {
  try {
    const _apiResponse = new ApiResponse({
      id: req.id,
    });
    logger.info(
      `${req.id}#[createContactController]:Make petition to ContactAPI`
    );
    const tmpBodyRequest = {
      properties: { ...req.body },
      id: req.id,
    };
    const _result = await new ContactBussiness(tmpBodyRequest).createContact();
    logger.info(
      `${req.id}#[createContactController]:Petition maked to ContactAPI successfully`
    );
    _apiResponse.message = 'Petición realizada correctamente..';
    _apiResponse.description = `Se guardó correctamente el contacto ${_result.id}.`;
    _apiResponse.data = _result;
    logger.info(
      `${req.id}#[createContactController]: Returning data to client with ${_result.totalElements} contacts`
    );
    res.send(_apiResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`${req.id}#` + error.stack);
      logger.error(
        `${req.id}#${error.section}: ${error.code} ${error.category}`
      );
    }
    logger.error(`${req.id}#[createContactController] `, error);
    next(error);
  }
}

export async function getContactsBySearchController(
  req = request,
  res = response,
  next
) {
  try {
    const _apiResponse = new ApiResponse({
      id: req.id,
    });
    logger.info(
      `${req.id}#[getContactsBySearchController]:Make petition to ContactAPI`
    );
    const tmpBodyRequest = {
      id: req.id,
      filterGroups: [
        {
          filters: [
            {
              propertyName: req.body.property,
              operator: 'CONTAINS_TOKEN',
              value: req.body.value,
            },
          ],
        },
      ],
    };
    const _result = await new ContactBussiness(
      tmpBodyRequest
    ).searchContactByProperty();
    logger.info(
      `${req.id}#[getContactsBySearchController]:Petition maked to ContactAPI successfully`
    );
    _apiResponse.message = 'Petición realizada correctamente..';
    _apiResponse.description = `Se obtuvieron ${_result.totalElements} contactos.`;
    _apiResponse.data = _result;
    logger.info(
      `${req.id}#[getContactsBySearchController]: Returning data to client with ${_result.totalElements} contacts`
    );
    res.send(_apiResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`${req.id}#` + error.stack);
      logger.error(
        `${req.id}#${error.section}: ${error.code} ${error.category}`
      );
    }
    logger.error(`${req.id}#[getContactsBySearchController] `, error);
    next(error);
  }
}

export async function getContactListController(
  req = request,
  res = response,
  next
) {
  try {
    const _apiResponse = new ApiResponse({
      id: req.id,
    });
    logger.info(
      `${req.id}#[getContactListController]:Make petition to ContactAPI`
    );
    const tmpBodyRequest = {
      id: req.id,
      limit: req.query.limit,
      nextPage: req.query.nextPage,
    };
    const _result = await new ContactBussiness(tmpBodyRequest).getContactList();
    logger.info(
      `${req.id}#[getContactListController]:Petition maked to ContactAPI successfully`
    );
    _apiResponse.message = 'Petición realizada correctamente..';
    _apiResponse.description = `Se obtuvieron ${_result.totalElements} contactos.`;
    _apiResponse.data = _result;
    logger.info(
      `${req.id}#[getContactListController]: Returning data to client with ${_result.totalElements} contacts`
    );
    res.send(_apiResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`${req.id}#` + error.stack);
      logger.error(
        `${req.id}#${error.section}: ${error.code} ${error.category}`
      );
    }
    logger.error(`${req.id}#[getContactListController] `, error);
    next(error);
  }
}

export async function getContactByIdController(
  req = request,
  res = response,
  next
) {
  try {
    const _apiResponse = new ApiResponse({
      id: req.id,
    });
    logger.info(
      `${req.id}#[getContactByIdController]:Make petition to ContactAPI`
    );
    const tmpBodyRequest = {
      contactId: req.params.contactId,
      id: req.id,
    };
    const _result = await new ContactBussiness(tmpBodyRequest).getContactById();
    logger.info(
      `${req.id}#[getContactByIdController]:Petition maked to ContactAPI successfully`
    );
    _apiResponse.message = 'Petición realizada correctamente..';
    _apiResponse.description = `Se obtuvieron ${_result.totalElements} contactos.`;
    _apiResponse.data = _result;
    logger.info(
      `${req.id}#[getContactByIdController]: Returning data to client with ${_result.totalElements} contacts`
    );
    res.send(_apiResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`${req.id}#` + error.stack);
      logger.error(
        `${req.id}#${error.section}: ${error.code} ${error.category}`
      );
    }
    logger.error(`${req.id}#[getContactByIdController] `, error);
    next(error);
  }
}

export async function deleteContactByIdController(
  req = request,
  res = response,
  next
) {
  try {
    const _apiResponse = new ApiResponse({
      id: req.id,
    });
    logger.info(
      `${req.id}#[deleteContactByIdController]:Make petition to ContactAPI`
    );
    const tmpBodyRequest = {
      id: req.id,
      contactId: req.params.contactId,
    };
    const _result = await new ContactBussiness(
      tmpBodyRequest
    ).deleteContactById();
    logger.info(
      `${req.id}#[deleteContactByIdController]:Petition maked to ContactAPI successfully ${_result}`
    );
    _apiResponse.message = 'Petición realizada correctamente..';
    _apiResponse.description = 'Contacto eliminado correctamente';
    logger.info(
      `${req.id}#[deleteContactByIdController]: Returning data to client. Contact ${tmpBodyRequest.contactId} deleted.`
    );
    res.send(_apiResponse);
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error(`${req.id}#` + error.stack);
      logger.error(
        `${req.id}#${error.section}: ${error.code} ${error.category}`
      );
    }
    logger.error(`${req.id}#[deleteContactByIdController] `, error);
    next(error);
  }
}
