import { api } from '../..';
import { PLANS, PLANS_STATISTICS } from './path';

export type GetPlansItems = {
  id: string;
  nome: string;
  basico: boolean;
  created_at: Date;
};

type GetPlans = Record<'planos', Array<GetPlansItems>>;

export const getPlans = async () =>
  api.get<GetPlans>(PLANS).then(({ data }) => data.planos);

type GetPlansStatisticsItems = {
  id: string;
  nome: string;
  inscritos: number;
};

export type GetPlansStatistics = Record<
  'inscritos',
  Array<GetPlansStatisticsItems>
> & {
  totalInscritos: number;
};

export const getPlansStatisctics = async () =>
  api.get<GetPlansStatistics>(PLANS_STATISTICS).then(({ data }) => data);
