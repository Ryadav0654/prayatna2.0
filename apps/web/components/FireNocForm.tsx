"use client";

import { useForm } from "react-hook-form";
import Input from "./Input";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const nocSchema = z.object({
  applicantName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  buildingType: z.enum(["Commercial", "Residential", "Industrial", "Educational"]),
  address: z.string().min(10, "Address is required"),
  fireSafetyPlan: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Fire Safety Plan is required",
  }),
});

type FormData = z.infer<typeof nocSchema>;

const FireNOCForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setSubmitted(true);
  };

  return (
    <div className="w-[40%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Fire NOC Application</h2>

      {submitted ? (
        <p className="text-green-600 font-semibold text-center">
          ✅ Application Submitted Successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Applicant Name */}
          <div>
            <label className="block text-sm font-medium">Applicant Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              {...register("applicantName")}
              Style="w-full p-2 border rounded-md"
            />
            {errors.applicantName && <p className="text-red-500 text-sm">{errors.applicantName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              {...register("email")}
              Style="w-full p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              type="tel"
              {...register("phone")}
              Style="w-full p-2 border rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Building Type */}
          <div>
            <label className="block text-sm font-medium">Building Type</label>
            <select {...register("buildingType")} className="w-full p-2 border rounded-md">
              <option value="">Select</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Industrial">Industrial</option>
              <option value="Educational">Educational</option>
            </select>
            {errors.buildingType && <p className="text-red-500 text-sm">{errors.buildingType.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Building Address</label>
            <textarea
              {...register("address")}
              className="w-full p-2 border rounded-md"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Fire Safety Plan Upload */}
          <div>
            <label className="block text-sm font-medium">Fire Safety Plan (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              {...register("fireSafetyPlan")}
              className="w-full p-2 border rounded-md"
            />
            {errors.fireSafetyPlan && <p className="text-red-500 text-sm">{errors.fireSafetyPlan.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default FireNOCForm;