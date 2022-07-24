import { Carousel, Image } from 'react-bootstrap';
import { LoadingCard } from '../../../../shared/components/LoadingCard';

type HomeCarouselProps = Record<
  'images',
  Array<{
    title: string;
    description: string;
    url: string;
  }>
>;

export function HomeCarousel({ images }: HomeCarouselProps) {
  if (!images.length) return <LoadingCard />;
  return (
    <Carousel variant="dark" fade>
      {images.map((img) => (
        <Carousel.Item key={img.url}>
          <Image
            fluid
            className="d-block mx-auto mt-3 w-100"
            src={img.url}
            alt={img.title}
          />

          <Carousel.Caption>
            <h3>{img.title}</h3>
            <p>{img.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
