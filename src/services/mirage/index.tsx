import { createServer, Model } from 'miragejs';
import { v4 } from 'uuid';
import { NomeCapitalize } from '../../utils/string';
import {
  mockedFulanoUserId,
  mockedPlanoAdicionalId,
  mockedPlanoBasicoId,
  mockedSicranoUserId,
  randomImages,
  ServicosEnum,
} from './constants';

type Plan = {
  id: string;
  nome: string;
  basico: boolean;
  created_at: Date;
};

type User = {
  id: string;
  nome: string;
  rg: string;
  endereco: string;
  email: string;
  conta: boolean;
  created_at: Date;
};

type UsersPlan = {
  id: string;
  user_id: string;
  service_id: string;
  created_at: Date;
};

export function mirageMockServer() {
  const server = createServer({
    models: {
      plano: Model.extend<Partial<Plan>>({}),
      usuario: Model.extend<Partial<User>>({}),
      planosUsuario: Model.extend<Partial<UsersPlan>>({}),
    },
    seeds(seed) {
      seed.create('plano', {
        id: mockedPlanoBasicoId,
        nome: NomeCapitalize(ServicosEnum.musculacao),
        basico: true,
        created_at: new Date(),
      });
      seed.create('plano', {
        id: v4(),
        nome: NomeCapitalize(ServicosEnum.funcional),
        basico: true,
        created_at: new Date(),
      });
      seed.create('plano', {
        id: mockedPlanoAdicionalId,
        nome: NomeCapitalize(ServicosEnum.jiujitsu),
        basico: false,
        created_at: new Date(),
      });
      seed.create('plano', {
        id: v4(),
        nome: NomeCapitalize(ServicosEnum.ballet),
        basico: false,
        created_at: new Date(),
      });
      seed.create('usuario', {
        id: mockedFulanoUserId,
        nome: 'Fulano de tal',
        rg: '123456789',
        endereco: 'Rua teste de Fulano',
        email: 'fulano@email.com',
        conta: true,
        created_at: new Date(),
      });
      seed.create('usuario', {
        id: mockedSicranoUserId,
        nome: 'Sicrano de tal',
        rg: '987654321',
        endereco: 'Rua teste de Sicrano',
        email: 'sicrano@email.com',
        conta: true,
        created_at: new Date(),
      });
      seed.create('planosUsuario', {
        id: v4(),
        user_id: mockedFulanoUserId,
        service_id: mockedPlanoBasicoId,
        created_at: new Date(),
      });
      seed.create('planosUsuario', {
        id: v4(),
        user_id: mockedFulanoUserId,
        service_id: mockedPlanoAdicionalId,
        created_at: new Date(),
      });
      seed.create('planosUsuario', {
        id: v4(),
        user_id: mockedSicranoUserId,
        service_id: mockedPlanoAdicionalId,
        created_at: new Date(),
      });
    },
    routes() {
      this.namespace = 'api';

      this.get('/plans', schema => {
        const planos = schema.all('plano').models;
        return {
          planos,
        };
      });

      this.post('/users', (schema, request) => {
        const { nome, rg, endereco, email, planos } = JSON.parse(
          request.requestBody,
        );
        const user_id = v4();

        const userData = {
          nome,
          rg,
          endereco,
          email,
          id: user_id,
          conta: true,
          created_at: new Date(),
        };

        const { id } = schema.create('usuario', userData);

        const planosFormatados = schema
          .where('plano', collection => collection)
          .models.map(model => model.attrs);

        if (planos.find((plan: string) => plan === 'basico') === 'basico') {
          planosFormatados
            .filter(plano => plano.basico)
            .map(dados => {
              return schema.create('planosUsuario', {
                id: v4(),
                user_id,
                service_id: dados.id,
                created_at: new Date(),
              });
            });
        }

        planosFormatados
          .filter(
            plano =>
              planos.find((plan: string) => plan === plano.nome) === plano.nome,
          )
          .map(dados => {
            return schema.create('planosUsuarios', {
              id: v4(),
              user_id,
              service_id: dados.id,
              created_at: new Date(),
            });
          });

        return {
          id,
        };
      });

      this.get('/users', (schema, request) => {
        const { id, nome, email, rg, endereco, conta } = JSON.parse(
          request.queryParams.values,
        );

        if (
          id === '' &&
          nome === '' &&
          email === '' &&
          rg === '' &&
          endereco === ''
        )
          return schema.where('usuario', collection => collection).models;

        return schema
          .where('usuario', collection => collection)
          .models.map(model => model.attrs)
          .filter(
            usuario =>
              usuario.id === id ||
              usuario.nome === nome ||
              usuario.email === email ||
              usuario.rg === rg ||
              usuario.endereco === endereco ||
              usuario.conta === conta,
          );
      });

      this.get('/users/:id', (schema, request) => {
        const { id } = request.params;

        const findUser = schema.findBy('usuario', { id });

        if (findUser)
          return {
            message: 'Usuário encontrado, entrada permitida!',
          };

        return {
          message: 'Erro! usuário não permitido, verificar com a recepção',
        };
      });

      this.patch('/users/:id', (schema, request) => {
        const { id } = request.params;
        const userData = JSON.parse(request.requestBody);
        const findUser = schema.findBy('usuario', { id });

        if (findUser) {
          findUser.update(userData);
          return {
            message: 'Dados alterados com sucesso!',
          };
        }

        return {
          message: 'Erro ao atualizar dados do usuário',
        };
      });

      this.delete('/users/:id', (schema, request) => {
        const { id } = request.params;
        const findUser = schema.findBy('usuario', { id });

        if (findUser) {
          findUser.destroy();
          return {
            message: 'Dado apagado com sucesso',
          };
        }

        return {
          message: 'Erro ao apagar dados do usuário',
        };
      });

      this.get('/images', () => randomImages);

      this.get('/statistics', (schema, request) => {
        const planos = schema.all('plano').models.map(plano => plano.attrs);
        const planosInscritos = schema
          .all('planosUsuario')
          .models.map(plano => plano.attrs);

        const inscritosEmPlano = planos
          .map(plano => {
            const listaInscritos = planosInscritos.reduce(
              (accumulator, element) => {
                if (plano.id === element.service_id) {
                  const qtdInscritos = {
                    id: v4(),
                    nome: plano.nome,
                    inscritos: Number(accumulator.inscritos) + 1,
                  };

                  return qtdInscritos;
                }

                return accumulator;
              },
              {
                id: '',
                nome: '',
                inscritos: 0,
              },
            );
            return listaInscritos;
          })
          .filter(inscritosFormatados => inscritosFormatados.nome !== '');

        const totalInscritos = inscritosEmPlano.reduce(
          (accumulator, element) => {
            return accumulator + Number(element.inscritos);
          },
          0,
        );

        return { inscritos: inscritosEmPlano, totalInscritos };
      });

      this.get('/usersPlans/:id', (schema, request) => {
        const { id } = request.params;
        const findUserPlans = schema
          .all('planosUsuario')
          .models.filter(planos => planos.attrs.user_id === id);

        if (findUserPlans) return findUserPlans;

        return {
          message:
            'Não foi possível encontrar lista de pacotes para esse usuário',
        };
      });

      this.put('/usersPlans/:id', (schema, request) => {
        const { id } = request.params;
        const planosUsuario = JSON.parse(request.requestBody);

        const planosUsuarioDB = schema
          .where('planosUsuario', collection => collection)
          .models.map(model => model.attrs);

        planosUsuarioDB
          .filter(planoUsuario => planoUsuario.user_id === id)
          .map(usuario =>
            schema.where('planosUsuario', collection => {
              if (collection.id === usuario.id) return collection.destroy;
              return null;
            }),
          );

        const planosFormatados = schema
          .where('plano', collection => collection)
          .models.map(model => model.attrs);

        planosUsuario.map((nomePlano: string) => {
          if (nomePlano === 'basico')
            return planosFormatados
              .map(planosDB => {
                if (planosDB.basico)
                  return schema.create('planosUsuario', {
                    id: v4(),
                    user_id: id,
                    service_id: planosDB.id,
                    created_at: new Date(),
                  }).attrs;

                return null;
              })
              .filter(planoFiltrado => planoFiltrado);

          return planosFormatados
            .map(planosDB => {
              if (nomePlano === planosDB.nome)
                return schema.create('planosUsuario', {
                  id: v4(),
                  user_id: id,
                  service_id: planosDB.id,
                  created_at: new Date(),
                }).attrs;

              return null;
            })
            .filter(planoFiltrado => planoFiltrado);
        });

        return {
          id,
        };
      });

      this.passthrough();
    },
  });

  return server;
}
