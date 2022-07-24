import { render } from '@testing-library/react';
import { Home } from '.';

describe('HOME SCREEN', () => {
  it('should be able to render screen', () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
