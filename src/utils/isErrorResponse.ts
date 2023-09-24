import { IErrorObject, ISessionToken } from '../types/types.ts';

export const isErrorResponse = (response: ISessionToken | IErrorObject): response is IErrorObject =>
  'error' in response || 'errors' in response;
