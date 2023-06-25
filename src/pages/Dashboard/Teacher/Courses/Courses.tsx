import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../../../components/Teacher/Courses/CourseCard";
import AddCourseModal from "./AddCourseModal";
import { useGetCoursesForTeacherQuery } from "../../../../features/coursesSlice/courseApi";
import { useAppContext } from "../../../../context/AppContext";
import ComponentLoader from "../../../../components/ComponentLoader";
import NoDataFound from "../../../../components/ui/NoDataFound";

type Props = {};

function Courses(Props: any) {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  // get all the course
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetCoursesForTeacherQuery(currentUser?._id, { skip: !currentUser });

  return (
    <>
      <AddCourseModal />
      <div>
        <div className="title flex items-center justify-between py-1 my-1">
          <h1>All Courses</h1>
          <label htmlFor="add-course-modal" className="btn btn-primary btn-sm">
            Add New Course
          </label>
        </div>
        <div className="">
          {isLoading ? (
            <ComponentLoader />
          ) : isError ? (
            <div>Something went wrong Sir.</div>
          ) : (
            <>
              {courses?.courses?.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2  gap-3 ">
                  {courses?.courses?.map((item: any) => (
                    <CourseCard key={item?._id} item={item} />
                  ))}
                </div>
              ) : (
                <NoDataFound title={"No Courses Found."} />
              )}
            </>
          )}
        </div>
      </div>

      {/* <div className="h-screen max-w-screen flex justify-center items-center">
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <label
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form onSubmit={handleSubmit(handleData)} className="m-4 ">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Milestone No.</span>
                  </label>
                  <input
                    type="text"
                    {...register("milestone", {
                      required: "Milestone No is required",
                    })}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors?.title && (
<p className="text-red-600">{errors?.title?.message}</p>
)}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Module No.</span>
                  </label>
                  <input
                    type="text"
                    {...register("module", {
                      required: "Module  is required",
                    })}
                    className="input input-bordered w-full max-w-xs "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Serial No</span>
                  </label>
                  <input
                    type="text"
                    {...register("serial", {
                      required: "Serial no  is required",
                    })}
                    className="input input-bordered w-full max-w-xs "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Video Title</span>
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: "Video Title  is required",
                    })}
                    className="input input-bordered w-full max-w-xs "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Video link </span>
                  </label>
                  <input
                    type="text"
                    {...register("link", {
                      required: "Video link   is required",
                    })}
                    className="input input-bordered w-full max-w-xs "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Contest </span>
                  </label>
                  <input
                    type="text"
                    {...register("contest", {
                      required: "Contest   is required",
                    })}
                    className="input input-bordered w-full max-w-xs "
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Quiz </span>
                  </label>
                  <input
                    type="text"
                    {...register("quiz", {
                      required: "Quiz  is required",
                    })}
                    className="input input-bordered w-full max-w-xs "
                  />
                </div>

                <input
                  value="Submit"
                  type="submit"
                  className="bg-emerald-500 my-2 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                />

                {/* <div>{setError && <p className="text-red-600">{error}</p>}</div> */}
      {/* </form>
            </div>
          </div>
        </div>
      </div>  */}
    </>
  );
}

export default Courses;
