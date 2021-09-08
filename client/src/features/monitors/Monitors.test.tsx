import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { Monitors } from './Monitors';

describe('Monitors', () => {
  test('renders the monitor list heading', () => {
    render(<Provider store={store}><Monitors /></Provider>);

    expect(screen.getByText('Monitors')).toBeInTheDocument();
  });

  test('renders the loading spinner at first', () => {
    render(<Provider store={store}><Monitors /></Provider>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
})