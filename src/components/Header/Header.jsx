import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl'>
            <span className='text-slate-500'>Urban</span>
            <span className='text-slate-700'>Haven</span>
          </h1>
        </Link>

        <form className='bg-slate-100 flex items-center rounded-md p-2'>
          <input
            className='bg-transparent outline-none px-1 w-24 sm:w-64'
            type='text'
            placeholder='Search'
          />

          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-3'>
          <Link to='/'>
            <li className='hidden sm:block text-slate-600 hover:text-slate-950 duration-300'>
              Home
            </li>
          </Link>
          <Link to='about'>
            <li className='hidden sm:block text-slate-600  hover:text-slate-950 duration-300'>
              About
            </li>
          </Link>
          <Link to={'sign-in'}>
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
