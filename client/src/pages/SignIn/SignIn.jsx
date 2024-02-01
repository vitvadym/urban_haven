import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('/api/auth/signin', formData);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response.data.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Sing In</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          type='text'
          name='email'
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          name='password'
          type='password'
          placeholder='Password'
        />
        <button
          disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg shadow-sm uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>
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
        <p className='flex items-center gap-1 text-red-500'> {error}</p>
      )}
    </div>
  );
};
