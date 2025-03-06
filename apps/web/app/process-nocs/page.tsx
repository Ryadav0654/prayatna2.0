"use client";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import apiClient from "../../utils/apiclient";
import toast from "react-hot-toast";
import BuildingCard from "../../components/BuildingCard";
import { Building } from "../../components/BuildingCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ProcessForm from "../../components/ProcessForm";

type BuildingFormData = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  nocStatus: "Applied" | "Pending" | "Approved" | "Denied";
};

interface AddBuildingFormProps {
  onAddBuilding: (newBuilding: BuildingFormData) => void;
  isAdmin: boolean; // Pass isAdmin prop to control NOC status editability
}

const AddBuildingForm: React.FC<AddBuildingFormProps> = () => {
 
  const [nocs, setNocs] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

//   const onSubmit = async (data: BuildingFormData) => {
//     // Passing latitude and longitude to the onAddBuilding function
//     console.log(data);
    
//     try {
//       setError({ isError: false, message: "" });
//       setLoading(true);
//       const res = await apiClient.post(
//         "http://localhost:8080/building/create",
//         {
//           ...data,
//           latitude:latitude.toString(),
//           longitude:longitude.toString(),
//         }
//       );
//       if (res.status === 200) {
//         toast.success(res.data.message);
//         window.location.reload();
//       }
//       setLoading(false);
//       reset(); // Reset the form after submission
//     } catch (error: any) {
//       setLoading(false);
//       setError({ isError: true, message: error.response.data.message });
//       console.log("error occurred while adding building: ", error);
//     }
//   };

//   const fetchCurrentLocation = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setLongitude(longitude);
//         },
//         (error) => {
//           console.error("Error fetching current location: ", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     fetchCurrentLocation();
//   }, []);
  
//   useEffect(() => {
//     const getAllNocs = async () => {
//       try {
//         setError({ isError: false, message: "" });
//         setLoading(true);
//         const response = await apiClient.get("/allnocs");
//         if(response.status === 201){
//           console.log("all building res: ", response);
//           const data = response.data;
//           console.log(data);
//           setNocs(data);
//         }
//         setLoading(false);
//         // console.log(data);
//       } catch (error: any) {
//         setLoading(false);
//         setError({ isError: true, message: error.response.data.message });
//         console.error(error);
//     }
//   }
//   getAllNocs();
//   }, []);

  if(error.isError){
    <Error message={error.message} />;
  }

  if(loading){
    return <Loading text="Adding Building..." />;
  }
  return (
    <>
    <ProcessForm />
    {/* <BuildingCard buildings={nocs} isNoc={true}/> */}
    </>

  );
};

export default AddBuildingForm;
