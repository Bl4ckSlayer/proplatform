import React from "react";
import { BiEditAlt, BiTrash, BiVideo } from "react-icons/bi";
import VideoItem from "./VideoItem";
import { useGetVideosByModuleQuery } from "../../../../../../features/coursesSlice/courseApi";

type Props = {
  item: any;
  ind: number;
};

const ModuleList = ({ item, ind }: Props) => {
  // get videos by module
  const { data: videos } = useGetVideosByModuleQuery(item?._id);
  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus border border-base-300 bg-base-100  mt-2"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-md font-medium  bg-slate-50">
        Module {ind + 1}: {item?.name}
      </div>
      <div className="collapse-content text-sm">
        <ul className="flex flex-col gap-1 mt-2">
          {videos?.videos?.map((item: any) => (
            <VideoItem key={item?._id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModuleList;
