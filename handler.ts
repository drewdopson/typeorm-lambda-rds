import * as createFunction from './src/functions/create'
import * as getFunction from './src/functions/get'
import * as updateFunction from './src/functions/update'
import * as removeFunction from './src/functions/remove'

export const create = async (event, context) => {
  return createFunction.default(event, context);
};

export const get = async (event, context) => {
  return getFunction.default(event, context);
};

export const update = async (event, context) => {
  return updateFunction.default(event, context);
};

export const remove = async (event, context) => {
  return removeFunction.default(event, context);
};
