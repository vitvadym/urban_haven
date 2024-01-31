import { Link } from 'react-router-dom';

export const SignIn = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Sing In</h1>
      <form className='flex flex-col gap-4'>
        <input
          className='border p-3 rounded-lg'
          type='text'
          placeholder='Email'
        />
        <input
          className='border p-3 rounded-lg'
          type='password'
          placeholder='Password'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg shadow-sm uppercase hover:opacity-95 disabled:opacity-80'>
          Sign in
        </button>
        <div className='flex gap-2'>
          <p className='text-sm'>Need an account?</p>
          <Link
            className='text-slate-500 text-sm underline'
            to='/sign-up'
          >
            Sing up
          </Link>
        </div>
      </form>
    </div>
  );
};
