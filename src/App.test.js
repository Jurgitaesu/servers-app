import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './components/Login';
import userReducer from './features/user';
import tokenReducer from './features/token';

const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
  },
});

const render = (component) => rtlRender(<Provider store={store}>{component}</Provider>);

describe('login describe statement', () => {
  test('login form should be in the document', () => {
    const component = render(<Login />);
    const labelNode = component.getByText('Username:');
    expect(labelNode).toBeInTheDocument();
  });
  test('username field should have label', () => {
    const component = render(<Login />);
    const usernameInputNode = component.getByLabelText('Username:');
    expect(usernameInputNode.getAttribute('name')).toBe('username');
  });
  test('password field should have label', () => {
    const component = render(<Login />);
    const passwordInputNode = component.getByLabelText('Password:');
    expect(passwordInputNode.getAttribute('name')).toBe('password');
  });
  test('username input should accept text', () => {
    const { getByLabelText } = render(<Login />);
    const usernameInputNode = getByLabelText('Username:');
    expect(usernameInputNode.value).toMatch('');
    fireEvent.change(usernameInputNode, { target: { value: 'testing' } });
    expect(usernameInputNode.value).toMatch('testing');
  });
  test('password input should accept text', () => {
    const { getByLabelText } = render(<Login />);
    const passwordInputNode = getByLabelText('Password:');
    expect(passwordInputNode.value).toMatch('');
    fireEvent.change(passwordInputNode, { target: { value: 'testing' } });
    expect(passwordInputNode.value).toMatch('testing');
  });
  test('should be able to submit form', () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<Login handleLogin={mockFn} />);
    const buttonNode = getByRole('button');
    fireEvent.click(buttonNode);
    // expect(mockFn).toHaveBeenCalled();
  });
});
