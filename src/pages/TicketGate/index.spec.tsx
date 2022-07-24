import { render } from '@testing-library/react';
import { TicketGate } from '.';

describe('TICKET GATE SCREEN', () => {
  it('should be able to render screen', () => {
    const { container } = render(<TicketGate />);

    expect(container).toMatchSnapshot();
  });
});
