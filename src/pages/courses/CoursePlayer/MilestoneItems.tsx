import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import ModuleItems from "./ModuleItems";
import { useGetModuleByMilestoneQuery } from "../../../features/coursesSlice/courseApi";
type Props = {
  item: any;
  setOpenTab: any;
};

const MilestoneItems = ({ item, setOpenTab }: Props) => {

  const { data: module } =useGetModuleByMilestoneQuery(item._id);  
  console.log(module)
  return (
    <><h1>this is mil</h1><Accordion
    transition={{
      duration: "300ms",
      timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    }}
  >
    <AccordionItem>
      {({ open }: any) => (
        <>
          <AccordionHeader className="w-full flex justify-between items-center   p-4">
            <span>{item.name}</span>
            <svg
              className={`w-6 h-6 ${!open ? "" : "rotate-90"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </AccordionHeader>

          <AccordionBody>
            <ModuleItems item={item} setOpenTab={setOpenTab} />
          </AccordionBody>
        </>
      )}
    </AccordionItem>
  </Accordion></>
  );
};

export default MilestoneItems;
