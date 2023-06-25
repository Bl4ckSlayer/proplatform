import React, { useEffect } from "react";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";
import ContentList from "./ContentList";
import AddMilestoneModal from "./modals/AddMilestoneModal";
import AddModuleModal from "./modals/AddModuleModal";
import AddVideoModal from "./modals/AddVideoModal";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetCourseByTeacherQuery,
} from "../../../../../features/coursesSlice/courseApi";
import ScreenLoader from "../../../../../components/ScreenLoader";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EnrolledStudents from "./EnrolledStudents/EnrolledStudents";
import AddAssignmentModal from "./modals/AddAssignmentModal";

const CourseDetails = () => {
  const navigate = useNavigate();
  // get id from url
  const { courseId } = useParams();
  // get single course
  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useGetCourseByTeacherQuery<any>(courseId);

  const [DeleteCourse, { isLoading: deleteLoading, isSuccess }] =
    useDeleteCourseMutation();

  // delete course
  const deleteCourse = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? Note: you can lost your all students and course content as well."
      )
    ) {
      await DeleteCourse(courseId);
    }
  };

  // handle error
  useEffect(() => {
    if (isSuccess) {
      navigate("/teacher/dashboard/courses");
    }
  }, [isSuccess]);

  if (isLoading) return <ScreenLoader />;
  if (isError) return <>{error?.message}</>;
  return (
    <div>
      {/* add module modal */}
      <AddModuleModal course={course?.course} key={course?._id} />
      {/* add video modal */}
      <AddVideoModal course={course?.course} key={course?._id} />
      <AddAssignmentModal course={course?.course} key={course?._id} />
      {/* course info */}
      <div className="course-info ">
        <div className=" cover-image h-60 border-5 rounded-t-lg rounded-r-lg  p-10 flex flex-col justify-end  pb-4 relative ">
          <img
            src={
              course?.course?.image ||
              "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1264474/retina_1708x683_cover-0325-LearnCandC__Languages_Dan_Newsletter-743100f051077054fa1cc613ff4523a2.png"
            }
            alt={course?.course?.courseName}
            className="absolute w-full h-full left-0 top-0 object-cover"
          />
          <div className="overlay bg-gradient-to-t to-[#ffffff06] from-[#fff] w-full h-full absolute left-0 top-0 z-0"></div>
          <div className="flex items-center justify-between">
            <div className="info z-10 ">
              <h3 className="text-xl font-poppins text-black ">
                {course?.course?.courseName}
              </h3>
              <div className="meta flex items-center gap-2 mt-4 text-sm">
                <div className="flex flex-col gap-1 p-2 px-3 rounded bg-slate-50">
                  Duration
                  <span>{course?.course?.duration}</span>
                </div>
                <div className="flex flex-col gap-1 p-2 px-3 rounded bg-slate-50">
                  Enrolled Students
                  <span>{course?.course?.students?.length}</span>
                </div>
                <div className="flex flex-col gap-1 p-2 px-3 rounded bg-slate-50">
                  Milestone <span>{course?.course?.milestones?.length}</span>
                </div>
                <div className="flex flex-col gap-1 p-2 px-3 rounded bg-slate-50">
                  Modules <span>{course?.course?.modules?.length}</span>
                </div>

                <div className="flex flex-col gap-1 p-2 px-3 rounded bg-slate-50">
                  Videos <span>{course?.course?.videos?.length}</span>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className=" m-1 cursor-pointer btn btn-ghost btn-circle btn-active"
              >
                <BiDotsVertical size={30} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="" className="p-1 px-3">
                    Muted
                  </a>
                </li>
                <li>
                  <a href="" className="p-1 px-3">
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="p-1 px-3"
                    onClick={() => deleteCourse()}
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {/* add items part */}
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="add-milestone-modal"
            className="btn btn-primary btn-sm"
          >
            Add Milestone
          </label>
          <label htmlFor="add-module-modal" className="btn btn-primary btn-sm">
            Add Module
          </label>
          <label htmlFor="add-video-modal" className="btn btn-primary btn-sm">
            Add Video
          </label>
          <label
            htmlFor="add-assignment-modal"
            className="btn btn-primary btn-sm"
          >
            Add Assignment
          </label>
        </div>
      </div>
      {/* course details tab */}
      <Tabs>
        <TabList>
          <Tab>Course Content</Tab>
          <Tab>Enrolled Students</Tab>
        </TabList>

        <TabPanel>
          {/* list of milestone module and videos */}
          <ContentList courseId={courseId} course={course?.course} />
        </TabPanel>
        <TabPanel>
          <EnrolledStudents course={course?.course} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CourseDetails;
