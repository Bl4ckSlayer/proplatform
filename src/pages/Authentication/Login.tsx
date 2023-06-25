import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsBack, BsChevronLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import AuthDecision from "../../components/AuthDecision";
import { useLoginMutation } from "../../features/api/userApi";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useAppContext } from "../../context/AppContext";
import ScreenLoader from "../../components/ScreenLoader";
type Props = {};

const Login = (props: Props) => {
  const { token, role, isLoading: userLoading } = useAppContext();

  const [isShow, setIsShow] = useState(false);
  const [pwdShow, setPwdShow] = useState(false);
  // from react router dom
  const navigate = useNavigate();

  // from react cookie
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // get form data
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // get api hook for create acc
  const [loginUser, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation<any>();

  // submit form
  const onSubmit = handleSubmit(async (data) => {
    await loginUser({ ...data });
  });

  useEffect(() => {
    if (isSuccess) {
      setCookie("token", data?.data?.token, { path: "/" });
      toast.success("Login success");
      if (data?.data?.user?.role === "admin") {
        navigate("/admin/dashboard");
      }
      if (data?.data?.user?.role === "student") {
        navigate("/student/dashboard");
      }
      if (data?.data?.user?.role === "teacher") {
        navigate("/teacher/dashboard");
      }
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      }
      if (role === "student") {
        navigate("/student/dashboard");
      }
      if (role === "teacher") {
        navigate("/teacher/dashboard");
      }
    }
  }, [token, role]);

  if (userLoading) {
    return <ScreenLoader />;
  }

  return (
    <section className="grid place-items-center p-10 bg-gray-100 h-screen">
      {isShow && <AuthDecision setIsShow={setIsShow} />}
      {/* make register form */}
      <form
        action=""
        className="p-10 border shadow w-[35rem] bg-white relative"
        onSubmit={onSubmit}
      >
        <Link
          to={"/"}
          className="cursor-pointer bg-white absolute -top-6 p-3 border shadow flex items-center gap-1"
        >
          <BsChevronLeft /> Get back
        </Link>
        <h1 className="text-3xl font-bold mb-5 flex items-center gap-1">
          Login to your account
        </h1>

        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            id="email"
            placeholder="Enter your email"
            className="input input-bordered w-full border-primary focus:border-primary"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {(errors as any).email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="password">Password</label>
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
          <button className="btn btn-primary mt-3" disabled>
            Loading...
          </button>
        ) : (
          <button className="btn btn-primary mt-3">Login</button>
        )}

        <div className="mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => setIsShow(true)}
            className="text-primary cursor-pointer"
          >
            Create an account
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
