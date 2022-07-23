import { faker } from '@faker-js/faker';
import { rest } from 'msw';
import {
  PLANS,
  PLANS_STATISTICS,
} from '../../../../../api/endpoints/plans/path';

enum ServicosEnum {
  musculacao = 'musculação',
  funcional = 'funcional',
  jiujitsu = 'jiujitsu',
  ballet = 'ballet',
}

export const getPlans = rest.get(PLANS, (req, res, ctx) => {
  const planos = [
    {
      id: faker.datatype.uuid(),
      nome: ServicosEnum.musculacao,
      basico: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: ServicosEnum.funcional,
      basico: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: ServicosEnum.jiujitsu,
      basico: false,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: ServicosEnum.ballet,
      basico: false,
      created_at: new Date(),
    },
  ];

  return res(
    ctx.status(200),
    ctx.json({
      planos,
    }),
  );
});

export const getPlansStatistics = rest.get(
  PLANS_STATISTICS,
  (req, res, ctx) => {
    const inscritos = [
      {
        id: faker.datatype.uuid(),
        nome: ServicosEnum.musculacao,
        inscritos: faker.random.numeric(3),
      },
      {
        id: faker.datatype.uuid(),
        nome: ServicosEnum.funcional,
        inscritos: faker.random.numeric(3),
      },
      {
        id: faker.datatype.uuid(),
        nome: ServicosEnum.jiujitsu,
        inscritos: faker.random.numeric(3),
      },
      {
        id: faker.datatype.uuid(),
        nome: ServicosEnum.ballet,
        inscritos: faker.random.numeric(3),
      },
    ];
    const totalInscritos = inscritos.reduce(
      (accumulator, { inscritos }) => accumulator + Number(inscritos),
      0,
    );
    return res(ctx.status(200), ctx.json({ inscritos, totalInscritos }));
  },
);
