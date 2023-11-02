import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import LayoutWithHeader from './LayoutWithHeader';
import theme from './context/theme';
import store from './store';
import Homepage from './pages/Homepage';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import FindYourMates from './pages/FindYourMates';
import AlumniDetails from './pages/profile/AlumniDetails';
import SearchAlumni from './pages/SearchAlumni';
import FindTutor from './pages/tutor/FindTutor';
import EnrollForTutor from './pages/tutor/EnrollForTutor';
import EditProfile from './pages/profile/EditProfile';
import ManagePassword from './pages/auth/ManagePassword';
import CreatePost from './pages/posts/CreatePost';
import ViewAllPosts from './pages/posts/ViewAllPosts';
import PostDetails from './pages/posts/PostDetails';
import AllPostsByUser from './pages/posts/AllPostsByUser';
import TutionEnrollmentByUser from './pages/tutor/TutionEnrollmentByUser';
import Learning from './pages/learning/Learning';
import LearningFileExplorer from './pages/learning/LearningFileExplorer';
import Gallery from './pages/gallery/Gallery';
import AddGalleryPhoto from './pages/gallery/AddGalleryPhoto';
import Blood from './pages/Blood';
import About from './pages/About';
import AdminLayout from './AdminLayout';
import Users from './pages/admin/Users';
import UserDetails from './pages/admin/UserDetails';
import Dashboard from './pages/admin/Dashboard';
import EditPost from './pages/posts/EditPost';
import Posts from './pages/admin/Posts';
import GalleryAdmin from './pages/admin/Gallery';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth={false} disableGutters>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LayoutWithHeader />}>
                <Route path="" element={<Homepage />} />
                <Route path="search-alumni" element={<SearchAlumni />} />
                <Route path="find-your-mates" element={<FindYourMates />} />

                <Route path="search-blood" element={<Blood />} />

                <Route path="learning/">
                  <Route path="" element={<Learning />} />
                  <Route path=":category" element={<LearningFileExplorer />} />
                </Route>

                <Route path="gallery/">
                  <Route path="" element={<Gallery />} />
                  <Route path="add-photo" element={<AddGalleryPhoto />} />
                </Route>

                <Route path="tutor/">
                  <Route path="find" element={<FindTutor />} />
                  <Route path="enroll" element={<EnrollForTutor />} />
                  <Route
                    path="my-enrollment/:id"
                    element={<TutionEnrollmentByUser />}
                  />
                </Route>

                <Route path="posts/">
                  <Route path="" element={<ViewAllPosts />} />
                  <Route path=":id" element={<PostDetails />} />
                  <Route path="edit/:id" element={<EditPost />} />
                  <Route path="create" element={<CreatePost />} />
                  <Route path="my-posts/:id" element={<AllPostsByUser />} />
                </Route>

                <Route path="profile/">
                  <Route path=":id" element={<AlumniDetails />} />
                  <Route path="edit/:id" element={<EditProfile />} />
                </Route>

                <Route path="aboutus" element={<About />} />
              </Route>

              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/manage-password/:type"
                element={<ManagePassword />}
              />

              <Route path="/admin/" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="all-users" element={<Users />} />
                <Route path="user-profile" element={<UserDetails />} />
                <Route path="all-posts" element={<Posts />} />
                <Route path="post-details/:id" element={<PostDetails />} />
                <Route path="gallery" element={<GalleryAdmin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
