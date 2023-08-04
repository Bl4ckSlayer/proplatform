import React, { useState } from "react";
import { BiEditAlt, BiTrash, BiVideo } from "react-icons/bi";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUpdateVideosByIdQuery } from "../../../../../../features/coursesSlice/teacherApi";



type Props = {
  item: any;
   mutate:any;
};

const VideoItem = ({ item }: Props) => {
  const { handleSubmit, register, reset, watch } = useForm();
console.log(item)

  // const [updateVideo, { isLoading, error, data }] = useUpdateVideosByIdQuery();


  const handleAddVideo = handleSubmit(async (data) => {
    console.log(data);
    // const newData={...data,courseId: course._id}
    // console.log(newData)
    // await data(data);    
    reset()
    setOpenEdit(false)
  });
  console.log(item)
  const [open ,setOpen]=useState(false)
  const [openEdit ,setOpenEdit]=useState(false)
  const [vlink ,setVlink]=useState('')
  return (
    <><li className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 cursor-pointer  rounded-sm" onClick={() =>{setOpen(true);setVlink(item?.url)}}>
    <div>
      <div className="flex items-center gap-1">
        <BiVideo />
        {item?.name}
      </div>
      <small className="duration">{item?.duration}</small>
    </div>
   
  </li>
  {open && (<div className="fixed z-10 inset-0   ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="bg-white rounded-lg  shadow-xl transform transition-all sm:w-full sm:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white overflow-hidden pt-5 pb-4 sm:p-6 sm:pb-4">
                <iframe
                  title="YouTube Video"
                  width="470"
                  height="315"
                  src={vlink}
                 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
             
                <button
                  onClick={()=>setOpen(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button> 
                <div className="flex items-center gap-4 w- cursor-pointer ">

      <BiEditAlt className="" onClick={()=>{
        setOpen(false)
        setOpenEdit(true)
        useUpdateVideosByIdQuery(item._id)}} />
      
      <BiTrash />
    </div>
              </div>
            </div>
          </div>
        </div>  )}
  {openEdit && (<div className="fixed z-10 inset-0     ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="bg-white rounded-lg  shadow-xl transform transition-all sm:w-full sm:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white overflow-hidden pt-5 pb-4 sm:p-6 sm:pb-4">
              <form onSubmit={handleAddVideo}> <div>            

            <div className="form-control">
              <label className="label">
                <span className="label-text">Videos Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Video URL</span>
              </label>
              <input
                type="url"
                className="input input-bordered"
                {...register("url", { required: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Video Description.</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                {...register("description", { required: true })}
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text"> Total Duration.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("totalTimes", { required: true })}
              />
            </div>

            <div className="form-control mt-3">
              <button className="btn btn-primary" 
            
              >
                update
               
              </button>
            </div>
          </div>
      
      
    </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
             
                <button
                  onClick={()=>setOpenEdit(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button> 
               
              </div>
            </div>
          </div>
        </div>  )}
  </>
  
  );
};

export default VideoItem;
