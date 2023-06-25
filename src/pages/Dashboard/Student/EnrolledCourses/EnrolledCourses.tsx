import React from "react";
import { useGetEnrolledCoursesForStudentQuery } from "../../../../features/coursesSlice/courseApi";
import EnrolledCourseCard from "./EnrolledCourseCard";
import ComponentLoader from "../../../../components/ComponentLoader";

type Props = {};

const EnrolledCourses = (props: Props) => {
  const {
    data: enrolledCourseData,
    isLoading,
    isError,
  } = useGetEnrolledCoursesForStudentQuery({});
  console.log(enrolledCourseData);
  return (
    <div>
      <div className="title flex items-center justify-between my-2 bg-gray-50 p-3 rounded">
        <h3 className="text-2xl flex items-center gap-2">
          <span className="text-xl">Enrolled Courses</span>
          <span className="text-lg  badge badge-primary badge-lg">
            {enrolledCourseData?.total}
          </span>
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="search"
            className="input input-ghost input-bordered input-md"
            placeholder="Search by Course Name"
          />
        </div>
      </div>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          {enrolledCourseData?.total === 0 ? (
            <div className="text-center text-2xl font-semibold">
              No course enrolled yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {enrolledCourseData?.data?.map((course: any) => (
                  <EnrolledCourseCard key={course?._id} course={course} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EnrolledCourses;
