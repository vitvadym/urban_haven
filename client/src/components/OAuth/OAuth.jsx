import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from '../../redux/slices/userSlice';
import { selectIsAuth, selectIsLoading } from '../../redux/slices/userSlice';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import Loader from '../Loader';
import icon from '../.../../../assets/google-icon-logo.svg';
import axios from 'axios';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { access_token } = credentialResponse;
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      const { given_name, email, picture } = data;

      dispatch(
        googleSignIn({
          displayName: given_name,
          email: email,
          photoURL: picture,
        }),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });


  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <button
      onClick={googleLogin}
      type='button'
      className='flex items-center justify-center gap-6 rounded-lg border border-gray-300 p-3 shadow-sm transition-shadow hover:shadow-md'
    >
      <span>
        <img
          className='h-5'
          src={icon}
          alt='google icon'
        />
      </span>
      {isLoading ? <Loader /> : 'Sign in with Google'}
    </button>
  );
};

export default OAuth;
