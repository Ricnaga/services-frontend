import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../services/api';
import FieldPlans from './FieldPlans';
import InputFields from './InputFields';
import PlanValue from '../../components/PlanValue';
import {
  Container, Form, GymPlan,
} from './style';

interface AllPlans {
  workout: string;
  servicePackage: string;
}

interface FormData {
  name: string;
  rg: string;
  address: string;
  email: string;
  services: AllPlans[];
}

interface EventProps {
  target: {
    name: string;
    checked: boolean;
  }
}

const SignUp: React.FC = () => {
  const [plan, setPlan] = useState<AllPlans[]>([]);
  const [paymentBasicValue, setPaymentBasicValue] = useState(0);
  const [paymentIndividualValue, setPaymentIndividualValue] = useState(0);
  const [servicePackage, setServicePackage] = useState<AllPlans[]>([]);

  useEffect(() => {
    api.get('plans/show')
      .then((response) => setPlan(response.data));
  }, []);

  const handleForm = useCallback(
    async (event) => {
      event.preventDefault();

      const formValue: FormData = {
        name: event.target[0].value,
        rg: event.target[1].value,
        address: event.target[2].value,
        email: event.target[3].value,
        services: servicePackage,
      };

      await api.post('users/signup', formValue);
    },
    [servicePackage],
  );

  function handleValue(event: EventProps) {
    const { name, checked } = event.target;

    if (name === 'Basic') {
      if (checked) {
        setServicePackage([...servicePackage, {
          workout: name,
          servicePackage: 'Basic',
        }]);
        setPaymentBasicValue(80);
      } else {
        const onlyIndividual = servicePackage.filter(
          (basic) => basic.workout !== name,
        );
        setServicePackage(onlyIndividual);
        setPaymentBasicValue(0);
      }
    }

    if (name !== 'Basic') {
      if (checked) {
        setServicePackage([...servicePackage, {
          workout: name,
          servicePackage: 'Individual',
        }]);
        setPaymentIndividualValue(paymentIndividualValue + 120);
      } else {
        const selectedPackage = servicePackage.filter(
          (service) => service.workout !== name,
        );
        setServicePackage(selectedPackage);
        setPaymentIndividualValue(paymentIndividualValue - 120);
      }
    }
  }

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

          <PlanValue basicValue={paymentBasicValue} individualValue={paymentIndividualValue} />

          <Button type="submit">Enviar</Button>
          <Link to="/">Voltar</Link>
        </Form>
      </Container>
    </>
  );
};
export default SignUp;
