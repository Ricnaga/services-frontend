import { render } from '@testing-library/react';
import { ButtonBootstrap } from '.';

describe('BUTTON COMPONENT', () => {
  it('should be able to render component', () => {
    const { container } = render(<ButtonBootstrap title="ButtonBootstrap" />);

    expect(container).toMatchSnapshot();
  });
});
