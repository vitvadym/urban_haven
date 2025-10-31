import { imagekit } from '../config/imagekit.config.js';

const uploadAssets = async (files, folder) => {
  try {
    const uploadPromises = files.map((file) =>
      imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: folder,
      }),
    );

    const response = await Promise.all(uploadPromises);
    return response;
  } catch (error) {
    throw new Error(`Error uploading assets: ${error.message}`);
  }
};

export default uploadAssets;
