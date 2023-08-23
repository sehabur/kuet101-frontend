import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';

import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { compressImageFile } from '../../helper';
import { grey, red } from '@mui/material/colors';

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
        <>
          <Box>
            <img
              src={`${process.env.REACT_APP_CLOUD_IMAGE_URL}/${prevImageUrl}`}
              alt="pro pic"
              height={`${imageHeight}`}
              width={`${imageWidth}`}
              style={{ borderRadius: 12 }}
            />
          </Box>
          <Button
            component="div"
            variant="outlined"
            onClick={handleDeletProfilePhoto}
            sx={{ py: 0.2 }}
          >
            Delete photo
          </Button>
        </>
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
              display: ` ${!isNewImgSelected && 'none'}`,
              color: grey[200],
              bgcolor: red[400],
              fontSize: '1.8rem',
            }}
          />
        }
        uploadIcon={
          <Button
            sx={{
              display: ` ${isNewImgSelected && 'none'}`,
              color: 'primary.main',
              ml: -7,
              py: 0.2,
            }}
            component="p"
            variant="outlined"
          >
            Upload new photo
          </Button>
        }
      />
    </>
  );
};

export default ImageEditor;
