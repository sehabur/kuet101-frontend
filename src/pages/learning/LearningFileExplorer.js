/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FolderIcon from '@mui/icons-material/Folder';
import { blueGrey, grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const LearningFileExplorer = () => {
  const categoryMap = [
    {
      category: 'bcs',
      title: 'BCS study',
    },
    {
      category: 'dept',
      title: 'Departmental study',
    },
    {
      category: 'higherStudy',
      title: 'Higher study',
    },
  ];
  const { category } = useParams();

  const pageTitle = categoryMap.find(
    (item) => item.category === category
  ).title;

  const navigate = useNavigate();

  const learningData = useSelector((state) => state.learning);

  const [currentData, setCurrentData] = useState(learningData);

  const [currentFolders, setCurrentFolders] = useState(null);

  const [itemsInTree, setItemsInTree] = useState([]);

  const [isFileType, setIsFileType] = useState(false);

  const getCurrentFolders = (data) => {
    const items = data?.map((content) => {
      if (content.type === 'file') {
        setIsFileType(true);
        return {
          title: content.name,
          url: content.url,
        };
      } else {
        return content.name;
      }
    });
    setCurrentFolders(items);
  };

  console.log(currentData, currentFolders, itemsInTree);

  const getCurrentData = (name) => {
    const newData = currentData.filter((content) => content.name === name)[0]
      .contents;
    setItemsInTree((prevState) => {
      return [...prevState, name];
    });
    setCurrentData(newData);
    getCurrentFolders(newData);
  };

  useEffect(() => {
    getCurrentFolders(learningData);
  }, []);

  const handleItemClick = (itemName) => {
    getCurrentData(itemName);
  };

  const handleBackPress = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ py: 2, bgcolor: 'secondary.dark' }}>
        <Box
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, sm: 0 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography sx={{ color: grey[100], fontSize: '1.6rem' }}>
            Learning Hub
          </Typography>
          <Typography sx={{ mt: 1, fontSize: '1rem', color: grey[400] }}>
            {pageTitle}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '800px', mx: 'auto', my: 4, px: 2 }}>
        <Button
          onClick={handleBackPress}
          startIcon={<KeyboardBackspaceIcon color="primary" />}
        >
          Back to category
        </Button>

        <Breadcrumbs sx={{ ml: 2, my: 2 }}>
          <Typography>{pageTitle}</Typography>
          {itemsInTree.map((item) => (
            <Typography>{item}</Typography>
          ))}
        </Breadcrumbs>

        {currentFolders?.map((item) => (
          <>
            {isFileType ? (
              <ListItem
                component={RouterLink}
                to={item.url}
                target="_blank"
                sx={{
                  ':hover': {
                    textDecoration: 'underline',
                  },
                  mb: 1,
                }}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ) : (
              <Card
                sx={{
                  width: 300,
                  my: 4,
                  bgcolor: blueGrey[50],
                  borderRadius: 3,
                }}
                elevation={0}
              >
                <CardActionArea onClick={() => handleItemClick(item)}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <FolderIcon
                      sx={{
                        color: grey[700],
                        ml: 2,
                        mr: 3,
                        fontSize: '1.6rem',
                      }}
                    />
                    <Typography sx={{ color: grey[900] }}>{item}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};

export default LearningFileExplorer;
