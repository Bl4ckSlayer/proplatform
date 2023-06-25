import { useState } from "react";
import { Link } from "react-router-dom";
import AuthDecision from "../../components/AuthDecision";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../shared/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {};

const Home = (props: Props) => {
  const [isShow, setIsShow] = useState(false);
  const { token, currentUser } = useAppContext();

  const dashboardLink =
    (currentUser?.role === "student"
      ? "/student/dashboard"
      : "/teacher/dashboard") ||
    (currentUser.role === "admin" && "/admin/dashboard");

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    // add folder id to the body
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        toast.success(response.data?.message);
      } else {
        toast.error(response.data?.error);
      }
    } catch (error) {
      //   toast.error(error?.response?.data?.error, { id: toastId });
    } finally {
    }
  };

  return (
    <div>
      {isShow && <AuthDecision setIsShow={setIsShow} />}

      <Navbar />
      <div className="hero min-h-[93vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">
              Hello there, Welcome to{" "}
              <span className="text-primary">Course management App</span>
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex items-center gap-2 justify-center">
              {token && (
                <Link to={dashboardLink} className="btn btn-primary">
                  Go to Dashboard
                </Link>
              )}
              {!token && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsShow(true)}
                  >
                    Create Account
                  </button>
                  <Link to={"/login"} className="btn btn-ghost">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
