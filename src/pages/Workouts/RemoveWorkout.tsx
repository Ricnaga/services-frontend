import Button from '../../components/Button';

interface RemoveFieldProps{
  title:string;
  workout:string[];
  removeWorkoutName:(name:string) => void;
}

export default function RemoveWorkout({ title, workout, removeWorkoutName }:RemoveFieldProps) {
  return (
    <>
      <fieldset>
        <legend>{title}</legend>

        <ul>
          {workout.map((name) => (
            <li key={name}>
              {name}
              <Button type="button" onClick={() => removeWorkoutName(name)}>-</Button>
            </li>
          ))}

        </ul>

      </fieldset>
    </>
  );
}
