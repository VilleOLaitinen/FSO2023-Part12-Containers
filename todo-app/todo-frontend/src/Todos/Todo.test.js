import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders a single todo', () => {
  const mockFunction = jest.fn();
  const mockFunction2 = jest.fn();

  const todo = {
    text: 'This is a todo for our test',
    done: false,
  };

  render(<Todo todo={todo} deleteTodo={mockFunction} completeTodo={mockFunction2} />);

  const element = screen.getByText('This is a todo for our test');
  expect(element).toBeDefined();
});
