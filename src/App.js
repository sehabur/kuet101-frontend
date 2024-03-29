import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import ReactGA from "react-ga";

import LayoutWithHeader from "./LayoutWithHeader";
import theme from "./context/theme";
import store from "./store";
import Homepage from "./pages/Homepage";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import FindYourMates from "./pages/FindYourMates";
import AlumniDetails from "./pages/profile/AlumniDetails";
import SearchAlumni from "./pages/SearchAlumni";

import FindTutor from "./pages/tutor/FindTutor";
import EnrollForTutor from "./pages/tutor/EnrollForTutor";
import TutionEnrollmentByUser from "./pages/tutor/TutionEnrollmentByUser";

import FindTolet from "./pages/tolet/FindTolet";
import EnrollForTolet from "./pages/tolet/EnrollForTolet";
import ToletEnrollmentByUser from "./pages/tolet/ToletEnrollmentByUser";
import EditProfile from "./pages/profile/EditProfile";
import ManagePassword from "./pages/auth/ManagePassword";
import CreatePost from "./pages/posts/CreatePost";
import ViewAllPosts from "./pages/posts/ViewAllPosts";
import PostDetails from "./pages/posts/PostDetails";
import AllPostsByUser from "./pages/posts/AllPostsByUser";
import Learning from "./pages/learning/Learning";
import LearningFileExplorer from "./pages/learning/LearningFileExplorer";
import Gallery from "./pages/gallery/Gallery";
import AddGalleryPhoto from "./pages/gallery/AddGalleryPhoto";
import Blood from "./pages/Blood";
import About from "./pages/About";
import AdminLayout from "./AdminLayout";
import Users from "./pages/admin/Users";
import UserDetails from "./pages/admin/UserDetails";
import Dashboard from "./pages/admin/Dashboard";
import EditPost from "./pages/posts/EditPost";
import Posts from "./pages/admin/Posts";
import GalleryAdmin from "./pages/admin/Gallery";
import CreateDonation from "./pages/tryAdmin/donation/CreateDonation";
import DonationDetails from "./pages/tryAdmin/donation/DonationDetails";
import ViewAllDonation from "./pages/tryAdmin/donation/ViewAllDonation";
import ViewAllActiveDonor from "./pages/tryAdmin/activeDonor/ViewAllActiveDonor";
import CreateActiveDonor from "./pages/tryAdmin/activeDonor/CreateActiveDonor";

import TryHomepage from "./pages/try/Homepage";

ReactGA.initialize("G-W5L8XBNGWZ");

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

                <Route path="tolet/">
                  <Route path="find" element={<FindTolet />} />
                  <Route path="enroll" element={<EnrollForTolet />} />
                  <Route
                    path="my-enrollment/:id"
                    element={<ToletEnrollmentByUser />}
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

                <Route path="try/">
                  <Route path="" element={<TryHomepage />} />
                  <Route path="donation/:id" element={<DonationDetails />} />
                  <Route path="edit/:id" element={<EditProfile />} />
                </Route>

                <Route path="aboutus" element={<About />} />
              </Route>

              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="manage-password/:type"
                element={<ManagePassword />}
              />

              <Route path="admin/" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="all-users" element={<Users />} />
                <Route path="user-profile" element={<UserDetails />} />
                <Route path="all-posts" element={<Posts />} />
                <Route path="post-details/:id" element={<PostDetails />} />
                <Route path="gallery" element={<GalleryAdmin />} />
              </Route>

              <Route path="try-admin/" element={<AdminLayout />}>
                <Route path="donation/">
                  <Route path="" element={<ViewAllDonation />} />
                  <Route path=":id" element={<DonationDetails />} />
                  <Route path="create" element={<CreateDonation />} />
                </Route>
                <Route path="active-donor/">
                  <Route path="" element={<ViewAllActiveDonor />} />
                  <Route path="create" element={<CreateActiveDonor />} />
                </Route>

                <Route path="allActiveDonors" element={<Dashboard />} />
                <Route path="createActiveDonors" element={<UserDetails />} />

                <Route path="allSpecialDonation" element={<Dashboard />} />
                <Route path="specialDonation/:id" element={<Dashboard />} />

                <Route path="allRecurringDonation" element={<Dashboard />} />
                <Route path="recurringDonation/:id" element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
