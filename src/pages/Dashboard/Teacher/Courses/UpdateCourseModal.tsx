import React, { useEffect } from "react";
import { useCreateCourseMutation, useEditCourseMutation } from "../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {  course: any;};

const UpdateCourseModal = (   { course }: Props) => {  
    console.log(course._id)
    const [EditCourse,isSuccess] =
    useEditCourseMutation();
 console.log(EditCourse)
  // get hook form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  // handle submit form
  const handleAddCourse = handleSubmit(async (data: any) => {
    const newData={...data,id: course._id}
    console.log(newData)
    // console.log(data)
    await EditCourse(newData);
    // reset()
  });

  // handle error and success
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(`Hurray!! Brand new course created successfully done.`);
//       reset();
//     }
//     // if (error) {
//     //   toast.error(`something went wrong`);
//     //   console.log(error);
//     // }
//   }, [isSuccess]);
  return (
    <form onSubmit={handleAddCourse}>
     
      <input type="checkbox" id="add-course-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-course-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">update  Course</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course name.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("courseName", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Description.</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                {...register("description", { required: true })}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Image.</span>
              </label>
              <input
                type="url"
                {...register("image", { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Price.</span>
              </label>
              <input
                type="text"
                {...register("price", { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Category.</span>
              </label>
              <select
                className="select select-bordered w-full "
                {...register("category", { required: true })}
              >
                <option>Web Development</option>
                <option>Personal Development</option>
                <option>Programming</option>
                <option>Mobile Development</option>
                <option>UI/UX Design</option>
                <option>Game Development</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Level.</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("level", { required: true })}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Language.</span>
              </label>
              <select
                className="select select-bordered w-full "
                {...register("language", { required: true })}
              >
                <option>English</option>
                <option>Bangla</option>
                <option>Arabic</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Duration.</span>
              </label>
              <input
                type="text"
                {...register("duration", { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Requirements.</span>
              </label>
              <textarea
                {...register("requirements", { required: true })}
                className="textarea h-24 textarea-bordered"
              ></textarea>
            </div>
            <div className="form-control mt-3">
              <button
                className="btn btn-primary"
                type="submit"
               
                // disabled={isLoading}
              > update
                {/* {isLoading ? "Loading..." : " Add Course"} */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateCourseModal;
