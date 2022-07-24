import { render } from '@testing-library/react';
import { CreateUsers } from '.';

describe('CREATE USERS SCREEN', () => {
  it('should be able to render screen', () => {
    const { container } = render(<CreateUsers />);

    expect(container).toMatchSnapshot();
  });
});
