import React from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { useGetModuleByMilestoneQuery, useGetModulesByCourseQuery } from "../../../features/coursesSlice/courseApi";

type Props = {
  item: any;
  setOpenTab: any;
};

const ModuleItems = ({ item, setOpenTab }: Props) => {
  const { data: module } =useGetModuleByMilestoneQuery(item._id);  
  console.log(module)
  return (
    <div className="accordion-body p-2  ">
      <ul role="tablist">
        {item?.module?.map((i: any, index: number) => (
          <AccordionItem key={i.id}>
            {({ open }: any) => (
              <>
                <AccordionHeader className="w-full flex justify-between items-center  border-b p-4">
                  <span>{i.name}</span>
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
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(i.id);
                    }}
                    data-toggle="tab"
                    role="tablist"
                  >
                    <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-800 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                        />
                      </svg>

                      <div className="flex flex-col w-full">
                        <a href="#">
                          <p className="text-slate-50 text-sm font-medium">
                            Introduction to Couse
                          </p>
                        </a>
                        <div>
                          <span className="text-gray-400 text-xs mt-1">
                            34.5 Mins
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </>
            )}
          </AccordionItem>
        ))}
      </ul>
    </div>
  );
};

export default ModuleItems;
