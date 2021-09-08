import { render, screen } from '@testing-library/react';
import React from 'react';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  test('renders home link', () => {
    render(<AppHeader />);

    const homeLink = screen.getByText('Solo Web Monitor');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('renders documents link', () => {
    render(<AppHeader />);

    const homeLink = screen.getByText('Documents');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', 'https://github.com/rodmcnew/solo-web-monitor');
  });
});