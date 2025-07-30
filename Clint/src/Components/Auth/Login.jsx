import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { auth, googleProvider } from "../../Firebase/firebase.init";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import "./login.css";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    mutate: loginUser,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Login successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong during Login.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login success:", result.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl text-center font-bold mb-4">Welcome Back</h2>
      <form onSubmit={handleSubmit(loginUser)} className="form space-y-2">
        <div class="flex-column">
          <label>Email </label>
        </div>
        <div class="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 32 32"
            height="20"
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="input w-full border"
          />
        </div>
        {errors.email && <span className="text-red-600">Email required</span>}

        <div class="flex-column">
          <label>Password </label>
        </div>
        <div class="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="-64 0 512 512"
            height="20"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            {...register("password", { required: true })}
            type={showPass ? "password" : "text"}
            placeholder="Password"
            className="input w-full"
          />

          <span
            className="cursor-pointer mr-2.5 text-gray-500"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        {errors.password && (
          <span className="text-red-600">Password required</span>
        )}

        <div class="flex-row">
          <div>
            <input type="checkbox" {...register("remember")} />
            <label>Remember me </label>
          </div>
          <span class="span">Forgot password?</span>
        </div>

        <button type="submit" className="button w-full">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && <p className="text-red-500">{error.message}</p>}
      </form>

      <div className="mt-4 text-center">
        <p class="p">
          Don't have an account?{" "}
          <span class="span">
            <Link to={"/auth/register"}>Sign Up</Link>
          </span>{" "}
        </p>

        <p class="p line">Or With</p>
        <button onClick={handleGoogleLogin} className="button w-full mt-2">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
