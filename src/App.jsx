import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './pages/About/About';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Layout from './Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            path=''
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
