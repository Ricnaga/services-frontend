interface PlanValueProps {
  basicValue: number;
  individualValue: number;
}

export default function PlanValue({
  basicValue,
  individualValue,
}: PlanValueProps) {
  return (
    <h4>
      Valor do plano: R$
      {basicValue + individualValue > 120
        ? basicValue + individualValue * 0.6
        : basicValue + individualValue}
    </h4>
  );
}
