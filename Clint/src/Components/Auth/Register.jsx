import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../Firebase/firebase.init";
import { Eye, EyeOff } from "lucide-react";
import "./login.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import axiosPublicInstance from "../../api/axiosPublicInstance";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    mutate: registerUser,
    isPending,
    isLoading,
  } = useMutation({
    mutationFn: async ({ name, email, password, phone, image }) => {
      const userData = {
        name,
        email,
        phone,
        image,
      };
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: image,
        phoneNumber: phone,
      });
      await axiosPublicInstance.post("/users", userData);

      return res.user;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/auth/login");
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong during registration.",
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

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-center mb-4">Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 form">
        <div class="flex-column">
          <label>Full Name </label>
        </div>
        <div class="inputForm">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Full Name"
            className="input w-full border"
          />
        </div>

        {errors.name && <p className="text-red-600">Name is required</p>}

        <div class="flex-column">
          <label>Phone Number </label>
        </div>

        <div class="inputForm">
          <input
            {...register("phone", { required: true })}
            type="number"
            defaultValue={+881}
            placeholder="+880"
            className="input w-full border"
          />
        </div>
        {errors.name && (
          <p className="text-red-600">Phone Number is required</p>
        )}

        <div class="flex-column">
          <label>image URL </label>
        </div>

        <div class="inputForm">
          <input
            {...register("image")}
            type="text"
            placeholder="Image URL"
            className="input w-full border"
          />
        </div>

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
        <div class="flex-column">
          <label>Confirm Password </label>
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
            className="input w-full"
            type={showPass ? "text" : "password"}
            {...register("confirmPassword", {
              required: true,
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
            placeholder="Confirm Password"
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

        <label className="flex items-center gap-x-2 checkbox-container">
          <input
            className="custom-checkbox"
            type="checkbox"
            {...register("terms", { required: true })}
          />
          <span class="checkmark"></span>I agree to the Terms & Conditions
        </label>
        {errors.terms && (
          <p className="text-red-600">You must agree to terms</p>
        )}

        <button type="submit" class="button w-full" disabled={isPending}>
          {isPending ? "Creating Account..." : "Register"}
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </form>

      <div className="mt-4 text-center">
        <p class="p">
          You have Already an account{" "}
          <span class="span">
            <Link to={"/auth/login"}>Login</Link>
          </span>{" "}
        </p>
        <p>or</p>
        <button onClick={handleGoogleLogin} className="button w-full mt-2">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
