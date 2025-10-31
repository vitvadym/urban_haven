import { signOut, updateUser, deleteUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import {
  selectUser,
  selectIsLoading,
  selectError,
} from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../components/Loader.jsx';

export const Profile = () => {
  const [file, setFile] = useState(undefined);
  const [formFields, setFormFields] = useState({});
  const [uploadImageError, setUploadImageError] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  const inputRef = useRef(null);

  const signOutHandler = () => {
    dispatch(signOut());
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser());
  };

  const handleChangeInputField = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);

  const handleFileChange = (file) => {
    if (!file) {
      setUploadImageError('No file selected');
    }
    setFile(file);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append('images', file[0]);
    }

    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }
    dispatch(updateUser(formData));
  };

  return (
    <div className='mx-auto max-w-lg'>
      <h1 className='mt-2 text-center text-3xl font-bold'>
        {currentUser.username}
      </h1>
      <form
        onSubmit={handleUpdateSubmit}
        className='flex flex-col gap-4'
      >
        <input
          hidden
          ref={inputRef}
          type='file'
          accept='image/*'
          onChange={(event) => setFile(event.target.files)}
        />
        <img
          onClick={() => inputRef.current.click()}
          className='m-3 h-24 w-24 cursor-pointer self-center rounded-full shadow-sm'
          src={file ? URL.createObjectURL(file[0]) : currentUser?.avatar}
          alt='profile photo'
        />

        <input
          type='text'
          placeholder='username'
          name='username'
          value={formFields.username ?? currentUser.username}
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          onChange={handleChangeInputField}
        />
        <input
          type='text'
          placeholder='email'
          name='email'
          value={formFields.email ?? currentUser.email}
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          onChange={handleChangeInputField}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          onChange={handleChangeInputField}
        />

        <button
          // disabled={isDisabled}
          className='rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? <Loader /> : 'Update'}
        </button>
        <div className='space-x-5'>
          <span
            onClick={deleteUserHandler}
            className='cursor-pointer font-medium text-red-900 duration-200 hover:opacity-80'
          >
            Delete account
          </span>
          <span
            onClick={signOutHandler}
            className='cursor-pointer font-medium duration-200 hover:opacity-80'
          >
            Sign out
          </span>
        </div>
        {isError && (
          <p className='text-center text-sm text-red-500'> {isError}</p>
        )}
        {uploadImageError && (
          <p className='text-center text-sm text-red-500'>{uploadImageError}</p>
        )}
        {persentation === 100 && !isError && (
          <p className='text-center text-green-700 '>{uploadResult}</p>
        )}
      </form>
    </div>
  );
};
