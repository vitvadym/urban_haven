import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/userSlice';
import {
  selectError,
  selectIsLoading,
  selectIsAuth,
} from '../../redux/slices/userSlice';
import OAuth from '../../components/OAuth/OAuth';
import Loader from '../../components/Loader';

export const SignUp = () => {
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
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/sign-in');
    }
  }, [isAuth, navigate]);
  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='mb-4 text-center text-3xl font-bold'>Create an account</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />
        <input
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />
        <input
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          className='rounded-lg bg-slate-700 p-3 uppercase text-white shadow-sm hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? <Loader /> : 'Create account'}
        </button>
        <OAuth />
        <div className='flex items-center gap-2'>
          <p className='text-sm'>Have an account?</p>
          <Link
            className='text-sm text-slate-500 underline'
            to='/sign-in'
          >
            Sign in
          </Link>
        </div>
      </form>
      {error && (
        <p className='mt-2 flex items-center gap-1 text-red-500'>{error}</p>
      )}
    </div>
  );
};
