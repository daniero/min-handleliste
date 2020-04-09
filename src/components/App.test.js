import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders handleliste header', () => {
  const { getByText } = render(<App/>);
  const overskrift = getByText(/handleliste/i);
  expect(overskrift).toBeInTheDocument();
});
