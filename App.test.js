import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders portfolio navbar', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/portfolio/i);
  expect(linkElement).toBeInTheDocument();
});
