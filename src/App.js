import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import theme from './context/theme';
import Header from './components/shared/Header';
import Homepage from './pages/Homepage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWithHeader from './LayoutWithHeader';
import EventLists from './pages/EventLists';
import EventDetails from './pages/EventDetails';
import FindYourMates from './pages/FindYourMates';
import AlumniDetails from './pages/AlumniDetails';
import { Provider } from 'react-redux';
import store from './store';
import SearchAlumni from './pages/SearchAlumni';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth={false} disableGutters>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LayoutWithHeader />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/allEvents" element={<EventLists />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/findYourMates" element={<FindYourMates />} />
                <Route path="/alumniDetails/:id" element={<AlumniDetails />} />
                <Route path="/searchAlumni" element={<SearchAlumni />} />

                {/* <Route path="/allStories" element={<StoryLists />} />
              <Route path="/stories/:id" element={<StoryDetails />} /> */}
              </Route>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
