import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { BiChevronDown, BiCross, BiPlus, BiX } from "react-icons/bi";
import { set, useForm } from "react-hook-form";
import { useGetEnrolledCoursesForStudentQuery } from "../../features/coursesSlice/courseApi";
import ComponentLoader from "../../components/ComponentLoader";
import CourseCard from "../../components/Teacher/Courses/CourseCard";
import NoDataFound from "../../components/ui/NoDataFound";

const filtersData = [
  {
    id: 1,
    name: "Course Name",
    slug: "courseName",
    type: "text",
  },
  {
    id: 2,
    name: "Course Code",
    slug: "courseCode",
    type: "text",
  },
  {
    id: 3,
    name: "Course Type",
    slug: "courseType",
    type: "select",
    options: [
      {
        id: 1,
        name: "Type 1",
      },
      {
        id: 2,
        name: "Type 2",
      },
    ],
  },
];
type Props = {};

const Courses = (Props: any) => {
  // form
  const { handleSubmit, register, setValue, reset } = useForm();

  const [filtersItem, setFiltersItem] = useState<any[]>(filtersData);

  const [filters, setFilters] = useState<any[]>([]);

  // on selected filter
  const onSelectedFilter = (id: number) => {
    // remove the items from filtersItem
    const newFiltersItem = filtersItem.filter((item) => item.id !== id);
    setFiltersItem(newFiltersItem);

    // add the items to filters
    const newFilters = filtersItem.filter((item) => item.id === id);
    setFilters([...filters, ...newFilters]);
  };

  // clear all filters
  const clearAll = () => {
    setFiltersItem(filtersData);
    setFilters([]);
    reset();
  };

  // remove filter
  const removeFilter = (id: number) => () => {
    // remove the items from filters
    const removedItem = filters.find((item) => item.id === id);
    setFiltersItem([...filtersItem, removedItem].sort((a, b) => a.id - b.id));
    const newFilters = filters.filter((item) => item.id !== id);
    setFilters(newFilters);
    setValue(removedItem.slug, "");
  };

  // on submit
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetEnrolledCoursesForStudentQuery({});
  console.log(courses);
  return (
    <>
      <div>
        <Navbar/>
        <div className="title flex items-center justify-center py-1 my-1">
          <h1>All Courses</h1>
         
        </div>
        <div className="">
          {isLoading ? (
            <ComponentLoader />
          ) : isError ? (
            <div>Something went wrong Sir.</div>
          ) : (
            <>
              {courses?.data?.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2  gap-3 ">
                  {courses?.data?.map((item: any) => (
                    <CourseCard key={item?._id} item={item} />
                  ))}
                </div>
              ) : (
                <NoDataFound title={"No Courses Found."} />
              )}
            </>
          )}
        </div>
      </div>
      <div className="p-5 container mx-auto">
        <div className="flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-bold">Filters</h1>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 btn-primary btn-sm">
              Filters
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {filtersItem.map((item) => (
                <li key={item.id} onClick={() => onSelectedFilter(item.id)}>
                  <a>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* show the filters area */}
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center gap-3">
            <ul className="flex gap-1 items-center flex-wrap">
              {filters.map((item) => (
                <li
                  key={item.id}
                  className="dropdown dropdown-bottom flex items-stretch"
                >
                  <div
                    className="flex gap-1 items-center bg-slate-100 p-2 px-4 rounded cursor-pointer"
                    tabIndex={0}
                  >
                    <span className="">{item.name}</span>
                    <i>
                      <BiChevronDown />
                    </i>
                  </div>
                  <div
                    onClick={removeFilter(item.id)}
                    className="cross px-2 grid place-items-center bg-red-50 text-red-400 cursor-pointer hover:bg-red-100"
                  >
                    <BiX size={18} />
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    tabIndex={0}
                    className="dropdown-content menu  shadow bg-slate-50 rounded-box  p-3"
                  >
                    <label htmlFor="" className="my-3">
                      {item?.name}
                    </label>
                    {item.type === "select" && (
                      <>
                        <select
                          id=""
                          className="select select-bordered select-sm"
                          {...register(item.slug, {
                            required: true,
                          })}
                        >
                          {item.options.map((option: any) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    {item.type === "text" && (
                      <>
                        <input
                          type="text"
                          {...register(item.slug, {
                            required: true,
                          })}
                          className="input input-bordered input-md"
                        />
                      </>
                    )}
                    <div className="button-group flex gap-1 items-center mt-3">
                      <button
                        className="btn btn-error btn-outline btn-sm"
                        onClick={() => setValue(item.slug, "")}
                      >
                        Clear
                      </button>
                      <button className="btn btn-primary btn-sm">Apply</button>
                    </div>
                  </form>
                </li>
              ))}
            </ul>
            <div>
              {filters.length > 0 && (
                <div className="dropdown dropdown-end">
                  <button
                    disabled={filtersItem?.length === 0}
                    tabIndex={0}
                    className="btn m-1 btn-ghost"
                  >
                    Add Filter <BiPlus />
                  </button>
                  <ul
                    tabIndex={0}
                    className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${
                      filtersItem.length === 0 && "hidden"
                    }`}
                  >
                    {filtersItem.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => onSelectedFilter(item.id)}
                      >
                        <a>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {filters?.length > 0 && (
            <li
              className="flex gap-1 items-center bg-red-50 text-red-500 p-2 px-4 rounded cursor-pointer"
              onClick={() => clearAll()}
            >
              <span className="">Clear All</span>
            </li>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
