import { createServer, Model } from 'miragejs';
import { v4 } from 'uuid';

type Plan = {
  id: string;
  workout: string;
  servicePlan: string;
};

type User = {
  id: string;
  name: string;
  rg: string;
  address: string;
  email: string;
  account: boolean;
  created_at: string;
  userPlan: Plan[];
};

export function mirageServer() {
  const server = createServer({
    models: {
      plan: Model.extend<Partial<Plan>>({}),
      user: Model.extend<Partial<User>>({}),
    },

    seeds(repository) {
      repository.create('plan', {
        id: v4(),
        workout: 'Musculação',
        servicePlan: 'Basic',
      });
      repository.create('plan', {
        id: v4(),
        workout: 'Zumba',
        servicePlan: 'Basic',
      });
      repository.create('plan', {
        id: v4(),
        workout: 'Jiu jitsu',
        servicePlan: 'Individual',
      });
      repository.create('plan', {
        id: v4(),
        workout: 'Balé',
        servicePlan: 'Individual',
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/plans/show', schema => schema.all('plan'));

      this.put('/plans/update', (schema, request) => {
        const workoutsPackage = JSON.parse(request.requestBody);
        this.db.plans.remove();

        const createPlan = workoutsPackage.map(
          (workout: Plan[]) =>
            true && schema.create('plan', { ...workout, id: v4() }),
        );

        return createPlan;
      });

      this.post('/users/create', (schema, request) => {
        const getUser = JSON.parse(request.requestBody);

        const createUser = schema.create('user', {
          ...getUser,
          id: v4(),
          account: true,
          created_at: new Date(),
        });

        return createUser;
      });

      this.put('/users/find', (schema, request) => {
        const id = request.requestBody;
        const findUser = schema.find('user', id)?.attrs;

        return [findUser];
      });

      this.put('/users/update', (schema, request) => {
        const user = JSON.parse(request.requestBody);

        return [schema.find('user', user.id)?.update(user)];
      });

      this.passthrough();
    },
  });
  return server;
}
