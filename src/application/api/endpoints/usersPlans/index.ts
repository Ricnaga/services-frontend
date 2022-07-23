import { api } from '../..';
import { USERSPLANS_BYID } from './path';

export type GetUserPlansByIdItems = {
  id: string;
  user_id: string;
  service_id: string;
  created_at: Date;
};

type GetUserPlansById = Record<'userPlans', Array<GetUserPlansByIdItems>>;

export const getUserPlansById = async (id: string) =>
  api
    .get<GetUserPlansById>(USERSPLANS_BYID.replace(':id', id))
    .then(({ data }) => data.userPlans);

export const putUserPlansById = async (id: string, body: string[]) =>
  api.put(USERSPLANS_BYID.replace(':id', id), body).then(({ data }) => data);
