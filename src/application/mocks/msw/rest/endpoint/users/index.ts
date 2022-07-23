import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import {
  USERS,
  USERS_BYID,
  USERS_IMAGES,
} from '../../../../../api/endpoints/users/path';

export const postUsers = rest.post(USERS, (req, res, ctx) =>
  res(ctx.status(201)),
);

export const getUsers = rest.get(USERS, (req, res, ctx) => {
  const users = [
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: false,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: false,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: false,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      nome: faker.name.firstName(),
      rg: faker.random.numeric(9),
      endereco: faker.address.streetName(),
      email: faker.internet.email(),
      conta: true,
      created_at: new Date(),
    },
  ];
  return res(ctx.status(200), ctx.json({ users }));
});

export const getUserById = rest.get(
  USERS_BYID,
  ({ params: { id } }, res, ctx) => {
    if (id !== '123456') return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json({
        message: 'Usuário permitido !',
      }),
    );
  },
);

export const patchUserById = rest.patch(USERS_BYID, async (req, res, ctx) => {
  const { nome } = await req.json();

  if (nome === '')
    return res(
      ctx.status(403),
      ctx.json({ message: 'Erro ao atualizar dados do usuário' }),
    );

  return res(
    ctx.status(200),
    ctx.json({ message: 'Dados alterados com sucesso!' }),
  );
});

export const deleteUserById = rest.delete(
  USERS_BYID,
  ({ params }, res, ctx) => {
    const { id } = params;

    if (id === '1')
      return res(
        ctx.status(404),
        ctx.json({ message: 'Erro ao apagar dados do cliente' }),
      );

    return res(
      ctx.status(200),
      ctx.json({ message: 'Dado apagado com sucesso' }),
    );
  },
);

export const getUsersImages = rest.get(USERS_IMAGES, (req, res, ctx) => {
  const height = 400;
  const width = 1024;

  const randomImages = [
    {
      title: 'Musculação',
      description: 'Fique monstro, mas com a gente é mais rápido rsrs',
      url: `https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=${width}&h=${height}&q=80`,
    },
    {
      title: 'Ballet',
      description: 'Com toda sua leveza',
      url: `https://images.unsplash.com/photo-1555656220-46e30749d330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=${width}&h=${height}&q=80`,
    },
    {
      title: 'Zumba',
      description: 'Se divirta com a gente, garantimos o suor e alegria :)',
      url: `https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=${width}&h=${height}&q=80`,
    },
    {
      title: 'Jiu jitsu brasileiro',
      description: 'Onde a luta começa depois que você cai no chão',
      url: `https://images.unsplash.com/photo-1624938518616-3be0add427d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=${width}&h=${height}&q=80`,
    },
  ];
  return res(ctx.status(200), ctx.json(randomImages));
});
