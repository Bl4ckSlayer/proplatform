import React, { useEffect, useState } from "react";
import {
  useAddAssignmentToModuleMutation,
  useAddVideoToModuleMutation,
  useGetMilestoneByCourseQuery,
  useGetModuleByMilestoneQuery,
  useGetModulesByCourseQuery,
} from "../../../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
type Props = {
  course: any;
};
const AddAssignmentModal = ({ course }: Props) => {
  // local state for
  const [selectedModule, setSelectedModule] = useState([]);
  // get milestone and modules hook here
  const { data: milestones } = useGetMilestoneByCourseQuery(course?._id);
  const { data: modules } = useGetModulesByCourseQuery(course?._id);

  // get hook form
  const { handleSubmit, register, reset, watch } = useForm();

  const milestone = watch("milestoneId");

  // get hook from rtk to save video
  const [SaveAssignment, { isLoading, isError, isSuccess, error }] =
    useAddAssignmentToModuleMutation();
  const handleAddVideo = handleSubmit(async (data) => {
    console.log(data);
    const file = data.file[0];
    let formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        console.log(response.data.data);
        // const { milestoneId, ...other } = data;
        toast.success(response.data?.message);
        await SaveAssignment({
          body: {
            courseId: course?._id,
            milestoneId: data?.milestoneId,
            moduleId: data?.moduleId,
            name: data?.name,
            description: data?.description,
            pdf: response.data?.data,
          },
        });
      } else {
        toast.error(response.data?.error);
      }
    } catch (error) {
      //   toast.error(error?.response?.data?.error, { id: toastId });
    } finally {
    }
  });

  // filter module
  useEffect(() => {
    const selected = modules?.modules.filter(
      (item: any) => item?.milestoneId === milestone
    );
    setSelectedModule(selected);
  }, [milestone]);

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Video added successfully done.`);
      reset();
    }
    if (isError) {
      console.log(error);
      toast.error(`Error occur`);
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={handleAddVideo}>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="add-assignment-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-assignment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Assignment</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone List.</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("milestoneId")}
              >
                <option value={""} hidden>
                  select milestone
                </option>
                {milestones?.milestones?.map((item: any, ind: number) => (
                  <option value={item?._id} key={item?._id}>
                    Milestone {ind + 1} - {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Module List.</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("moduleId", { required: true })}
              >
                <option value={""} hidden>
                  select milestone
                </option>
                {selectedModule?.map((item: any, ind: number) => (
                  <option value={item?._id} key={item?._id}>
                    Module {ind + 1} - {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment file</span>
              </label>
              <input type="file" {...register("file", { required: true })} />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment Description.</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                {...register("description", { required: true })}
              ></textarea>
            </div>

            <div className="form-control mt-3">
              <button className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "loading..." : "Add Video"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAssignmentModal;
