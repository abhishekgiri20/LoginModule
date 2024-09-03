import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { IoEyeSharp } from "react-icons/io5";
import loginapi from "../loginapi";
import { useRouter } from "next/router";
import { GoEyeClosed } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const index = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const passwordValidation = (password:any) => {
    const passwordCheck =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@_!#$%^&*()<>?/\|}{~:])[A-Za-z0-9@_!#$%^&*()<>?/\|}{~:]{8,}$/;
    if (password.length === 0) {
      return "Password is required";
    }
    if (!passwordCheck.test(password)) {
      return "Password should be 8 characters or longer and include an uppercase letter, a number, and a special character";
    }
    return "";
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const passwordError = passwordValidation(newPassword);
    if (!token) {
      return toast.error("Please Enter Token First!");
    } else if (!newPassword) {
      return toast.error("Please enter password");
    }
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    setPasswordError("");
    await handleResetPassword();
  };


  const handleResetPassword = async () => {

    try {
      const response = await loginapi.resetPassword({
        token: token,
        password: newPassword,
      });

      if (!response) {
        toast.error("Please enter token correctly");
      } else {
        toast.success("Password reset successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        router.push("/signIn");
      }
    } catch (error) {
      console.log("error in update pass....", error);
    }
  };

  return (
    <>
      <section>
        <div className="container   h-100 ">
          <div className="row h-100">
            <div className="col-md-8  m-auto  ">
              <div className="welcome-card w-75 text-center m-auto bg-white p-4 rounded-3">
                <div className="welcome-logo">
                  <img className="mt-3 mb-4" src={logo.src} alt="" />
                </div>
                <div className="welcome-text d-flex">
                  <h4 className="mb-5 w-100">Reset Your password?</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="signUp-details ">
                    <div className="email-container border d-flex justify-content-between px-3 py-2 my-3 rounded">
                      <input
                        type="text"
                        placeholder="Token"
                        className="border-0 shadow-0 w-100 "
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </div>
                    <div className="password-container border d-flex justify-content-between px-3 py-2 my-3 rounded">
                      <input
                        type={passwordShown ? "text" : "password"}
                        placeholder="New Password"
                        className="border-0 shadow-0 w-100 "
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <span>
                        {passwordShown ? (
                          <IoEyeSharp onClick={togglePasswordVisibility} />
                        ) : (
                          <GoEyeClosed onClick={togglePasswordVisibility} />
                        )}
                      </span>
                    </div>
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-danger w-100 mb-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default index;
