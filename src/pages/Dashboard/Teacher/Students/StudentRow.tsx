import React from "react";
import { BiTrashAlt, BiVolumeMute } from "react-icons/bi";
import { BsCreditCard, BsEye, BsSend } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {
  student: any;
  ind: number;
};

const StudentRow = ({ student, ind }: Props) => {
  return (
    <tr>
      <td>{ind + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="">
            <div className=" w-12 h-12 grid place-items-center border bg-gray-50 text-xl font-bold">
              <span>{student?.name.at(0)}</span>
            </div>
          </div>
          <div>
            <div className="font-bold">{student?.name}</div>
            <div className="text-sm opacity-50">{student?.email}</div>
          </div>
        </div>
      </td>
      <td>{student?.studentId}</td>
      <td>{student?.batch}</td>
      <td>{student?.section}</td>
      <td className="text-center">
        <div className="badge badge-ghost text-center">
          {student?.courses?.length}
        </div>
      </td>
      <td>
        Course Progress <span className="badge badge-ghost">70%</span>
        <br />
        <progress
          className="progress progress-primary w-56"
          value="70"
          max="100"
        ></progress>
      </td>
      <td>
        <div className="flex items-center gap-1">
          <Link
            to={`/teacher/dashboard/students/${student?._id}`}
            data-tip="View"
            className="btn btn-primary btn-outline btn-sm btn-circle tooltip grid place-items-center tooltip-primary"
          >
            <BsEye />
          </Link>
        
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
