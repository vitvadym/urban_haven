import { signOut, updateUser, deleteUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import {
  selectUser,
  selectIsLoading,
  selectError,
} from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { storage } from '../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Loader from '../../components/Loader.jsx';

export const Profile = () => {
  const [file, setFile] = useState(undefined);
  const [uploadResult, setUploadResult] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadImageError, setUploadImageError] = useState(null);
  const [persentation, setPresentation] = useState(0);

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  const isDisabled = Object.values(formData).every((value) => !value);

  const inputRef = useRef(null);

  console.log(currentUser);

  const signOutHandler = () => {
    dispatch(signOut());
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser());
  };

  const handleChangeImage = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChanheInputField = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    if (!file) {
      setUploadImageError('No file selected');
      return;
    }
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPresentation(Math.round(progress));
        setUploadResult('Image uploaded');
      },
      (error) => {
        setUploadImageError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData({
            ...formData,
            avatar: url,
          });
        });
      },
    );
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    if (!isError) {
      dispatch(updateUser(formData));

      setUploadResult('Profile Updated Successfully');
      setFormData({});

      setTimeout(() => {
        setUploadResult(null);
      }, 3000);
    }
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
          onChange={handleChangeImage}
        />
        <img
          onClick={() => inputRef.current.click()}
          className='m-3 h-24 w-24 cursor-pointer self-center rounded-full shadow-sm'
          src={currentUser?.avatar}
          alt='profile photo'
        />

        <input
          type='text'
          placeholder='username'
          name='username'
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          onChange={handleChanheInputField}
        />
        <input
          type='text'
          placeholder='email'
          name='email'
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          onChange={handleChanheInputField}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-sm'
          onChange={handleChanheInputField}
        />

        <button
          disabled={isDisabled}
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
