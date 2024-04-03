export interface ContactResponse {
  message: string;
  data: IContact[];
}

export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  age: number | string;
  photo: string;
}

export type TContactBody = {
  firstName: string;
  lastName: string;
  age: string;
  photo: string;
};
