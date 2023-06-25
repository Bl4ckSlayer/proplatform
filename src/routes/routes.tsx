import { createBrowserRouter, Link } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home";
import Courses from "../pages/courses/Courses";
import CoursePlayer from "../pages/courses/CoursePlayer/CoursePlayer";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import StudentOverview from "../pages/Dashboard/Student/Overview/Overview";
import EditCourses from "../pages/Dashboard/Teacher/EditCourses/EditCourses";
import CourseDetails from "../pages/Dashboard/Teacher/Courses/course-details/CourseDetails";
import TeacherCourses from "../pages/Dashboard/Teacher/Courses/Courses";
import AuthGuard from "../guard/AuthGuard";
import Assignments from "../pages/Dashboard/Teacher/Assignments/Assignments";
import Quizzes from "../pages/Dashboard/Teacher/Quizzes/Quizzes";
import Students from "../pages/Dashboard/Teacher/Students/Students";
import Profile from "../pages/Dashboard/Profile/Profile";
import Settings from "../pages/Dashboard/Settings/Settings";
import Messages from "../pages/Dashboard/Teacher/Messages/Messages";
import EnrolledCourses from "../pages/Dashboard/Student/EnrolledCourses/EnrolledCourses";
import Notifications from "../pages/Dashboard/Student/Notifications/Notifications";
import TeacherGuard from "../guard/TeacherGuard";
import StudentGuard from "../guard/StudentGuard";
import StudentDetails from "../components/Student/StudentDetails/StudentDetails";
import TeacherOverview from "../pages/Dashboard/Teacher/Overview/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "courses",
    element: <Courses />,
  },
  {
    path: "course/player/:courseId",
    element: <CoursePlayer />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register/:role",
    element: <Register />,
  },
  {
    path: "about",
    element: (
      <AuthGuard>
        <div>About</div>
      </AuthGuard>
    ),
  },
  // dashboard layout routes
  {
    path: "teacher/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "", element: <TeacherOverview /> },
      {
        path: "courses",
        element: <TeacherCourses />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },

      {
        path: "quizzes",
        element: <Quizzes />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  // for student
  {
    path: "student/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "", element: <StudentOverview /> },
      {
        path: "enrolled-courses",
        element: <EnrolledCourses />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
