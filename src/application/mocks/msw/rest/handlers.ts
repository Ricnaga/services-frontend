import { getPlans, getPlansStatistics } from './endpoint/plans';
import {
  deleteUserById,
  getUserById,
  getUsers,
  getUsersImages,
  patchUserById,
  postUsers,
} from './endpoint/users';
import { getUsersPlansById, putUsersPlansById } from './endpoint/usersPlans';

export const rest_handlers = [
  getUsersImages,
  getUserById,
  getPlans,
  postUsers,
  getUsers,
  patchUserById,
  deleteUserById,
  getPlansStatistics,
  getUsersPlansById,
  putUsersPlansById,
];
