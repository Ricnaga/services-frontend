import { render } from '@testing-library/react';
import { Topbar } from '.';

describe('TOPBAR COMPONENT', () => {
  it('should be able to render component', () => {
    const { container } = render(<Topbar />);

    expect(container).toMatchSnapshot();
  });
});
