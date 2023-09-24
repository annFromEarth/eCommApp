export interface IWorkshopCard {
  img: string;
  title: string;
  date: string;
  place: string;
  description?: string;
}

export interface IDescription {
  description: string;
}

export interface IQuestions {
  title: string;
  answer: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IErrorObject {
  statusCode: number;
  message: string;
  errors: IError[];
  error: string;
  error_description: string;
}

export interface IError {
  code: string;
  message: string;
}

export interface ISessionToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}
