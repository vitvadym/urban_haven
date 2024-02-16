import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './pages/About/About';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { Home } from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import { Profile } from './pages/Profile/Profile.jsx';
import { Header } from './components/Header/Header';
import ListingItem from './pages/ListingItem/ListingItem.jsx';
import { CreateListing } from './pages/CreateListing/CreateListing.jsx';
import { MyListings } from './pages/MyListings/MyListings.jsx';
import { UpdateListing } from './pages/UpdateListing/UpdateListing.jsx';
import { NotFound } from './pages/NotFound/NotFound.jsx';
import { SearchResults } from './pages/SearchResults/SearchResults.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/sign-in'
          element={<SignIn />}
        />
        <Route
          path='/sign-up'
          element={<SignUp />}
        />
        <Route
          path='/listing-item/:id'
          element={<ListingItem />}
        />

        <Route
          path='/search'
          element={<SearchResults />}
        />

        <Route element={<PrivateRoute />}>
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/create-listing'
            element={<CreateListing />}
          />
          <Route
            path='/my-listings'
            element={<MyListings />}
          />
          <Route
            path='/update-listing/:id'
            element={<UpdateListing />}
          />
        </Route>

        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
