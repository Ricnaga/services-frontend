import Container from 'react-bootstrap/Container';
import { BootstrapToast } from '../../shared/components/BootstrapToast';
import { HomeCarousel } from './components/HomeCarousel';
import { useHome } from './hooks/useHome';

export function Home() {
  const {
    data: { images, color, isOpen, title },
    functions: { closeToast },
  } = useHome();

  return (
    <>
      <Container fluid className="mt-4">
        <HomeCarousel images={images} />
      </Container>
      <BootstrapToast
        color={color}
        title={title}
        isOpen={isOpen}
        onClose={closeToast}
      />
    </>
  );
}
