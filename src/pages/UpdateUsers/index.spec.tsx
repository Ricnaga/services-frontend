import { render } from '@testing-library/react';
import { UpdateUsers } from '.';

describe('UPDATE USERS SCREEN', () => {
  it('should be able to render screen', () => {
    const { container } = render(<UpdateUsers />);

    expect(container).toMatchSnapshot();
  });
});
