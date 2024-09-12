import { validationResult } from 'express-validator';

export const schemaErrorHandler = validationResult.withDefaults({
  formatter: error => {
    let errors = {};
    const { msg, path } = error;
    const format = JSON.parse(`{ "${path}": ["${msg}"] }`);
    errors = { ...format };

    return errors;
  },
});

export const schemaErrorFormater = (errorArray = []) => {
  let errorObject = {};
  errorArray.forEach(value => {
    const key = Object.keys(value)[0];
    const prop = value[key][0];
    if (errorObject[key]) {
      errorObject[key].push(prop);
    } else {
      errorObject[key] = [prop];
    }
  });
  return errorObject;
};
