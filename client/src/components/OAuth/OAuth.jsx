import { app } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from '../../redux/slices/userSlice';
import { selectIsAuth, selectIsLoading } from '../../redux/slices/userSlice';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import Loader from '../Loader';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const {
        user: { displayName, email, photoURL },
      } = result;
      dispatch(googleSignIn({ displayName, email, photoURL }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <button
      onClick={handleGoogleSignIn}
      type='button'
      className='bg-red-700 p-3 rounded-lg shadow-sm uppercase hover:opacity-85 duration-200 disabled:opacity-80'
    >
      {isLoading ? <Loader /> : 'Sign in with Google'}
    </button>
  );
};

export default OAuth;
