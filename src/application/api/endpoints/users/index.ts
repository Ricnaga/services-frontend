import { api } from '../..';
import { GetPlansItems } from '../plans';
import { USERS, USERS_BYID, USERS_IMAGES } from './path';

export type GetUserImages = {
  title: string;
  description: string;
  url: string;
};

export const getUserImages = async () =>
  api.get<Array<GetUserImages>>(USERS_IMAGES).then(({ data }) => data);

type GetUserById = {
  message: string;
};

export const getUserById = async (id: string) =>
  api.get<GetUserById>(USERS_BYID.replace(':id', id)).then(({ data }) => data);

type PostUserBody = {
  nome: string;
  email: string;
  rg: string;
  endereco: string;
  planos: Array<GetPlansItems>;
};

export const postUser = async (body: PostUserBody) =>
  api.post<void>(USERS, body);

export type GetUsersParamsItems = {
  id: string;
  nome: string;
  email: string;
  rg: string;
  endereco: string;
  conta: boolean;
  created_at: Date;
};

type GetUsersParams = Record<'users', Array<GetUsersParamsItems>>;

export const getUsers = async (
  params: Omit<GetUsersParamsItems, 'created_at'>,
) => api.get<GetUsersParams>(USERS, { params }).then(({ data }) => data.users);

export const patchUsersById = async (
  id: string,
  body: Omit<GetUsersParamsItems, 'id'>,
) =>
  api
    .patch<{ message: string }>(USERS_BYID.replace(':id', id), body)
    .then(({ data }) => data);

export const deleteUserById = async (id: string) =>
  api
    .delete<{ message: string }>(USERS_BYID.replace(':id', id))
    .then(({ data }) => data);
