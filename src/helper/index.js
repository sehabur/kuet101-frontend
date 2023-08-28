import imageCompression from 'browser-image-compression';

export const compressImageFile = async (imageFile, maxImageSizeMb) => {
  const compressedFile = await imageCompression(imageFile, {
    maxSizeMB: maxImageSizeMb,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  });
  return compressedFile;
};
