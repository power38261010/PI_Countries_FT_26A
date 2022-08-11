import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  const h1 = screen.getByText(/Bienvenidos/i);
  expect(h1).toBeInTheDocument();
});


