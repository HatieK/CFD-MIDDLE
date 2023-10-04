import MainLayout from "./layouts/MainLayout";
import PageNotFound from "./pages/404";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import CourseOrder from "./pages/CourseOrder";
import HomePage from "./pages/HomePage";
import StudentProfile from "./pages/StudentProfile";
import Payment from "./pages/Payment";
import Privacy from "./pages/Privacy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyInfo from "./pages/StudentProfile/MyInfo";
import MyPayment from "./pages/StudentProfile/MyPayment";
import MyCourse from "./pages/StudentProfile/MyCourse";
import { PATHS } from "./constants/path";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      {/* <MainLayout> */}

      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.COURSE.INDEX} element={<Course />} />
          <Route path={PATHS.COURSE.DETAIL} element={<CourseDetail />} />
          <Route path={PATHS.BLOG.INDEX} element={<Blog />} />
          <Route path={PATHS.BLOG.DETAIL} element={<BlogDetail />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path={PATHS.CONTACT} element={<Contact />} />
          <Route path={PATHS.PRIVACY} element={<Privacy />} />

          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.COURSE.ORDER} element={<CourseOrder />} />
            <Route path={PATHS.PROFILE.INDEX} element={<StudentProfile />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
            </Route>
          </Route>

          <Route path={PATHS.PAYMENT} element={<Payment />} />
          <Route path={PATHS.NOTFOUND} element={<PageNotFound />} />
        </Route>
      </Routes>
      {/* </MainLayout> */}
    </BrowserRouter>
  );
}

export default App;
