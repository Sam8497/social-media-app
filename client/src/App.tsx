import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./pages/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound/NotFound";


const App: React.FC = () => {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Explore = lazy(() => import("./pages/Explore/Explore"));
  const Notifications = lazy(
    () => import("./pages/Notifications/Notifications")
  );
  const BookMarks = lazy(() => import("./pages/BookMarks/BookMarks"));
  const Settings = lazy(() => import("./pages/Settings/Settings"));
  const Auth = lazy(() => import("./pages/Auth/Auth"));
  const Profile = lazy(() => import("./pages/Profile/Profile"));
  const Search = lazy(() => import("./pages/Search/Search"))
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile/:profileid" element={<Profile />} />
          <Route path="/search/:postname" element={<Search />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default App;
