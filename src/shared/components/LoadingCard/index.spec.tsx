import { render } from '@testing-library/react';
import { LoadingCard } from '.';

describe('LOADING CARD COMPONENT', () => {
  it('should be able to render component', () => {
    const { container } = render(<LoadingCard />);

    expect(container).toMatchSnapshot();
  });
});
