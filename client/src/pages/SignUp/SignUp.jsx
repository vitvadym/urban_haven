import { BiError } from 'react-icons/bi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SignUp = () => {
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

  const handleSubbit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await axios.post('/api/auth/signup', formData);
      navigate('/sign-in');
    } catch (error) {
      const errorMessage = error.response.data.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Create an account</h1>
      <form
        onSubmit={handleSubbit}
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
        <p className='flex items-center gap-1 text-red-500'>
          <BiError />
          {error}
        </p>
      )}
    </div>
  );
};
