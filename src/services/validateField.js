import * as yup from 'yup';

export async function checkValidation(field, element, schema) {
  const check = await yup.reach(schema, field).isValid(element);

  return check;
}
