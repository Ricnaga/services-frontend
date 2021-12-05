import { createServer, Model } from 'miragejs';
import { v4 } from 'uuid';
import { carouselImg } from './carouselImages';

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
  package_id: string;
  created_at: Date;
};

export function mirageMockServer() {
  const server = createServer({
    models: {
      plano: Model.extend<Partial<Plan>>({}),
      usuario: Model.extend<Partial<User>>({}),
      planosUsuarios: Model.extend<Partial<UsersPlan>>({}),
    },
    seeds(repository) {
      repository.create('plano', {
        id: v4(),
        nome: 'Musculação',
        basico: true,
        created_at: new Date(),
      });
      repository.create('plano', {
        id: v4(),
        nome: 'Funcional',
        basico: true,
        created_at: new Date(),
      });
      repository.create('plano', {
        id: v4(),
        nome: 'Jiujitsu',
        basico: false,
        created_at: new Date(),
      });
      repository.create('plano', {
        id: v4(),
        nome: 'Ballet',
        basico: false,
        created_at: new Date(),
      });
      repository.create('usuario', {
        id: v4(),
        nome: 'Fulano de tal',
        rg: '123456789',
        endereco: 'Rua teste de Fulano',
        email: 'fulano@email.com',
        conta: true,
        created_at: new Date(),
      });
      repository.create('usuario', {
        id: v4(),
        nome: 'Sicrano de tal',
        rg: '987654321',
        endereco: 'Rua teste de Sicrano',
        email: 'sicrano@email.com',
        conta: true,
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
              return schema.create('planosUsuarios', {
                id: v4(),
                user_id,
                package_id: dados.id,
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
              package_id: dados.id,
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

      this.get('/images', () => carouselImg);

      this.passthrough();
    },
  });

  return server;
}
