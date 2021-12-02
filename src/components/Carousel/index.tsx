import { Carousel as CarouselBoostrap, Image } from 'react-bootstrap';

export function Carousel() {
  return (
    <CarouselBoostrap fade>
      <CarouselBoostrap.Item>
        <Image
          className="d-flex w-100 mx-auto"
          src="https://images.unsplash.com/photo-1634497237498-2519facf9554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="First slide"
        />
        <CarouselBoostrap.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </CarouselBoostrap.Caption>
      </CarouselBoostrap.Item>
    </CarouselBoostrap>
  );
}
