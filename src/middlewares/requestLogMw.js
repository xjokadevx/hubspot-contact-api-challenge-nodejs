import logger from '../utils/logger.js';

export const requestLogMw = (req, res, next) => {
  const {
    body,
    cookies,
    hostname,
    ip,
    method,
    originalUrl,
    params,
    path,
    headers,
    id,
  } = req;

  logger.info(`${id}#[Ìncoming request]: ${originalUrl}`);
  logger.info(`${id}#[request body]: ${JSON.stringify(body)}`);
  logger.info(`${id}#[request cookies]: ${JSON.stringify(cookies)}`);
  logger.info(`${id}#[request hostname]: ${hostname}`);
  logger.info(`${id}#[request ip]: ${ip}`);
  logger.info(`${id}#[request method]: ${method}`);
  logger.info(`${id}#[request originalUrl]: ${originalUrl}`);
  logger.info(`${id}#[request params]: ${JSON.stringify(params)}`);
  logger.info(`${id}#[request path]: ${path}`);
  logger.info(`${id}#[request headers]: ${JSON.stringify(headers)}`);
  next();
};
