import Input from '../../components/Input';
import { Label } from './style';

interface AllPlans {
  workout: string;
  servicePackage: string;
}

interface FieldPlansProps {
  name: string;
  setValues: (event: any) => void;
  plan: AllPlans[];
}

export default function FieldPlans({ name, setValues, plan }: FieldPlansProps) {
  return (
    <fieldset>
      {name === 'Básico' ? (
        <>
          <legend>
            <Input name="Basic" onClick={setValues} type="checkbox" />
            {name}
          </legend>

          {plan.map(
            (modality) => modality.servicePackage === 'Basic' && (
            <Label key={modality.workout}>{modality.workout}</Label>
            ),
          )}
        </>
      ) : (
        <>
          <legend>{name}</legend>
          {plan.map(
            (modality) => modality.servicePackage === name && (
            <Label key={modality.workout}>
              <Input
                name={modality.workout}
                onClick={setValues}
                type="checkbox"
              />
              {modality.workout}
            </Label>
            ),
          )}
        </>
      )}
    </fieldset>
  );
}
