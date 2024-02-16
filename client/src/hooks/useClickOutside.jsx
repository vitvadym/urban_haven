import { useEffect, useRef, useState } from 'react';

const useClickOutside = (initValue) => {
  const [isShow, setIsShow] = useState(initValue);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return { ref, isShow, setIsShow };
};

export default useClickOutside;
