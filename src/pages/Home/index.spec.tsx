import { Home } from '.';
import { renderWithTheme } from '../../test/Provider/BootstrapProvider';

describe('HOME SCREEN', () => {
  it('should render Container', () => {
    const { container } = renderWithTheme(<Home />);

    expect(container.firstChild).toHaveClass('container-fluid mt-4');
  });

  it('should be able to render screen', () => {
    const { container } = renderWithTheme(<Home />);

    expect(container).toMatchSnapshot();
  });
});
