import Input from '../../components/Input';
import { GymPlan, Label } from './style';

interface AllPlans {
  workout: string;
  servicePlan: 'Basic' | 'Individual';
}

interface ListUserPlansProps {
  userBasicPlan: boolean;
  setUserBasicPlan: (value: React.SetStateAction<boolean>) => void;
  handleValue: (event: unknown) => void;
  plan: AllPlans[];
  checkIndividualPlans: (plans: AllPlans) => never;
}

export default function ListUserPlans({
  userBasicPlan,
  setUserBasicPlan,
  handleValue,
  plan,
  checkIndividualPlans,
}: ListUserPlansProps) {
  return (
    <GymPlan>
      <fieldset>
        <legend>
          <Input
            name="Basic"
            type="checkbox"
            checked={userBasicPlan}
            onChange={e => setUserBasicPlan(e.target.checked)}
            onClick={handleValue}
          />
          Básico
        </legend>
        {plan.map(
          basicPlan =>
            basicPlan.servicePlan === 'Basic' && (
              <Label key={basicPlan.workout}>{basicPlan.workout}</Label>
            ),
        )}
      </fieldset>

      <fieldset>
        <legend>Individual</legend>

        {plan
          .filter(individuaPlan => individuaPlan.servicePlan === 'Individual')
          .map(p =>
            p.workout === checkIndividualPlans(p) ? (
              <Label key={p.workout}>
                <Input
                  name={p.workout}
                  type="checkbox"
                  onClick={handleValue}
                  defaultChecked
                />
                {p.workout}
              </Label>
            ) : (
              <Label key={p.workout}>
                <Input name={p.workout} type="checkbox" onClick={handleValue} />
                {p.workout}
              </Label>
            ),
          )}
      </fieldset>
    </GymPlan>
  );
}
