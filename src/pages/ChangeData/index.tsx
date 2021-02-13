import React, { useCallback, useEffect, useState } from 'react';
import {
  HiOutlineDocumentReport,
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
  Container,
  SearchContent,
  Form,
  GymPlan,
  Label,
} from './style';

interface AllPlans{
  workout:string;
  servicePackage:string;
}

interface UserResponse{
  id: string;
  name: string;
  rg: string;
  address: string;
  email: string;
  account: boolean;
}

interface FormData {
  id: string;
  name: string;
  rg: string;
  address: string;
  email: string;
  services: AllPlans[];
  account: boolean;
}

const ChangeData: React.FC = () => {
  const [newInput, setNewInput] = useState('');
  const [newBasicCheckedInput, setNewBasicCheckedInput] = useState(false);
  const [userFound, setUserFound] = useState('');
  const [userAccount, setUserAccount] = useState(false);
  const [newUser, setnewUser] = useState<UserResponse>();
  const [plan, setPlan] = useState<AllPlans[]>([]);
  const [individualPlan, setIndividualPlan] = useState<AllPlans[]>([]);
  const [paymentBasicValue, setPaymentBasicValue] = useState(0);
  const [paymentIndividualValue, setPaymentIndividualValue] = useState(0);
  const [servicePackage, setServicePackage] = useState<AllPlans[]>([]);

  useEffect(() => {
    api.get('/plans/show').then((response) => {
      setPlan(response.data);
    });
  }, []);

  const handleSearch = useCallback(async () => {
    setnewUser(undefined);
    setUserAccount(false);

    const userResponse = await api.put('/users/search-id', { id: newInput });

    if (!userResponse.data.searchUser) {
      setUserFound('Usuário não encontrado');
    } else {
      setnewUser(userResponse.data.searchUser);
      const plans:AllPlans[] = userResponse.data.searchUserPlan;
      plans.filter((basicPlan) => basicPlan.servicePackage === 'Basic' && setNewBasicCheckedInput(true));

      const allIndividualPlans:AllPlans[] = [];
      const userPlan: AllPlans[] = userResponse.data.searchUserPlan;

      userPlan.filter((newIndividualPlan) => newIndividualPlan.servicePackage === 'Individual'
      && allIndividualPlans.push({
        workout: newIndividualPlan.workout,
        servicePackage: newIndividualPlan.servicePackage,
      }));

      setIndividualPlan(allIndividualPlans);

      if (!newBasicCheckedInput) {
        const newWorkout = {
          workout: 'Basic',
          servicePackage: 'Basic',
        };

        setServicePackage([...servicePackage, newWorkout]);
        setPaymentBasicValue(paymentBasicValue + 80);
      } else {
        const service = servicePackage.filter((svc) => svc.workout !== 'Basic');
        setServicePackage(service);
        setPaymentBasicValue(paymentBasicValue - 80);
      }
    }
  }, [newInput, newBasicCheckedInput, servicePackage, paymentBasicValue]);

  const handleValue = useCallback((event) => {
    if (event.target.name === 'Basic') {
      if (event.target.checked) {
        const newWorkout = {
          workout: event.target.name,
          servicePackage: 'Basic',
        };
        setServicePackage([...servicePackage, newWorkout]);
        setPaymentBasicValue(paymentBasicValue + 80);
      } else {
        const service = servicePackage.filter((svc) => svc.workout !== event.target.name);
        setServicePackage(service);
        setPaymentBasicValue(paymentBasicValue - 80);
      }
    }

    if (event.target.name === 'Individual') {
      if (event.target.checked) {
        const newWorkout = {
          workout: event.target.name,
          servicePackage: 'Individual',
        };
        setServicePackage([...servicePackage, newWorkout]);
        setPaymentIndividualValue(paymentIndividualValue + 120);
      } else {
        const service = servicePackage.filter((svc) => svc.workout !== event.target.name);
        setServicePackage(service);
        setPaymentIndividualValue(paymentIndividualValue - 120);
      }
    }

    if (event.target.name === 'account') {
      if (event.target.checked) {
        setUserAccount(true);
      } else {
        setUserAccount(false);
      }
    }
  }, [paymentBasicValue, paymentIndividualValue, servicePackage]);

  const handleForm = useCallback(
    async (event) => {
      event.preventDefault();

      const formValue: FormData = {
        id: newInput,
        name: event.target[0].value,
        rg: event.target[1].value,
        address: event.target[2].value,
        email: event.target[3].value,
        services: servicePackage,
        account: userAccount,
      };
      await api.put('/users/updateUser', formValue);
    },
    [newInput, servicePackage, userAccount],
  );

  return (
    <>
      <Container>
        <h2>Alteração de dados cadastrais</h2>
        <SearchContent>
          <Input
            name="id"
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
            icon={HiOutlineDocumentReport}
            placeholder="Digite o Id"
          />
          <Button type="button" onClick={handleSearch}>Buscar</Button>
        </SearchContent>

        {newUser
          ? (
            <Form onSubmit={handleForm}>
              <Input name="name" icon={HiOutlineUser} placeholder="Nome" defaultValue={newUser.name} />
              <Input name="rg" icon={HiOutlineDocument} placeholder="RG" defaultValue={newUser.rg} />
              <Input name="address" icon={HiOutlineGlobe} placeholder="Endereço" defaultValue={newUser.address} />
              <Input name="email" icon={HiOutlineMail} placeholder="E-mail" defaultValue={newUser.email} />
              <GymPlan>
                <fieldset>
                  <legend>
                    {plan.map((modality) => modality.servicePackage === 'Basic')
                      && (
                        <Input
                          name="Basic"
                          type="checkbox"
                          checked={newBasicCheckedInput}
                          onChange={(e) => setNewBasicCheckedInput(e.target.checked)}
                          onClick={handleValue}
                        />
                      )}

                    Básico
                  </legend>
                  {plan.map((modality) => (
                    modality.servicePackage === 'Basic'
              && (
                <Label key={modality.workout}>
                  {modality.workout}
                </Label>
              )
                  ))}
                </fieldset>

                <fieldset>
                  <legend>Individual</legend>

                  {plan.map((modality) => (
                    modality.servicePackage === 'Individual'
              && (
              <Label key={modality.workout}>
                <Input name={modality.workout} onClick={handleValue} type="checkbox" />
                {modality.workout}
              </Label>
              )))}

                </fieldset>
              </GymPlan>
              <Label>
                <Input
                  name="account"
                  type="checkbox"
                  defaultChecked={newUser.account}
                  onClick={handleValue}
                />
                Conta ativa ?
              </Label>
              <h4>
                Valor do plano:R$
                {(paymentBasicValue + paymentIndividualValue) > 120
                  ? paymentBasicValue + (paymentIndividualValue * 0.6)
                  : paymentBasicValue + paymentIndividualValue}
              </h4>
              <Button type="submit">Enviar</Button>
            </Form>
          ) : <h2>{userFound}</h2>}

        <Link to="/">Voltar</Link>
      </Container>
    </>

  );
};
export default ChangeData;
