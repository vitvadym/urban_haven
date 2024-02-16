import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/userSlice';
import {
  selectError,
  selectIsLoading,
  selectIsAuth,
} from '../../redux/slices/userSlice';
import OAuth from '../../components/OAuth/OAuth';
import Loader from '../../components/Loader';

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Sing In</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg outline-none focus:shadow-sm duration-300'
          type='text'
          name='email'
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg outline-none focus:shadow-sm duration-300'
          name='password'
          type='password'
          placeholder='Password'
        />
        <button
          // disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg shadow-sm uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? <Loader /> : 'Sign in'}
        </button>
        <OAuth />
        <div className='flex gap-2'>
          <p className='text-sm'>Need an account?</p>
          <Link
            className='text-slate-500 text-sm underline'
            to='/sign-up'
          >
            Sign up
          </Link>
        </div>
      </form>
      {error && (
        <p className='flex items-center gap-1 mt-2 text-red-500'> {error}</p>
      )}
    </div>
  );
};
