import React from 'react';
import Container from 'react-bootstrap/Container';
import { HomeCarousel } from './components/HomeCarousel';
import { useHome } from './hooks/useHome';

export function Home() {
  const {
    data: { images },
  } = useHome();

  return (
    <Container fluid className="mt-4">
      <HomeCarousel images={images} />
    </Container>
  );
}
