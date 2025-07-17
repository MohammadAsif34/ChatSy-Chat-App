import axios from "axios";
// import moduleName from "../";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/CreateContext";

const Login = () => {
  const { setAppKey } = useUser();
  const defaultForm = { phone: "", password: "" };
  const [form, setForm] = useState(defaultForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginAPI = import.meta.env.VITE_LOGIN_API;
      const res = await axios.post(loginAPI, form, { withCredentials: true });
      // console.log(res.data);
      if (res.data?.status === "OK") {
        setAppKey((p) => p + 1);
        navigate("/");
        toast.success(res.data?.message);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setForm(defaultForm);
    }

    console.log("login api");
    console.log("form data :: ", form);
    // setForm(defaultForm);
  };
  return (
    <>
      <div className="w-full max-sm:px-4 h-screen bg-gray-100 dark:bg-neutral-900 flex justify-center items-center">
        <form
          className="min-w-[450px] max-sm:w-1/1 max-lg:w-2/3 px-12 py-8 bg-white dark:bg-neutral-800 border border-gray-300 rounded-xl shadow-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-10 text-center text-4xl font-semibold ">Login</h1>
          <label className="px-2">Phone</label>
          <div className="h-10 mb-4 border border-gray-300 rounded-md ">
            <input
              type="text"
              className="w-full h-full px-4 border-0  transition-all"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <label className="px-2">Password</label>
          <div className="h-10 mb-4 border border-gray-300 rounded-md ">
            <input
              type="text"
              className="w-full h-full px-4 border-0  transition-all"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {false ? (
            <button
              className="w-full h-10 my-10 border border-neutral-300 rounded-md cursor-not-allowed bg-neutral-700 bor"
              disabled
            >
              Logging{" "}
              <span className="w-4 h-4 inline-block border-2 border-t-transparent rounded-full translate-1 animate-spin"></span>
            </button>
          ) : (
            <button className="w-full h-10 my-10 border border-gray-300 rounded-md active:border-neutral-300 cursor-pointer hover:bg-gray-300">
              Login
            </button>
          )}
          <div className="text-sm text-center flex max-sm:flex-col justify-between ">
            <p>forget password</p>
            <p>
              Don't have an account?{" "}
              <Link to={"/register"}>
                <span className="text-purple-500 underline">register</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
