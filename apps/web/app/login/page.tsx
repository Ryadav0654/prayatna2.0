"use client";
import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "../../utils/apiclient";
import toast from "react-hot-toast";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
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
  const [error, setError] = React.useState({isError: false, message: ""});
  const hanldeSignIn: SubmitHandler<SigninProps> = async (data) => {
    try {
      reset();
      setError({isError: false, message: ""});
      // console.log("data in login", data);
      const res = await apiClient.post("http://localhost:8080/users/signin", { ...data });
      if (res.status === 201) {
        toast.success(res.data.message);
        if(typeof window !== 'undefined' && window.localStorage){
          console.log("window in login", window);
          localStorage.setItem("token", res.data.token);  
        }
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
      console.log("res in login", res);
    } catch (error: any) {
      setError({isError: true, message: error.response.data.message});
      console.error("error occured while login: ", error);
    }
  };

  if(error.isError) {
    return (
      <Error message={error.message}/>
     
    )
  }
  return (
    <div className="flex h-screen  w-full  justify-center items-start lg:px-24 lg:py-10 mt-[10%]">
      <div className="flex flex-col w-[40%] text-white  items-center p-10 h-[40vh]">
        <h1 className="text-5xl md:text-4xl font-extrabold text-center ">
          {" "}
          Welcome to <span className="text-red-600">Fire</span>
        </h1>
        <form
          onSubmit={handleSubmit(hanldeSignIn)}
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
            name="Signin"
            styles="rounded-lg flex justify-center items-center py-2 text-white font-bold"
          />
        </form>
        <p className="mt-4 ">
          Don&#39;t have an account?{" "}
          <Link
            className="text-blue-600 font-bold cursor-pointer"
            href="/register"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;