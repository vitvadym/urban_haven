import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/userSlice';

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { isLoading, status, error } = useSelector((state) => state.user);
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
    if (status === 'success') {
      navigate('/sign-in');
    }
  }, [status, navigate]);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Create an account</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          className='border p-3 rounded-lg'
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />
        <input
          className='border p-3 rounded-lg'
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />
        <input
          className='border p-3 rounded-lg'
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg shadow-sm uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? 'Loading...' : 'Create account'}
        </button>
        <div className='flex gap-2 items-center'>
          <p className='text-sm'>Have an account?</p>
          <Link
            className='text-slate-500 text-sm underline'
            to='/sign-in'
          >
            Sign in
          </Link>
        </div>
      </form>
      {error && (
        <p className='flex items-center gap-1 mt-2 text-red-500'>{error}</p>
      )}
    </div>
  );
};
