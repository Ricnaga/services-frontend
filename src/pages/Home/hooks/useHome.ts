import { useEffect, useState } from 'react';
import {
  GetUserImages,
  getUserImages,
} from '../../../application/api/endpoints/users';

export const useHome = () => {
  const [images, setImages] = useState<Array<GetUserImages>>([]);

  useEffect(() => {
    getUserImages().then((response) => setImages(response ?? []));
  }, []);

  return {
    data: { images },
  };
};
