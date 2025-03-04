"use client";
import React from "react";
import Button from "../../components/Button";
import Image from "next/image";
import Input from "../../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface SigninProps {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninProps>();
  const router = useRouter();
//   const hanldeSignIn: SubmitHandler<SigninProps> = async (data) => {
//     try {
//       reset();
//       const res = await apiClient.post(signInUrl, { ...data });
//       // if (!res) {
//       //   console.error("error occured while login: ", res);
//       // };
//       // console.log("res", res);
//       if (res.status === 200) {
//         toast.success(res.data.message);
//         setTimeout(() => {
//           router.push("/dashboard");
//         }, 1000);
//       } else {
//         console.error("error occured while login!");
//       }
//     } catch (error) {
//       console.error("error occured while login: ", error);
//     }
//   };

  return (
    <div className="flex h-screen  w-full  justify-center items-start lg:px-24 lg:py-10 mt-[10%]">
      <div className="flex flex-col w-[40%] bg-white/60 rounded-4xl shadow-2xl items-center p-10 h-[40vh]">
        <h1 className="text-5xl md:text-4xl font-extrabold text-center ">
          {" "}
          Welcome to <span className="text-persian-blue-500">Fire</span>
        </h1>
        <form
        //   onSubmit={handleSubmit(hanldeSignIn)}
          className="flex flex-col gap-4 w-full text-xl md:text-lg  mt-6"
        >
          <Input
            type="text"
            {...register("email", { required: true, maxLength: 20 })}
            placeholder="Enter your email"
            Style="bg-gray-500/20 focus:outline-persian-blue-500"
          ></Input>
          {errors.email && (
            <span className="text-red-500/80">Email is required</span>
          )}
          <Input
            type="password"
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 8,
            })}
            placeholder="Enter your password"
            Style="bg-gray-500/20 focus:outline-persian-blue-500"
          ></Input>
          {errors.password && (
            <span className="text-red-500/80">Password is required.</span>
          )}

          <Button
            name="Sign up"
            styles="rounded-lg flex justify-center items-center py-2 text-white font-bold"
          />
        </form>
        <p className="mt-4 ">
          Already have an account?{" "}
          <Link
            className="text-persian-blue-500 font-bold cursor-pointer"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;