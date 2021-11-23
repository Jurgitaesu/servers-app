import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user';
import { token } from '../features/token';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '') return setError('Username field is empty');
    if (password === '') return setError('Password field is empty');
    if (username.length > 39) return setError('Username should be up to 40 symbols');
    if (password.length > 39) return setError('Password should be up to 40 symbols');
    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
      dispatch(login({ username: username, password: password, isLoggedIn: true }));
      fetchLogin();
    } else {
      return setError('Username or password is incorrect');
    }
  };

  const fetchLogin = async () => {
    const loginData = {
      username: username,
      password: password,
    };
    const response = await fetch('https://playground.tesonet.lt/v1/tokens', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    setError('');
    dispatch(token(data.token));
  };

  return (
    <div>
      <h1 className="py-20">Login</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <div className="d-flex space-btw my-10">
          <p className="text-small">* All fields required</p>
          <p>
            <button className="login-button" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </p>
        </div>
      </form>
      {!!error ? <div>{error}</div> : null}
    </div>
  );
};

export default Login;
