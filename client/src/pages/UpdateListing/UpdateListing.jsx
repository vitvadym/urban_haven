import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ListingPreviewImage } from '../../components/ListingPreviewImage/ListingPreviewImage.jsx';
import Loader from '../../components/Loader.jsx';
import axios from 'axios';
// import uploadImages from '../../utils/uploadImages.js';

export const UpdateListing = () => {
  const [images, setImages] = useState([]);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    parking: false,
    furnished: false,
  });

  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listing/get/${params.id}`);
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  const inputFileRef = useRef(null);

  const handleChangeImages = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleChangeInputField = (event) => {
    if (event.target.id === 'rent' || event.target.id === 'sell') {
      setFormData({
        ...formData,
        type: event.target.id,
      });
    } else if (event.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked,
      });
    } else if (event.target.type === 'number') {
      setFormData({
        ...formData,
        [event.target.id]: +event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleImagesUpoad = async () => {
    try {
      setIsUploading(true);
      // const urls = await uploadImages(images);
      const urls = [];

      if (urls.length > 0 && urls) {
        setFormData({
          ...formData,
          images: [...formData.images, ...urls],
        });
      }
    } catch (error) {
      setUploadImageError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      if (formData.images?.length < 1) {
        return setUploadImageError('Please upload at least 1 image');
      }
      await axios.post(`/api/listing/update/${params.id}`, {
        ...formData,
        userRef: user._id,
      });

      navigate('/my-listings');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    if (images.length > 0) {
      handleImagesUpoad();
    }
  }, [images]);

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <h1 className='mb-4 text-center text-4xl font-medium'>
        Update a listing
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
          value={formData.name}
          onChange={handleChangeInputField}
        />
        <textarea
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-md'
          placeholder='Description'
          required
          id='description'
          value={formData.description}
          onChange={handleChangeInputField}
        />
        <input
          className='rounded-lg border p-3 outline-none duration-300 focus:shadow-md'
          type='text'
          placeholder='Adress'
          required
          id='address'
          value={formData.address}
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
              checked={formData.type === 'rent'}
              onChange={handleChangeInputField}
            />
            Rent
          </label>

          <label htmlFor='sell'>
            <input
              type='checkbox'
              id='sell'
              className='mr-1'
              checked={formData.type === 'sell'}
              onChange={handleChangeInputField}
            />
            Sell
          </label>

          <label htmlFor='parking'>
            <input
              type='checkbox'
              id='parking'
              className='mr-1'
              checked={formData.parking}
              onChange={handleChangeInputField}
            />
            Parking spot
          </label>

          <label htmlFor='furnished'>
            <input
              type='checkbox'
              id='furnished'
              className='mr-1'
              checked={formData.furnished}
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
              value={formData.bedrooms}
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
              value={formData.bathrooms}
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
              value={formData.regularPrice}
              onChange={handleChangeInputField}
            />
            <span>Regular price</span>
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
            {formData.images.length > 0 && (
              <span className='text-sm text-green-700'>
                Selected {images.length} files
              </span>
            )}
          </div>
        </div>

        {!isUploading ? (
          <div className='flex gap-3 '>
            {formData.images?.length > 0 &&
              formData.images?.map((imageUrl, index) => (
                <ListingPreviewImage
                  onDelete={() => handleDeleteImage(index)}
                  key={index}
                  imageUrl={imageUrl}
                />
              ))}
          </div>
        ) : (
          <Loader />
        )}

        <button className='max-w-40 rounded-lg bg-slate-700 p-3 uppercase text-white duration-200 hover:opacity-95 disabled:opacity-80'>
          {isLoading ? <Loader /> : 'Update'}
        </button>
        {uploadImageError && (
          <p className='text-center text-sm text-red-500'>{uploadImageError}</p>
        )}
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
};
