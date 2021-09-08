import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';

describe('App', () => {
  test('renders the header', () => {
    render(<Provider store={store}><App /></Provider>);

    expect(screen.getByText('Solo Web Monitor')).toBeInTheDocument();
  });

  test('renders the monitor list', () => {
    render(<Provider store={store}><App /></Provider>);

    expect(screen.getByText('Monitors')).toBeInTheDocument();
  });
})