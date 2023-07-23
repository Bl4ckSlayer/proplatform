import React, { useEffect, useState } from "react";

import { SERVER_URL } from "../../../../config/config";
import Cookies from "universal-cookie";
import { useAppContext } from "../../../../context/AppContext";
const cookie = new Cookies();

type Props = {};

const Notifications = (props: Props) => {
  const { currentUser, isLoading } = useAppContext();
  // console.log(currentUser);
  const [datas,setDatas]=useState([])
  const token = cookie.get("token") as string | undefined;
   
    const getNotification =  (user : any) => {
      console.log(currentUser)
    
      const headers = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
       
      };
      // await createCourse(data);
      fetch(`${SERVER_URL}/student/notification/${user}`, {
        method : 'GET',
        headers : headers
      }).then(response => {
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        
        setDatas(data.notification)
        console.log("Response Data get:", data.notification);
       
      })
      .catch(error => {
       
        console.error("Error:", error);
      });
    };

    useEffect(() => {
      
      getNotification(currentUser)
    }, []);
  return <div>
   
    <div className="title flex items-center justify-between py-1 my-1">
  
   
</div>
<div
className="grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center items-center gap-6 "
>{datas?.map((data: any) => (
                <div className="card w-96  bg-gray-300">
                <div className="card-body items-center text-center">   
                 <h2 className="card-title">{data?.title}</h2>
                  <h2 className="card-title">{data?.notification_type}</h2>
              
                  <p>{data?.Description}</p>
                  <div className="card-actions justify-end">
                  <h2 className="btn">{data?.batch}</h2> <h2 className="btn">{data?.section}</h2>
                    <a href={data?.link} className="btn btn-primary">Link</a>
                    
                  </div>
                </div>
              </div>
              ))}</div>

</div>;
};

export default Notifications;
