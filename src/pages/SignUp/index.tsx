import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import PlanValue from '../../components/PlanValue';
import api from '../../services/api';
import FieldPlans from './FieldPlans';
import InputFields from './InputFields';
import { Container, Form, GymPlan } from './style';

interface AllPlans {
  workout: string;
  servicePlan: string;
}

interface FormData {
  name: string;
  rg: string;
  address: string;
  email: string;
  userPlan: AllPlans[];
}

interface EventProps {
  target: {
    name: string;
    checked: boolean;
  };
}

export default function SignUp() {
  const [plan, setPlan] = useState<AllPlans[]>([]);
  const [paymentBasicValue, setPaymentBasicValue] = useState(0);
  const [paymentIndividualValue, setPaymentIndividualValue] = useState(0);
  const [servicePlan, setServicePlan] = useState<AllPlans[]>([]);

  useEffect(() => {
    api.get('plans/show').then(response => setPlan(response.data.plans));
  }, []);

  const handleForm = useCallback(
    async event => {
      event.preventDefault();

      const formValue: FormData = {
        name: event.target[0].value,
        rg: event.target[1].value,
        address: event.target[2].value,
        email: event.target[3].value,
        userPlan: servicePlan,
      };

      await api.post('users/create', formValue);
    },
    [servicePlan],
  );

  const handleValue = useCallback(
    (event: EventProps) => {
      const { name, checked } = event.target;

      if (name === 'Basic') {
        if (checked) {
          const findBasicPlan = servicePlan.filter(
            service => service.servicePlan === 'Basic',
          );
          const addedBasicPlan = plan.filter(p => p.servicePlan === 'Basic');
          setPaymentBasicValue(80);

          if (servicePlan.length && !findBasicPlan.length) {
            setServicePlan([...servicePlan, ...addedBasicPlan]);
          }

          if (!servicePlan.length) {
            setServicePlan(addedBasicPlan);
          }
        } else {
          const removedBasicPlan = servicePlan.filter(
            p => p.servicePlan !== 'Basic',
          );
          setServicePlan(removedBasicPlan);
          setPaymentBasicValue(0);
        }
      }

      if (name !== 'Basic') {
        if (checked) {
          const findIndividualPlan = servicePlan.filter(
            service => service.workout === name,
          );
          const addedIndividualPlan = plan.filter(p => p.workout === name);
          setPaymentIndividualValue(paymentIndividualValue + 120);

          if (servicePlan.length && !findIndividualPlan.length) {
            setServicePlan([...servicePlan, ...addedIndividualPlan]);
          }
          if (!servicePlan.length) {
            setServicePlan(addedIndividualPlan);
          }
        } else {
          const removedIndividualPlan = servicePlan.filter(
            p => p.workout !== name,
          );
          setServicePlan(removedIndividualPlan);
          setPaymentIndividualValue(paymentIndividualValue - 120);
        }
      }
    },
    [paymentIndividualValue, plan, servicePlan],
  );

  return (
    <>
      <Container>
        <h2>Cadastro de cliente</h2>
        <Form onSubmit={handleForm}>
          <InputFields />

          <GymPlan>
            <FieldPlans name="Básico" setValues={handleValue} plan={plan} />
            <FieldPlans name="Individual" setValues={handleValue} plan={plan} />
          </GymPlan>

          <PlanValue
            basicValue={paymentBasicValue}
            individualValue={paymentIndividualValue}
          />

          <Button type="submit">Enviar</Button>
          <Link to="/">Voltar</Link>
        </Form>
      </Container>
    </>
  );
}
