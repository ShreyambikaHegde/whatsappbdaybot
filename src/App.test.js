import { render, screen } from '@testing-library/react';
import App from './App';
import Birthday from './components/birthday';

test('renders learn react link', () => {
  <Birthday/>
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
