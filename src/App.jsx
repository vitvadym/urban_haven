import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='about'
          element={<About />}
        />
        <Route
          path='sign-in'
          element={<SignIn />}
        />
        <Route
          path='sign-up'
          element={<SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
