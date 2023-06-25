import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsChevronLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useRegisterMutation } from "../../features/api/userApi";
type Props = {};

const Register = (props: Props) => {
  // from react router dom
  const { role } = useParams();
  const navigate = useNavigate();
  const { token, role: userRole } = useAppContext();
  const [pwdShow, setPwdShow] = useState(false);

  // batches
  const [batches, setBatches] = useState<any>([
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
  ]);

  // get form data
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // get api hook for create acc
  const [createAccount, { isLoading, isError, error, isSuccess, data }] =
    useRegisterMutation<any>();

  // submit form
  const onSubmit = handleSubmit(async (data) => {
    await createAccount({ ...data, role: role });
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register success");
      navigate("/login");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    if (token) {
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      }
      if (userRole === "student") {
        navigate("/student/dashboard");
      }
      if (userRole === "teacher") {
        navigate("/teacher/dashboard");
      }
    }
  }, [token, role]);

  // logic for see the batch no
  //loop start from 48 to 58 (0-9)

  // useEffect(() => {
  //   // start interval after 1 year
  //   setInterval(() => {
  //     setBatches((prev: any) => {
  //       prev.shift();
  //       prev.push(prev[prev.length - 1] + 1);
  //       return prev;
  //     });
  //     console.log(batches);
  //     localStorage.setItem("batches", JSON.stringify(batches));
  //   }, 10000);

  //   setBatches(JSON.parse(localStorage.getItem("batches") || "[]"));
  //   return () => {
  //     setBatches([]);
  //   };
  // }, []);

  return (
    <section className="place-items-center p-10  flex flex-col  bg-gray-100 justify-between items-center h-screen">
      {/* make register form */}
      <form
        action=""
        className={`p-10 border shadow  ${
          role === "student" ? " w-[45rem]" : " w-[35rem]"
        } bg-white relative`}
        onSubmit={onSubmit}
      >
        <Link
          to={"/"}
          className="cursor-pointer bg-white absolute -top-6 p-3 border shadow flex items-center gap-1"
        >
          <BsChevronLeft /> Get back
        </Link>
        <h1 className="text-3xl font-bold mb-5">
          Register as <span className="text-primary capitalize">{role}</span>
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            placeholder="Enter your name"
            className="input input-bordered w-full border-primary focus:border-primary"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {(errors as any).name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is invalid",
              },
            })}
            id="email"
            placeholder="Enter your email"
            className="input input-bordered w-full border-primary focus:border-primary"
          />
          {errors.email && (
            <span className="text-red-500 text-sm ">
              {(errors as any).email.message}
            </span>
          )}
        </div>
        <div
          className={`${role === "student" ? " grid grid-cols-2 gap-3 " : ""}`}
        >
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone is required",
                },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Phone is invalid",
                },
              })}
              id="phone"
              placeholder="Enter your phone"
              className="input input-bordered w-full border-primary focus:border-primary"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm ">
                {(errors as any).phone.message}
              </span>
            )}
          </div>
          {/* batch */}
          {role === "student" && (
            <>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="role">
                  Student ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("studentId", {
                    required: {
                      value: true,
                      message: "Student ID is required",
                    },
                  })}
                  id="role"
                  placeholder="Enter your Student ID"
                  className="input input-bordered w-full border-primary focus:border-primary"
                />
                {errors.studentId && (
                  <span className="text-red-500 text-sm ">
                    {(errors as any).studentId.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="batch">
                  Batch No <span className="text-red-500">*</span>
                </label>
                <select
                  id="batch"
                  {...register("batch", { required: true })}
                  className="select select-bordered w-full border-primary focus:border-primary"
                >
                  <option value="">Select Batch</option>
                  {batches.map((batch: any) => (
                    <option key={batch} value={batch}>
                      Batch {batch}
                    </option>
                  ))}
                  {/* <option>Batch 48</option>
                  <option>Batch 49</option>
                  <option>Batch 50</option>
                  <option>Batch 51</option>
                  <option>Batch 52</option>
                  <option>Batch 53</option>
                  <option>Batch 54</option>
                  <option>Batch 55</option>
                  <option>Batch 56</option>
                  <option>Batch 57</option>
                  <option>Batch 58</option> */}
                </select>
                {errors.batch && (
                  <span className="text-red-500 text-sm ">
                    Batch no is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="section">
                  Section <span className="text-red-500">*</span>{" "}
                </label>
                <select
                  id="section"
                  {...register("section", { required: true })}
                  className="select select-bordered w-full border-primary focus:border-primary"
                >
                  <option value="">Select Section</option>
                  <option>Section A</option>
                  <option>Section B</option>
                  <option>Section C</option>
                  <option>Section D</option>
                  <option>Section E</option>
                </select>
                {errors.section && (
                  <span className="text-red-500 text-sm ">
                    Section is required
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        {/* specialist */}
        {role === "teacher" && (
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="specialist">
              Specialist <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("specialist", {
                required: "Specialist is required",
                minLength: {
                  value: 3,
                  message: "Specialist must be at least 3 characters",
                },
              })}
              id="specialist"
              placeholder="Enter your specialist"
              className="input input-bordered w-full border-primary focus:border-primary"
            />
            {errors.specialist && (
              <span className="text-red-500 text-sm ">
                {(errors as any).specialist.message}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={pwdShow ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              id="password"
              placeholder="Enter your password"
              className="input input-bordered w-full border-primary focus:border-primary"
            />
            <span
              className="cursor-pointer absolute right-3 top-4"
              onClick={() => setPwdShow((prev) => !prev)}
            >
              {pwdShow ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {(errors as any).password.message}
            </span>
          )}
        </div>

        {isLoading ? (
          <button className="btn btn-primary w-full mt-3" disabled>
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin">
                <FaSpinner />
              </span>
              <span>Registering...</span>
            </div>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary w-full mt-3">
            Register
          </button>
        )}
        <div className="mt-2">
          Change role?{" "}
          {role === "teacher" ? (
            <Link to="/register/student" className="text-primary">
              Register as student
            </Link>
          ) : (
            <Link to="/register/teacher" className="text-primary">
              Register as teacher
            </Link>
          )}
        </div>
        <div className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      </form>
      <div></div>
    </section>
  );
};

export default Register;
