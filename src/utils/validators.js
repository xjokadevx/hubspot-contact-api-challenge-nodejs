import { NULL_VALUES } from './constants.js';

export function nullishValidator(value) {
  return NULL_VALUES.includes(value) ? true : false;
}
