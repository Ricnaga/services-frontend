import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import {
  Container,
  Form,
  AllFields,
  AddField,
  RemoveField,
} from './style';

interface WorkoutRequest{
  servicePackage:string;
  workout:string;
}

const Workouts: React.FC = () => {
  const [newWorkout, setNewWorkout] = useState('');
  const [newServicePackage, setNewServicePackage] = useState('');
  const [newRemoveBasicWorkout, setNewRemoveBasicWorkout] = useState<string[]>([]);
  const [newRemoveIndividualWorkout, setNewRemoveIndividualWorkout] = useState<string[]>([]);

  useEffect(() => {
    api.get('/plans/show').then((response) => {
      const allWorkouts:WorkoutRequest[] = response.data;
      const basic = allWorkouts.filter((workouts) => (workouts.servicePackage === 'Basic'
        && workouts.workout)).map((workouts) => workouts.workout);

      const individual = allWorkouts.filter((workouts) => (workouts.servicePackage === 'Individual'
        && workouts.workout)).map((workouts) => workouts.workout);

      setNewRemoveBasicWorkout(basic);
      setNewRemoveIndividualWorkout(individual);
    });
  }, []);

  const handleAddWorkout = useCallback(() => {
    if (newWorkout && newServicePackage === 'Basic') {
      setNewRemoveBasicWorkout([...newRemoveBasicWorkout, newWorkout]);
    }

    if (newWorkout && newServicePackage === 'Individual') {
      setNewRemoveIndividualWorkout([...newRemoveIndividualWorkout, newWorkout]);
    }
  }, [
    newWorkout,
    newServicePackage,
    newRemoveBasicWorkout,
    newRemoveIndividualWorkout,
  ]);

  const handleRemoveBasicWorkout = useCallback((removeItem) => {
    const item = newRemoveBasicWorkout.filter((basic) => basic !== removeItem);
    setNewRemoveBasicWorkout(item);
  }, [newRemoveBasicWorkout]);

  const handleRemoveIndividualWorkout = useCallback((removeItem) => {
    const item = newRemoveIndividualWorkout.filter((basic) => basic !== removeItem);
    setNewRemoveIndividualWorkout(item);
  }, [newRemoveIndividualWorkout]);

  const handleCreateWorkout = useCallback(async (event) => {
    const services:WorkoutRequest[] = [];
    newRemoveBasicWorkout.map((workout) => services.push({
      workout,
      servicePackage: 'Basic',
    }));

    newRemoveIndividualWorkout.map((workout) => services.push({
      workout,
      servicePackage: 'Individual',
    }));

    await api.put('/plans/update', { services });
  }, [newRemoveBasicWorkout, newRemoveIndividualWorkout]);

  return (

    <>
      <Container>
        <h2>Pacote de treinos</h2>

        <Form onSubmit={handleCreateWorkout} id="SendForm">
          <AllFields>
            <AddField>
              <fieldset>
                <legend>Adicionar</legend>
                <Input
                  name="workout"
                  value={newWorkout}
                  onChange={(e) => setNewWorkout(e.target.value)}
                  placeholder="Digite o nome do treino"
                />
                <select
                  id="plans"
                  value={newServicePackage}
                  onChange={(e) => setNewServicePackage(e.target.value)}
                >
                  <option>&nbsp;</option>
                  <option value="Basic">Básico</option>
                  <option value="Individual">Individual</option>
                </select>
                <Button type="button" onClick={handleAddWorkout}>+</Button>

              </fieldset>
            </AddField>

            <RemoveField>
              <fieldset>
                <legend>Remover</legend>
                <fieldset>
                  <legend>Básico</legend>

                  <ul>
                    {newRemoveBasicWorkout.map((removeValue) => (
                      <li key={removeValue}>
                        {removeValue}
                        <Button type="button" onClick={() => handleRemoveBasicWorkout(removeValue)}>-</Button>
                      </li>
                    ))}

                  </ul>

                </fieldset>

                <fieldset>
                  <legend>Individual</legend>

                  <ul>
                    {newRemoveIndividualWorkout.map((removeValue) => (
                      <li key={removeValue}>
                        {removeValue}
                        <Button type="button" onClick={() => handleRemoveIndividualWorkout(removeValue)}>-</Button>
                      </li>
                    ))}

                  </ul>

                </fieldset>

              </fieldset>
            </RemoveField>
          </AllFields>
          <Button type="submit">Salvar</Button>
        </Form>
        <Link to="/">Voltar</Link>

      </Container>
    </>
  );
};
export default Workouts;
