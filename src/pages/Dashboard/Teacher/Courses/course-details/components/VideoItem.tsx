import React from "react";
import { BiEditAlt, BiTrash, BiVideo } from "react-icons/bi";

type Props = {
  item: any;
};

const VideoItem = ({ item }: Props) => {
  return (
    <li className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 cursor-pointer  rounded-sm">
      <div>
        <div className="flex items-center gap-1">
          <BiVideo />
          {item?.name}
        </div>
        <small className="duration">{item?.duration}</small>
      </div>
      <div className="flex items-center gap-2">
        <BiEditAlt />
        <BiTrash />
      </div>
    </li>
  );
};

export default VideoItem;
