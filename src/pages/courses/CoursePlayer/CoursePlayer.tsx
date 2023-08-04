import React, { useState } from "react";
import Navbar from "../../../shared/Navbar";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import {
  useGetCourseByIdQuery,
  useGetMilestoneByCourseQuery,
} from "../../../features/coursesSlice/courseApi";
import { useParams } from "react-router-dom";
import MilestoneItems from "./MilestoneItems";

type Props = {};

const CoursePlayer = (props: Props) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: milestone } = useGetMilestoneByCourseQuery(courseId);

  // console.log(courseId,milestone);
  

  const [openTab, setOpenTab] = useState({});
  console.log(openTab)
  const [isActive, setIsActive] = useState(false);

  

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6  pb-36">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <div>
               
                <iframe width="100%" src={openTab.url} title="YouTube video player" className="aspect-video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-black">
                    {openTab?.name}
                  </h1>
                  <h1 className="text-lg font-semibold tracking-tight text-black">
                    {openTab?.description}
                  </h1>
                  <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on {openTab?.updatedAt}

                  </h2>

                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                    >
                      এসাইনমেন্ট
                    </a>

                    <a
                      href="./Quiz.html"
                      className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                    >
                      কুইজে অংশগ্রহণ করুন
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-slate-400 leading-6">
                    আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু
                    করেছেন, তারা রিয়্যাক্ট এর বেশ কিছু কনসেপ্ট ঠিক মতো আয়ত্ত
                    না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto  p-4 rounded-md bg-gray-50 text-black  border-slate-50/10 divide-y ">
              {milestone?.milestones?.map((item: any) => (
                
                <MilestoneItems
                  item={item}
                  key={item?._id}
                  setOpenTab={setOpenTab}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <div className="mt-20"></div> */}
    </>
  );
};

export default CoursePlayer;
