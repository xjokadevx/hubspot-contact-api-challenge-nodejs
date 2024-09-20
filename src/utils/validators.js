import { NULL_VALUES } from './constants.js';

export function nullishValidator(value) {
  if (Array.isArray(value)) {
    return value.length === 0 ? true : false;
  } else if (NULL_VALUES.includes(value)) {
    return true;
  } else if (Object.keys(value).length === 0) {
    return true;
  }
  return false;
}
