"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import apiClient from "../../utils/apiclient";
import toast from "react-hot-toast";
import BuildingCard from "../show-building/page";
import { Building } from "../show-building/page";
type BuildingFormData = {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  nocStatus: "Applied" | "Pending" | "Approved" | "Denied";
};

interface AddBuildingFormProps {
  onAddBuilding: (newBuilding: BuildingFormData) => void;
  isAdmin: boolean; // Pass isAdmin prop to control NOC status editability
}

const AddBuildingForm: React.FC<AddBuildingFormProps> = ({
  onAddBuilding,
  isAdmin,
}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [buildings, setBuildings] = React.useState<Building[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BuildingFormData>();

  const onSubmit = async (data: BuildingFormData) => {
    // Passing latitude and longitude to the onAddBuilding function
    try {
      const res = await apiClient.post(
        "http://localhost:8080/building/create",
        {
          ...data,
          latitude,
          longitude,
        }
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        window.location.reload();
      }

      reset(); // Reset the form after submission
    } catch (error) {
      console.log("error occurred while adding building: ", error);
    }
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error fetching current location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);
  
  useEffect(() => {
    const getAllBuildings = async () => {
      try {
        const response = await apiClient.get("/building/all");
        if(response.status === 201){
          console.log("all building res: ", response);
          const data = response.data;
          setBuildings(data);
        }
        // console.log(data);
      } catch (error) {
        console.error(error);
    }
  }
  getAllBuildings();
  }, []);

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto bg-transparent py-8 px-16  rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-white mb-6">
        Add New Building
      </h2>

      {/* Grid Layout: 3 columns for medium and above screens */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Building Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-xl font-medium text-white/80">
            Building Name
          </label>
          <Input
            type="text"
            id="name"
            Style="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white/80 font-semibold"
            {...register("name", { required: "Building name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="text-xl font-medium text-white/80"
          >
            Location
          </label>
          <Input
            type="text"
            id="location"
            Style="w-full px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white/80 font-semibold"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* NOC Status */}
        <div className="flex flex-col">
          <label
            htmlFor="nocStatus"
            className="text-xl font-semibold text-white/80"
          >
            NOC Status
          </label>
          {isAdmin ? (
            <select
              id="nocStatus"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("nocStatus")}
            >
              <option value="Pending">Pending</option>
              <option value="Applied">Applied</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
          ) : (
            <p className="w-full px-3 py-2 text-gray-500 bg-gray-100 rounded-lg">
              You cannot edit the NOC status.
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <Button
            name="Add Building"
            type="submit"
            styles="w-full flex justify-center mt-6 bg-indigo-600 text-white w-full px-3 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
          />
        </div>
      </div>
    </form>
    <BuildingCard buildings={buildings}/>
    </>

  );
};

export default AddBuildingForm;
