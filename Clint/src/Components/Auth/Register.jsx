import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../Firebase/firebase.init";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

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
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: image,
      });
      return res.user;
    },
    onSuccess: (user) => {
      console.log("Registered:", user);
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
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="input border w-full"
        />
        {errors.name && <p className="text-red-600">Name is required</p>}

        <input
          {...register("phone", { required: true })}
          placeholder="Phone"
          className="input border w-full"
        />
        <input
          {...register("image", { required: true })}
          placeholder="Image URL"
          className="input border w-full"
        />

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="input border w-full"
        />
        <input
          type={showPass ? "text" : "password"}
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
          className="input border w-full"
        />
        <input
          type={showPass ? "text" : "password"}
          {...register("confirmPassword", {
            required: true,
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
          placeholder="Confirm Password"
          className="input border w-full"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" onClick={() => setShowPass(!showPass)} />
          Show Password
        </label>

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
        <p>or</p>
        <button onClick={handleGoogleLogin} className="button w-full mt-2">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
