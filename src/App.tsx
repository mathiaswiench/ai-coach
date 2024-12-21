// App.js
import { Routes, Route } from 'react-router';

import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default App;
