import React from "react";
import NotificationModal from "./NotificationModal";

type Props = {};

const Notification = (props: Props) => {
    const datas=[
        {batch
        : 
        "",
        nDescription
        : 
        "",
        nLink
        : 
        "",
        nTitle
        : 
        "12",
        nType
        : 
        "Announcement",
        section
        : 
        "",
        student
        : 
        ""},
        {batch
        : 
        "",
        nDescription
        : 
        "",
        nLink
        : 
        "",
        nTitle
        : 
        "12",
        nType
        : 
        "Announcement",
        section
        : 
        "",
        student
        : 
        ""}
    ]
  return <div>
    <NotificationModal></NotificationModal>
    <div className="title flex items-center justify-between py-1 my-1">
  
  <label htmlFor="add-notification-modal" className="btn btn-primary btn-sm">
    Add New Notification
  </label>
</div>
<div
className="grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center items-center gap-6 "
>{datas?.map((data: any) => (
                <div className="card w-96  bg-gray-300">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{data?.nType}</h2>
                  <h2 className="card-title">{data?.nTitle}</h2>
                  <p>{data?.nDescription}tgsthsht</p>
                  <div className="card-actions justify-end">
                  <h2 className="btn">{data?.batch}asd</h2> <h2 className="btn">{data?.section}asd</h2>
                    <a href={data?.nLink} className="btn btn-primary">Link</a>
                    
                  </div>
                </div>
              </div>
              ))}</div>

</div>;
};

export default Notification;
