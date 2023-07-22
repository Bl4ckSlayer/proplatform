import React, { useEffect, useState } from "react";
import { useCreateCourseMutation, useGetAllEnrolledStudentsQuery } from "../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { GiCoinsPile } from "react-icons/gi";

type Props = {};

const NotificationModal = (props: Props) => {
      // keyword state
  const [keyword, setKeyword] = useState("");
  // by course
  const [course, setCourse] = useState("");
  // by batch name
  const [batch, setBatch] = useState("");
  // by section name
  const [section, setSection] = useState("");
  const [student, setStudent] = useState("");
  // get api for add course
  const [createCourse, { isLoading, data, error, isSuccess }] =
    useCreateCourseMutation();
    const {
        data: students,
       
      } = useGetAllEnrolledStudentsQuery({
        courseId: course,
        sectionName: section,
        batchName: batch,
        keyword,
      });
      console.log(students)
  // get hook form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  // handle submit form
  const handleAddNotification = handleSubmit(async (data: any) => {
    console.log(data)
    // await createCourse(data);
  });

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Hurray!! Brand new course created successfully done.`);
      reset();
    }
    if (error) {
      toast.error(`something went wrong`);
      console.log(error);
    }
  }, [isSuccess, error, data]);
  return (
    <form onSubmit={handleAddNotification}>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-notification-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-notification-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Notification</span>
          </h3><div className="form-control">
              <label className="label">
                <span className="label-text">Notification type</span>
              </label>
              <select
                className="select select-bordered w-full "
                {...register("nType", { required: true })}
              >
                <option>Announcement</option>
                <option>Assignment</option>
               
              </select>
              {errors.nType && (
                  <span className="text-red-500 text-sm ">
                    Notification type is required
                  </span>
                )}
            </div>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Notification Title </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("nTitle", {
                  required: true,
                })}
              />
              {errors.nTitle && (
                  <span className="text-red-500 text-sm ">
                    Notification Title is required
                  </span>
                )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Notification Description.</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                {...register("nDescription")}
              ></textarea>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Announcement or Assignment Link</span>
              </label>
              <input
                type="url"
                {...register("nLink")}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Batch</span>
              </label>
              <select              
              id="batch"
              className="select select-bordered w-full border-primary focus:border-primary"
              value={batch}
              {...register("batch")}
              onChange={(e) => setBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              
              {students?.filterData?.batches?.map((batch: any) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
            </div>
           
           
            
            
            <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="section">
                  Section 
                </label>
                <select
                  id="section"
                  {...register("section")}
                  className="select select-bordered w-full border-primary focus:border-primary"
                  value={section}
              onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">Select Section</option>
              
                  {students?.filterData?.sections?.map((section: any) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
                </select>
                {errors.section && (
                  <span className="text-red-500 text-sm ">
                    Section is required
                  </span>
                )}
              </div>
            <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="section">
                  Select  Student 
                </label>
                <select
                  id="section"
                  {...register("student", )}
                  className="select select-bordered w-full border-primary focus:border-primary"
                  value={student}
              onChange={(e) => setStudent(e.target.value)}
                >
                  <option value="">Select Student </option>
                  <option value="All">All </option>
                
                  {students?.data?.map((student: any) => (
                <option key={student?._id} value={student?._id}>
                  {student?.name} id :{student?.studentId}
                </option>
              ))}
                </select>
                {errors.section && (
                  <span className="text-red-500 text-sm ">
                    Section is required
                  </span>
                )}
              </div>
            
           
            <div className="form-control mt-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : " Add Course"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NotificationModal;
