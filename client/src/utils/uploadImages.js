import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const uploadImages = async (files) => {
  const imagesUrl = [];
  if (files.length && files.length < 7) {
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve(url);
            });
          },
        );
      });
    });

    return Promise.all(promises).then((urls) => {
      imagesUrl.push(...urls);
      return imagesUrl;
    });
  }
  return imagesUrl;
};

export default uploadImages;
