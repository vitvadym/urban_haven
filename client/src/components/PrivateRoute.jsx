import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuth } from '../redux/slices/userSlice';

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
