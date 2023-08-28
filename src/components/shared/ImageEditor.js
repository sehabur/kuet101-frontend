import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';

import { Box, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { compressImageFile } from '../../helper';
import { grey, red } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ImageEditor = ({
  prevImageUrl,
  imageEditorCallback,
  imageHeight,
  imageWidth,
}) => {
  const [isNewImgSelected, setIsNewImgSelected] = useState(false);

  const handleDeletProfilePhoto = () => {
    imageEditorCallback(null);
  };

  const getImageFileObject = async ({ file }) => {
    setIsNewImgSelected(true);

    const compressedFile = await compressImageFile(file, 0.08);
    imageEditorCallback(compressedFile);
  };

  const runAfterImageDelete = (file) => {
    setIsNewImgSelected(false);
    imageEditorCallback(null);
  };

  return (
    <>
      {prevImageUrl && !isNewImgSelected && (
        <Box sx={{ position: 'relative', mb: 1 }}>
          <Box>
            <img
              src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${prevImageUrl}`}
              alt="pro pic"
              height={`${imageHeight}`}
              width={`${imageWidth}`}
              style={{ borderRadius: 12 }}
            />
          </Box>
          <IconButton
            onClick={handleDeletProfilePhoto}
            sx={{ position: 'absolute', top: 0, left: 2, py: 0.2 }}
          >
            <DeleteOutlineIcon
              sx={{
                color: grey[200],
                bgcolor: red[400],
                borderRadius: '50%',
                fontSize: '2.4rem',
                mr: 1.5,
                mt: 1,
                p: 0.5,
              }}
            />
          </IconButton>
        </Box>
      )}

      <ImageUploader
        onFileAdded={(img) => getImageFileObject(img)}
        onFileRemoved={(img) => runAfterImageDelete(img)}
        style={{
          height: isNewImgSelected ? imageHeight : 0,
          width: isNewImgSelected ? imageWidth : 230,
          background: 'transparent',
          borderRadius: 12,
        }}
        deleteIcon={
          <DeleteOutlineIcon
            sx={{
              display: `${!isNewImgSelected && 'none'}`,
              color: grey[200],
              bgcolor: red[400],
              borderRadius: '50%',
              fontSize: '2.4rem',
              mr: 1.5,
              mt: 1,
              p: 0.5,
            }}
          />
        }
        uploadIcon={
          <AddPhotoAlternateIcon
            sx={{
              display: `${isNewImgSelected && 'none'}`,
              fontSize: '5rem',
              border: `1px solid ${grey[300]}`,
              borderRadius: 1.5,
              p: 1,
              mt: -1,
              ml: -12,
              ':hover': {
                color: 'secondary.light',
              },
            }}
            color="info"
          />
        }
      />
    </>
  );
};

export default ImageEditor;
