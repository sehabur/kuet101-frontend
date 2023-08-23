import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { grey, red } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Typography } from '@mui/material';

const ImageUploader = ({ getImageFiles }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    setSelectedImages([...selectedImages, ...acceptedFiles]);
  };

  const handleDeleteImage = (indexToRemove) => {
    setSelectedImages(
      selectedImages.filter((item, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    getImageFiles(selectedImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImages]);

  return (
    <Box>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />

        <Box
          sx={{
            border: `1px dashed ${grey[500]}`,
            bgcolor: grey[50],
            borderRadius: 1,
            textAlign: 'center',
            py: 2,
          }}
        >
          {isDragActive ? (
            <Typography>Drop the files here...</Typography>
          ) : (
            <Typography>
              Drag and drop some files here or click to select files
            </Typography>
          )}
        </Box>
      </Box>
      {selectedImages.length > 0 && (
        <Box
          sx={{
            border: `1px solid ${grey[300]}`,
            bgcolor: grey[200],
            borderRadius: 1,
            pt: 1,
            my: 2,
            textAlign: 'center',
          }}
        >
          <Typography gutterBottom variant="body2" color="text.secondary">
            Selected Images:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedImages.map((file, index) => (
              <Box key={index} sx={{ mx: 1, my: 1 }}>
                <Box sx={{ width: 120, height: 110 }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`${index}`}
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <IconButton onClick={() => handleDeleteImage(index)}>
                    <DeleteOutlineIcon sx={{ color: red[400] }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
