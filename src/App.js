import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Servers from './components/Servers';

const App = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="container">
      {!user.isLoggedIn ? <Login /> : null}
      {user.isLoggedIn ? <Servers /> : null}
    </div>
  );
};

export default App;
