import { render, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

export const renderWithTheme = (children: ReactNode): RenderResult =>
  render(<ThemeProvider>{children}</ThemeProvider>);
