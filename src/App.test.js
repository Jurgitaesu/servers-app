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
    const formNode = component.getByTitle('form');
    expect(formNode).toBeInTheDocument();
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
  test('renders empty username field error message', () => {
    const { getByRole, container } = render(<Login />);
    const buttonNode = getByRole('button');
    fireEvent.click(buttonNode);
    expect(container.innerHTML).toMatch('Username field is empty');
  });
  test('renders empty password field error message', () => {
    const { getByLabelText, getByRole, container } = render(<Login />);
    const usernameInputNode = getByLabelText('Username:');
    const buttonNode = getByRole('button');
    expect(usernameInputNode.value).toMatch('');
    fireEvent.change(usernameInputNode, { target: { value: 'testing' } });
    expect(usernameInputNode.value).toMatch('testing');
    fireEvent.click(buttonNode);
    expect(container.innerHTML).toMatch('Password field is empty');
  });
  test('renders too long username error message', () => {
    const { getByLabelText, getByRole, container } = render(<Login />);
    const usernameInputNode = getByLabelText('Username:');
    const passwordInputNode = getByLabelText('Password:');
    const buttonNode = getByRole('button');
    expect(usernameInputNode.value).toMatch('');
    fireEvent.change(usernameInputNode, {
      target: { value: 'testingtestingtestingtestingtestingtestingtesting' },
    });
    expect(usernameInputNode.value).toMatch('testingtestingtestingtestingtestingtestingtesting');
    expect(passwordInputNode.value).toMatch('');
    fireEvent.change(passwordInputNode, {
      target: { value: 'testing' },
    });
    expect(passwordInputNode.value).toMatch('testing');
    fireEvent.click(buttonNode);
    expect(container.innerHTML).toMatch('Username should be up to 40 symbols');
  });
  test('renders too long password error message', () => {
    const { getByLabelText, getByRole, container } = render(<Login />);
    const usernameInputNode = getByLabelText('Username:');
    const passwordInputNode = getByLabelText('Password:');
    const buttonNode = getByRole('button');
    expect(usernameInputNode.value).toMatch('');
    fireEvent.change(usernameInputNode, {
      target: { value: 'testing' },
    });
    expect(usernameInputNode.value).toMatch('testing');
    expect(passwordInputNode.value).toMatch('');
    fireEvent.change(passwordInputNode, {
      target: { value: 'testingtestingtestingtestingtestingtestingtesting' },
    });
    expect(passwordInputNode.value).toMatch('testingtestingtestingtestingtestingtestingtesting');
    fireEvent.click(buttonNode);
    expect(container.innerHTML).toMatch('Password should be up to 40 symbols');
  });
  test('should not render empty username or password field error message', () => {
    const { getByLabelText, getByRole, container } = render(<Login />);
    const usernameInputNode = getByLabelText('Username:');
    const passwordInputNode = getByLabelText('Password:');
    const buttonNode = getByRole('button');
    expect(usernameInputNode.value).toMatch('');
    fireEvent.change(usernameInputNode, { target: { value: 'testing' } });
    expect(usernameInputNode.value).toMatch('testing');
    expect(passwordInputNode.value).toMatch('');
    fireEvent.change(passwordInputNode, { target: { value: 'testing' } });
    expect(passwordInputNode.value).toMatch('testing');
    fireEvent.click(buttonNode);
    expect(container.innerHTML).not.toBe('Username field is empty');
    expect(container.innerHTML).not.toBe('Password field is empty');
  });
});
