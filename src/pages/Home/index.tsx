import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { LoadingCard } from '../../components/@common/Loading/LoadingCard';
import { HomeCarousel } from '../../components/HomeComponent/HomeCarousel';
import api from '../../services/api';

export interface HomeProps {
  title: string;
  description: string;
  url: string;
}

export function Home() {
  const [images, setImages] = useState<HomeProps[] | null>(null);

  useEffect(() => {
    api.get('/images').then(response => setImages(response.data));
  }, []);

  return (
    <Container fluid className="mt-4">
      {!images ? <LoadingCard /> : <HomeCarousel images={images} />}
    </Container>
  );
}
