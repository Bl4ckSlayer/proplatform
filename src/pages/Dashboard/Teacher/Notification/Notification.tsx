import React, { useEffect, useState } from "react";
import NotificationModal from "./NotificationModal";
import { SERVER_URL } from "../../../../config/config";
import Cookies from "universal-cookie";
const cookie = new Cookies();

type Props = {};

const Notification = (props: Props) => {
  const token = cookie.get("token") as string | undefined;
  const [datas, setDatas] = useState([]);
  const getNotification = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    // await createCourse(data);
    fetch(`${SERVER_URL}/teacher/notification`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDatas(data.notification);
        console.log("Response Data get:", data.notification);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getNotification();
  }, []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Parent-Teacher Conference",
      content: "Parent-teacher conferences will be held on August 15th, 2023.",
    },
    {
      id: 2,
      title: "Midterm Exam",
      content: "The midterm exam will be held on August 20th, 2023.",
    },
  ]);

  const handleAddNotification = () => {
    if (title && content) {
      const newNotification = {
        id: notifications.length + 1,
        title: title,
        content: content,
      };
      setNotifications([...notifications, newNotification]);
      setTitle("");
      setContent("");
    }
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Teacher Notifications</h1>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white p-4 shadow rounded-lg hover:bg-blue-100 transition duration-300"
            >
              <h2 className="text-lg font-semibold mb-2">
                {notification.title}
              </h2>
              <p>{notification.content}</p>
            </div>
          ))}
        </div>
      </div>
      <NotificationModal></NotificationModal>
      <div className="title flex items-center justify-between py-1 my-1">
        <label
          htmlFor="add-notification-modal"
          className="btn btn-primary btn-sm"
        >
          Add New Notification
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center items-center gap-6 ">
        {datas?.map((data: any) => (
          <div className="card w-96  h-56 bg-gray-300">
            <div className="card-body items-center text-center">
              <h2 className="card-title">{data?.title}</h2>
              <h2 className="card-title">{data?.notification_type}</h2>

              <p>{data?.Description}</p>
              <div className="card-actions justify-end">
                <h2 className="btn">{data?.batch}</h2>{" "}
                <h2 className="btn">{data?.section}</h2>
                <a href={data?.link} className="btn btn-primary">
                  Link
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
