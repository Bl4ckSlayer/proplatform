import React from "react";
import { useAppContext } from "../../../context/AppContext";
import ComponentLoader from "../../../components/ComponentLoader";

type Props = {};

const Profile = (props: Props) => {
  const { currentUser, isLoading } = useAppContext();
  console.log(currentUser);
  return (
    <div>
      <h1>Profile</h1>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <div className="p-7">
          {/* profile image */}
          <div className="w-32 h-32 grid place-items-center border ml-auto bg-gray-50">
            <span className="text-5xl font-bold">
              {currentUser?.name.at(0)}
            </span>
          </div>

          {/* other information */}
          <div>
            <table className="table w-full table-zebra">
              <tbody>
                <tr>
                  <td className="font-bold">Name</td>
                  <td className="text-right">{currentUser?.name}</td>
                </tr>
                <tr>
                  <td className="font-bold">Email</td>
                  <td className="text-right">{currentUser?.email}</td>
                </tr>
                <tr>
                  <td className="font-bold">Role</td>
                  <td className="text-right">{currentUser?.role}</td>
                </tr>
                {currentUser?.role === "student" && (
                  <tr>
                    <td className="font-bold">Student ID</td>
                    <td className="text-right uppercase">
                      {currentUser?.studentId}
                    </td>
                  </tr>
                )}
                {currentUser?.role === "teacher" && (
                  <>
                    <tr>
                      <td className="font-bold">Teacher ID</td>
                      <td className="text-right uppercase">
                        {currentUser?._id}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold">Specialist</td>
                      <td className="text-right">{currentUser?.specialist}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td className="font-bold">Verified</td>
                  <td className="text-right">
                    {currentUser?.isVerified ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Phone</td>
                  <td className="text-right">
                    {currentUser?.phone ? currentUser?.phone : "not available"}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Created At</td>
                  <td className="text-right">{currentUser?.createdAt}</td>
                </tr>
                <tr>
                  <td className="font-bold">Updated At</td>
                  <td className="text-right">{currentUser?.updatedAt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
