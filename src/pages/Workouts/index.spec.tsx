import { render } from '@testing-library/react';
import { Workouts } from '.';

describe('WORKOUTS SCREEN', () => {
  it('should be able to render screen', () => {
    const { container } = render(<Workouts />);

    expect(container).toMatchSnapshot();
  });
});
