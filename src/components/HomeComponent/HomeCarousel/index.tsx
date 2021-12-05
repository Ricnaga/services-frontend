import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { HomeProps } from '../../../pages/Home';

type HomeCarouselProps = {
  images: Array<HomeProps>;
};

export function HomeCarousel({ images }: HomeCarouselProps) {
  return (
    <Carousel variant="dark" fade>
      {images.map(img => (
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
