import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/slices/userSlice';

import { RxHamburgerMenu } from 'react-icons/rx';
import useClickOutside from '../../hooks/useClickOutside';
import { useState } from 'react';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, isShow, setIsShow } = useClickOutside(false);

  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  const handleCloseDropDown = () => {
    setIsShow(false);
  };

  const handleChangeQuery = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = new URLSearchParams(location.search);
    query.set('query', searchTerm);
    navigate({
      pathname: '/search',
      search: query.toString(),
    });

    setSearchTerm('');
  };

  return (
    <header className='bg-slate-200 shadow-sm'>
      <div className='mx-auto flex max-w-6xl items-center justify-between p-3'>
        <Link to='/'>
          <h1 className='text-2xl font-bold'>
            <span className='text-slate-500'>Elite</span>
            <span className='text-slate-700'>Homes</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSearch}
          className='flex items-center rounded-md bg-slate-100 p-2'
        >
          <input
            className='w-24 bg-transparent px-1 outline-none sm:w-64'
            type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={handleChangeQuery}
          />

          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex items-center gap-3'>
          <Link to='/'>
            <li className='hidden text-slate-600 duration-300 hover:text-slate-950 sm:block'>
              Home
            </li>
          </Link>
          <Link to='about'>
            <li className='hidden text-slate-600 duration-300  hover:text-slate-950 sm:block'>
              About
            </li>
          </Link>

          {currentUser ? (
            <div className='relative flex min-w-20 items-center gap-3 rounded-xl bg-slate-300 p-2 shadow-md'>
              <Link
                title='profile'
                to='/profile'
              >
                <img
                  className='h-7 w-7 rounded-full object-cover'
                  src={currentUser?.avatar}
                  alt='user avatar'
                />
              </Link>
              <span
                className='cursor-pointer'
                onClick={setIsShow}
              >
                <RxHamburgerMenu />
              </span>
              {isShow && (
                <div
                  ref={ref}
                  className='absolute -left-20 top-12 z-10 flex h-14 w-40 flex-col rounded-lg bg-slate-300 pt-2 text-center shadow-md'
                >
                  <Link
                    to={'/create-listing'}
                    onClick={handleCloseDropDown}
                    className='cursor-pointer text-sm duration-200 hover:text-slate-500'
                  >
                    Create listing
                  </Link>
                  <Link
                    to={'/my-listings'}
                    onClick={handleCloseDropDown}
                    className='cursor-pointer text-sm  duration-200 hover:text-slate-500'
                  >
                    My listing
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to={'sign-in'}>
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};
