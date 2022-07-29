import { Home } from '.';
import { renderWithTheme } from '../../test/Provider/BootstrapProvider';

describe('HOME SCREEN', () => {
  let mockContainer: HTMLElement;

  beforeEach(() => {
    const { container } = renderWithTheme(<Home />);
    mockContainer = container;
  });

  it('should be able to render screen', () => {
    expect(mockContainer).toMatchSnapshot();
  });

  it('should render Container', () => {
    expect(mockContainer.firstChild).toHaveClass('container-fluid mt-4');
  });
});
