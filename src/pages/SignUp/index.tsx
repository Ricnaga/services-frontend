import React, { useCallback, useEffect, useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineDocument,
  HiOutlineGlobe,
  HiOutlineMail,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import Input from '../../components/Input';
import api from '../../services/api';
import {
  Container, Form, GymPlan, Label,
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

const SignUp: React.FC = () => {
  const [plan, setPlan] = useState<AllPlans[]>([]);
  const [paymentBasicValue, setPaymentBasicValue] = useState(0);
  const [paymentIndividualValue, setPaymentIndividualValue] = useState(0);
  const [servicePackage, setServicePackage] = useState<AllPlans[]>([]);

  useEffect(() => {
    api.get('/plans/show').then((response) => {
      setPlan(response.data);
    });
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

      await api.post('/users/signup', formValue);
    },
    [servicePackage],
  );

  const handleValue = useCallback(
    (event) => {
      if (event.target.name === 'Basic') {
        if (event.target.checked) {
          const newWorkout = {
            workout: event.target.name,
            servicePackage: 'Basic',
          };
          setServicePackage([...servicePackage, newWorkout]);
          setPaymentBasicValue(paymentBasicValue + 80);
        } else {
          const service = servicePackage.filter(
            (svc) => svc.workout !== event.target.name,
          );
          setServicePackage(service);
          setPaymentBasicValue(paymentBasicValue - 80);
        }
      }

      if (event.target.name !== 'Basic') {
        if (event.target.checked) {
          const newWorkout = {
            workout: event.target.name,
            servicePackage: 'Individual',
          };
          setServicePackage([...servicePackage, newWorkout]);
          setPaymentIndividualValue(paymentIndividualValue + 120);
        } else {
          const service = servicePackage.filter(
            (svc) => svc.workout !== event.target.name,
          );
          setServicePackage(service);
          setPaymentIndividualValue(paymentIndividualValue - 120);
        }
      }
    },
    [paymentBasicValue, paymentIndividualValue, servicePackage],
  );

  return (
    <>
      <Container>
        <h2>Cadastro de cliente</h2>
        <Form onSubmit={handleForm}>
          <Input name="name" icon={HiOutlineUser} placeholder="Nome" />
          <Input name="rg" icon={HiOutlineDocument} placeholder="RG" />
          <Input name="address" icon={HiOutlineGlobe} placeholder="Endereço" />
          <Input name="email" icon={HiOutlineMail} placeholder="E-mail" />
          <GymPlan>
            <fieldset>
              <legend>
                <Input name="Basic" onClick={handleValue} type="checkbox" />
                Básico
              </legend>

              {plan.map(
                (modality) => modality.servicePackage === 'Basic' && (
                  <Label key={modality.workout}>{modality.workout}</Label>
                ),
              )}
            </fieldset>
            <fieldset>
              <legend>Individual</legend>
              {plan.map(
                (modality) => modality.servicePackage === 'Individual' && (
                  <Label key={modality.workout}>
                    <Input
                      name={modality.workout}
                      onClick={handleValue}
                      type="checkbox"
                    />
                    {modality.workout}
                  </Label>
                ),
              )}
            </fieldset>
          </GymPlan>
          <h4>
            Valor do plano:R$
            {paymentBasicValue + paymentIndividualValue > 120
              ? paymentBasicValue + paymentIndividualValue * 0.6
              : paymentBasicValue + paymentIndividualValue}
          </h4>
          <Button type="submit">Enviar</Button>
          <Link to="/">Voltar</Link>
        </Form>
      </Container>
    </>
  );
};
export default SignUp;
