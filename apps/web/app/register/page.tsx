"use client";
import React from "react";
import Button from "../../components/Button";
import apiClient from "../../utils/apiclient";
import Input from "../../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface RegisterProps {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: "USER" | "INSPECTOR" | "ADMIN";
}
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterProps>();
  const router = useRouter();
  const handleRegister: SubmitHandler<RegisterProps> = async (data) => {
    try {
      reset();
      console.log("data in register", data);
      const res = await apiClient.post("http://localhost:8080/users/register", { ...data });
      if(res.status === 201){
        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
      console.log("res in register", res);
    } catch (error) {
      console.error("error occured while register: ", error);
    }
  };

  return (
    <div className="flex h-screen  w-full  justify-center items-start lg:px-24 lg:py-10 mt-[10%]">
      <div className="flex flex-col w-[40%] text-white items-center p-10 h-[40vh]">
        <h1 className="text-5xl md:text-4xl font-extrabold text-center ">
          {" "}
          Welcome to <span className="text-red-600">Fire</span>
        </h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4 w-full text-xl md:text-lg  mt-6"
        >
          <Input
            type="text"
            {...register("name", { required: true, maxLength: 20 })}
            placeholder="Enter your full name"
            Style="bg-gray-500/20 focus:outline-persian-blue-500"
          ></Input>
          {errors.name && (
            <span className="text-red-500/80">Email is required</span>
          )}
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
            type="text"
            {...register("phone", { required: true, maxLength: 20 })}
            placeholder="Enter your phone number"
            Style="bg-gray-500/20 focus:outline-persian-blue-500"
          ></Input>
          {errors.phone && (
            <span className="text-red-500/80">Email is required</span>
          )}
          <Input
            type="password"
            {...register("password", {
              required: true,
              // maxLength: 20,
              // minLength: 8,
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
        <p className="mt-4 text-lg">
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-bold cursor-pointer"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;