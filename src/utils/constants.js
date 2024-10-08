export const NULL_VALUES = [
  null,
  undefined,
  0,
  {},
  [],
  '',
  'null',
  'undefined',
  '0',
  '{}',
  '[]',
];

export const LIMIT_CONTACTS_PAGE_DEFAULT = 10;
export const CONTACT_PROPERTIES = ['email', 'firstname', 'lastname', 'phone'];
export const RX_JUST_LETTERS = RegExp(/^[a-zA-Z]+$/);
export const RX_JUST_NUMBERS = RegExp(/^[0-9]+$/);
export const RX_EMAIL_FORMAT = RegExp(
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);
export const RX_PROPERTIES_ALLOWED = RegExp(
  /^(email|firstname|lastname|phone)$/
);
