import { createServer, Model } from 'miragejs';
import { v4 } from 'uuid';

type Plan = {
  id:string;
  workout: string;
  servicePackage: string;
  created_at: string;
}

type User = {
  id: string;
  name: string;
  rg: string;
  address: string;
  email: string;
  account: boolean;
  created_at: string;
  services: Plan[];
}

export function mirageServer() {
  const server = createServer({
    models: {
      plan: Model.extend<Partial<Plan>>({}),
      user: Model.extend<Partial<User>>({}),
    },

    routes() {
      this.namespace = 'api';

      this.get('/plans/show', () => [
        { workout: 'Musculação', servicePackage: 'Basic' },
        { workout: 'Zumba', servicePackage: 'Basic' },
        { workout: 'Jiu jitsu', servicePackage: 'Individual' },
        { workout: 'Balé', servicePackage: 'Individual' },
      ]);

      this.post('/plans/create', (schema, request) => {
        const workoutsPackage = JSON.parse(request.requestBody);

        return schema.create('plan', {
          ...workoutsPackage,
          id: '1',
          created_at: new Date(),
        });
      });

      this.post('/users/signup', (schema, request) => {
        const createUser = JSON.parse(request.requestBody);

        return schema.create('user', {
          ...createUser,
          id: v4(),
          account: true,
          created_at: new Date(),
        });
      });

      this.put('/users/search-id', (schema, request) => [request.requestBody]);

      this.passthrough();
    },
  });
  return server;
}
