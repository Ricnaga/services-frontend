import Input from '../../components/Input';
import { Label } from './style';

interface AllPlans {
  workout: string;
  servicePlan: string;
}

interface FieldPlansProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            modality =>
              modality.servicePlan === 'Basic' && (
                <Label key={modality.workout}>{modality.workout}</Label>
              ),
          )}
        </>
      ) : (
        <>
          <legend>{name}</legend>
          {plan.map(
            modality =>
              modality.servicePlan === name && (
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
