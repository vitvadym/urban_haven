import { useState } from "react";

/* eslint-disable react/prop-types */
const ImageGrid = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg flex flex-1">
        <img
          src={images[currentImageIndex]}
          alt="Main Listing Image"
          className="w-full object-cover"
        />
      </div>
      {images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((url, index) => (
            <div key={url} onClick={() => setCurrentImageIndex(index)} className="overflow-hidden rounded-lg flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28">
              <img
                src={url}
                alt="Listing Thumbnail"
                className={`w-full h-full object-cover ${index === currentImageIndex ? 'opacity-40' : ''}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGrid;
