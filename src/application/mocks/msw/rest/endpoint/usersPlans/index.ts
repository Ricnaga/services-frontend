import { faker } from '@faker-js/faker';
import { rest } from 'msw';
import { USERSPLANS_BYID } from '../../../../../api/endpoints/usersPlans/path';

export const getUsersPlansById = rest.get(
  USERSPLANS_BYID,
  ({ params }, res, ctx) => {
    const { id } = params;

    if (id === '')
      return res(
        ctx.status(404),
        ctx.json({
          message:
            'Não foi possível encontrar lista de pacotes para esse usuário',
        }),
      );

    const userPlans = [
      {
        id: faker.datatype.uuid(),
        user_id: faker.datatype.uuid(),
        service_id: faker.datatype.uuid(),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        user_id: faker.datatype.uuid(),
        service_id: faker.datatype.uuid(),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        user_id: faker.datatype.uuid(),
        service_id: faker.datatype.uuid(),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        user_id: faker.datatype.uuid(),
        service_id: faker.datatype.uuid(),
        created_at: new Date(),
      },
    ];
    return res(ctx.status(200), ctx.json({ userPlans }));
  },
);

export const putUsersPlansById = rest.put(USERSPLANS_BYID, (req, res, ctx) =>
  res(ctx.status(200)),
);
