import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ListingPreviewImage } from '../../components/ListingPreviewImage/ListingPreviewImage';
import Loader from '../../components/Loader';
import axios from 'axios';

export const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const FILES_LIMIT = 6;

  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    parking: false,
    furnished: false,
  });

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const inputFileRef = useRef(null);

  const handleChangeImages = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleChangeInputField = (event) => {
    if (event.target.id === 'rent' || event.target.id === 'sell') {
      setFormFields({
        ...formFields,
        type: event.target.id,
      });
    } else if (event.target.type === 'checkbox') {
      setFormFields({
        ...formFields,
        [event.target.id]: event.target.checked,
      });
    } else if (event.target.type === 'number') {
      setFormFields({
        ...formFields,
        [event.target.id]: +event.target.value,
      });
    } else {
      setFormFields({
        ...formFields,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      if (files.length < 1) {
        return setUploadImageError('Please upload at least 1 image');
      }
      const formData = new FormData();
      for (const key in formFields) {
        formData.append(key, formFields[key]);
      }
      files.forEach((file) => {
        formData.append('images', file);
      });
  
      formData.append('userRef', user._id);
      const {  data } = await axios.post('/api/listing/create', formData);

      if (data) {
        navigate('/my-listings');
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (files.length > FILES_LIMIT) {
      setError(`You can upload up to ${FILES_LIMIT} images`);
      const trimmedFiles = files.slice(0, FILES_LIMIT);
      setFiles(trimmedFiles);
    }

    if (files.length < FILES_LIMIT) {
      setError(null);
    }
  }, [files]);

  return (
    <div className='mx-auto max-w-6xl p-4'>
      <h1 className='mb-4 text-center text-4xl font-medium'>
        Create a listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3'
      >
        <input
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-md'
          type='text'
          placeholder='Name'
          required
          id='name'
          value={formFields.name}
          onChange={handleChangeInputField}
        />
        <textarea
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-md'
          placeholder='Description'
          required
          id='description'
          value={formFields.description}
          onChange={handleChangeInputField}
        />
        <input
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-md'
          type='text'
          placeholder='Adress'
          required
          id='address'
          value={formFields.address}
          onChange={handleChangeInputField}
        />
        <div className='flex flex-wrap items-center gap-5'>
          <label
            htmlFor='rent'
            className='text-md flex'
          >
            <input
              type='checkbox'
              id='rent'
              className='mr-1'
              checked={formFields.type === 'rent'}
              onChange={handleChangeInputField}
            />
            Rent
          </label>

          <label htmlFor='sell'>
            <input
              type='checkbox'
              id='sell'
              className='mr-1'
              checked={formFields.type === 'sell'}
              onChange={handleChangeInputField}
            />
            Sell
          </label>

          <label htmlFor='parking'>
            <input
              type='checkbox'
              id='parking'
              className='mr-1'
              checked={formFields.parking}
              onChange={handleChangeInputField}
            />
            Parking spot
          </label>

          <label htmlFor='furnished'>
            <input
              type='checkbox'
              id='furnished'
              className='mr-1'
              checked={formFields.furnished}
              onChange={handleChangeInputField}
            />
            Furnished
          </label>

          <div>
            <input
              type='number'
              min={1}
              max={10}
              required
              id='bedrooms'
              className='mr-2 w-16 rounded-lg border border-slate-300 p-2'
              value={formFields.bedrooms}
              onChange={handleChangeInputField}
            />
            <span>Beds</span>
          </div>

          <div>
            <input
              type='number'
              min={1}
              max={5}
              required
              id='bathrooms'
              className='mr-2 w-16 rounded-lg border border-slate-300 p-2'
              value={formFields.bathrooms}
              onChange={handleChangeInputField}
            />
            <span>Bath</span>
          </div>

          <div>
            <input
              type='number'
              id='regularPrice'
              required
              className='mr-2 w-20 rounded-lg border border-slate-300 p-2'
              value={formFields.regularPrice}
              onChange={handleChangeInputField}
            />
            <span>Regular price</span>
          </div>
          <div>
            <input
              type='number'
              id='discountPrice'
              required
              className='mr-2 w-20 rounded-lg border border-slate-300 p-2'
              value={formFields.discountPrice}
              onChange={handleChangeInputField}
            />
            <span>Discount price</span>
          </div>
          <div
            title='Max 6 images'
            className='flex flex-wrap items-center gap-4'
          >
            <input
              ref={inputFileRef}
              hidden
              className='rounded-lg border p-3'
              onChange={handleChangeImages}
              type='file'
              id='images'
              accept='images/*'
              multiple
            />
            <button
              onClick={() => inputFileRef.current.click()}
              type='button'
              className='flex items-center gap-2 rounded-lg px-5 py-4 shadow-md'
            >
              Select images
              <FaCloudUploadAlt />
            </button>
            {formFields.images?.length > 0 && (
              <span className='text-sm text-green-700'>
                Selected {formFields.images.length} files
              </span>
            )}
          </div>
        </div>

        <div className='flex gap-3 '>
          {files.length > 0 &&
            files.map((file, index) => (
              <ListingPreviewImage
                onDelete={() => handleDeleteImage(index)}
                key={index}
                imageUrl={URL.createObjectURL(file)}
              />
            ))}
        </div>

        <button className='max-w-40 rounded-lg bg-slate-700 p-3 uppercase text-white duration-200 hover:opacity-95 disabled:opacity-80'>
          {isLoading ? <Loader /> : 'Create'}
        </button>
        {uploadImageError && (
          <p className='text-center text-sm text-red-500'>{uploadImageError}</p>
        )}
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
};
