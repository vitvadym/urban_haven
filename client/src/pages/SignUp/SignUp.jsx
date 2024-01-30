import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Sing Up</h1>
      <form className='flex flex-col gap-4'>
        <input
          className='border p-3 rounded-lg'
          type='text'
          placeholder='username'
          name='username'
        />
        <input
          className='border p-3 rounded-lg'
          type='email'
          placeholder='email'
          name='email'
        />
        <input
          className='border p-3 rounded-lg'
          type='password'
          placeholder='password'
          name='password'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Sign up
        </button>
        <div className='flex gap-2'>
          <p className='font-medium'>Have an account?</p>
          <Link
            className='text-sky-700 hover:underline'
            to='/sign-in'
          >
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
