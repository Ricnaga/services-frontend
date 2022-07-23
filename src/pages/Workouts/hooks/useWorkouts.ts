import { useEffect, useState } from 'react';
import {
  getPlansStatisctics,
  GetPlansStatistics,
} from '../../../application/api/endpoints/plans';

export const useWorkouts = () => {
  const [estatistica, setEstatistica] = useState<GetPlansStatistics | null>(
    null,
  );

  useEffect(() => {
    getPlansStatisctics().then((response) => setEstatistica(response));
  }, []);

  return {
    data: { estatistica },
  };
};
