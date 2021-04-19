import React, { useCallback, useEffect, useState } from 'react';
import {
  HiOutlineDocument,
  HiOutlineDocumentReport,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlineUser,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PlanValue from '../../components/PlanValue';
import api from '../../services/api';
import { Container, Form, GymPlan, Label, SearchContent } from './style';

interface AllPlans {
  workout: string;
  servicePlan: 'Basic' | 'Individual';
}

interface UserResponse {
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
  userPlan: AllPlans[];
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
  const [servicePlan, setServicePlan] = useState<AllPlans[]>([]);

  useEffect(() => {
    api.get('plans/show').then(response => {
      setPlan(response.data.plans);
    });
  }, []);

  const handleSearch = useCallback(async () => {
    setnewUser(undefined);
    setUserAccount(false);

    const foundUser = await api.put('users/find', newInput);

    if (!foundUser.data[0]) {
      setUserFound('Usuário não encontrado');
    } else {
      setnewUser(foundUser.data[0]);
      const { userPlan } = foundUser.data[0];
      const userOnlyIndividualPlans: AllPlans[] = [];

      userPlan.filter((plans: AllPlans) =>
        plans.servicePlan === 'Basic'
          ? setNewBasicCheckedInput(true)
          : userOnlyIndividualPlans.push(plans),
      );

      setIndividualPlan(userOnlyIndividualPlans);

      if (!newBasicCheckedInput) {
        setServicePlan([
          ...servicePlan,
          {
            workout: 'Basic',
            servicePlan: 'Basic',
          },
        ]);
        setPaymentBasicValue(80);
      } else {
        const service = servicePlan.filter(svc => svc.workout !== 'Basic');
        setServicePlan(service);
        setPaymentBasicValue(0);
      }
    }
  }, [newBasicCheckedInput, newInput, servicePlan]);

  const handleValue = useCallback(
    event => {
      const { name, checked } = event.target;
      if (name === 'Basic') {
        if (checked) {
          setServicePlan([
            ...servicePlan,
            {
              workout: name,
              servicePlan: 'Basic',
            },
          ]);
          setPaymentBasicValue(80);
        } else {
          const service = servicePlan.filter(svc => svc.workout !== name);
          setServicePlan(service);
          setPaymentBasicValue(0);
        }
      }

      if (name !== 'Basic') {
        if (checked) {
          setServicePlan([
            ...servicePlan,
            {
              workout: name,
              servicePlan: 'Individual',
            },
          ]);
          setPaymentIndividualValue(paymentIndividualValue + 120);
        } else {
          const service = servicePlan.filter(svc => svc.workout !== name);
          setServicePlan(service);
          setPaymentIndividualValue(paymentIndividualValue - 120);
        }
      }

      if (name === 'account') {
        if (checked) {
          setUserAccount(true);
        } else {
          setUserAccount(false);
        }
      }
    },
    [paymentIndividualValue, servicePlan],
  );

  const handleForm = useCallback(
    async event => {
      event.preventDefault();

      const formValue: FormData = {
        id: newInput,
        name: event.target[0].value,
        rg: event.target[1].value,
        address: event.target[2].value,
        email: event.target[3].value,
        userPlan: servicePlan,
        account: userAccount,
      };
      // await api.put('/users/update', formValue);
    },
    [newInput, servicePlan, userAccount],
  );

  return (
    <>
      <Container>
        <h2>Alteração de dados cadastrais</h2>
        <SearchContent>
          <Input
            name="id"
            value={newInput}
            onChange={e => setNewInput(e.target.value)}
            icon={HiOutlineDocumentReport}
            placeholder="Digite o Id"
          />
          <Button type="button" onClick={handleSearch}>
            Buscar
          </Button>
        </SearchContent>

        {newUser ? (
          <Form onSubmit={handleForm}>
            <Input
              name="name"
              icon={HiOutlineUser}
              placeholder="Nome"
              defaultValue={newUser.name}
            />
            <Input
              name="rg"
              icon={HiOutlineDocument}
              placeholder="RG"
              defaultValue={newUser.rg}
            />
            <Input
              name="address"
              icon={HiOutlineGlobe}
              placeholder="Endereço"
              defaultValue={newUser.address}
            />
            <Input
              name="email"
              icon={HiOutlineMail}
              placeholder="E-mail"
              defaultValue={newUser.email}
            />
            <GymPlan>
              <fieldset>
                <legend>
                  {plan.map(modality => modality.servicePlan === 'Basic') && (
                    <Input
                      name="Basic"
                      type="checkbox"
                      checked={newBasicCheckedInput}
                      onChange={e => setNewBasicCheckedInput(e.target.checked)}
                      onClick={handleValue}
                    />
                  )}
                  Básico
                </legend>
                {plan.map(
                  modality =>
                    modality.servicePlan === 'Basic' && (
                      <Label key={modality.workout}>{modality.workout}</Label>
                    ),
                )}
              </fieldset>

              <fieldset>
                <legend>Individual</legend>

                {plan.map(
                  modality =>
                    modality.servicePlan === 'Individual' && (
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
            <Label>
              <Input
                name="account"
                type="checkbox"
                defaultChecked={newUser.account}
                onClick={handleValue}
              />
              Conta ativa ?
            </Label>
            <PlanValue
              basicValue={paymentBasicValue}
              individualValue={paymentIndividualValue}
            />
            <Button type="submit">Enviar</Button>
          </Form>
        ) : (
          <h2>{userFound}</h2>
        )}

        <Link to="/">Voltar</Link>
      </Container>
    </>
  );
};
export default ChangeData;
