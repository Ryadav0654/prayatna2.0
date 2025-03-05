"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import apiClient from '../../utils/apiclient';
import axios from 'axios';

type BuildingFormData = {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  nocStatus: 'Applied' | 'Pending' | 'Approved' | 'Denied';
};

interface AddBuildingFormProps {
  onAddBuilding: (newBuilding: BuildingFormData) => void;
  isAdmin: boolean; // Pass isAdmin prop to control NOC status editability
}

const AddBuildingForm: React.FC<AddBuildingFormProps> = ({ onAddBuilding, isAdmin }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<BuildingFormData>({
    defaultValues: {
      name: '',
      location: '',
      latitude: 0,
      longitude: 0,
      nocStatus: 'Pending', // Default to 'Pending'
    },
  });

  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const onSubmit = (data: BuildingFormData) => {
    onAddBuilding(data); // Add the new building
    reset(); // Reset the form after submission
  };

  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation);
    if (!useCurrentLocation) {
      // Clear manually entered location if switching to current location
      setValue('location', '');
      setValue('latitude', 0);
      setValue('longitude', 0);
    }
  };

  const getLocation = async (longitude: number, latitude: number) => {
      try {
        const location = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=91539d8ff79d4e808a96466a519760f5`);
        console.log("location", location);
        return location;
      } catch (error) {
        console.error("Error fetching location: ", error);
      };

  }
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocation(longitude, latitude);
          setValue('latitude', latitude);
          setValue('longitude', longitude);
        //   setValue('location', 'Current Location');
        },
        (error) => {
          console.error("Error fetching current location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // If "Use Current Location" is checked, fetch the current location
  React.useEffect(() => {
    if (useCurrentLocation) {
      fetchCurrentLocation();
    }
  }, [useCurrentLocation]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">Add New Building</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-lg text-gray-800">Building Name</label>
        <input
          type="text"
          id="name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          {...register('name', { required: 'Building name is required' })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-lg text-gray-800">Location</label>
        <input
          type="text"
          id="location"
          className="w-full p-3 border border-gray-300 rounded-lg"
          {...register('location', { required: 'Location is required' })}
          disabled={useCurrentLocation}
        />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="latitude" className="block text-lg text-gray-800">Latitude</label>
        <input
          type="number"
          id="latitude"
          className="w-full p-3 border border-gray-300 rounded-lg"
          {...register('latitude', { required: 'Latitude is required' })}
          disabled={useCurrentLocation}
        />
        {errors.latitude && <p className="text-red-500">{errors.latitude.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="longitude" className="block text-lg text-gray-800">Longitude</label>
        <input
          type="number"
          id="longitude"
          className="w-full p-3 border border-gray-300 rounded-lg"
          {...register('longitude', { required: 'Longitude is required' })}
          disabled={useCurrentLocation}
        />
        {errors.longitude && <p className="text-red-500">{errors.longitude.message}</p>}
      </div>

      {/* NOC Status Field (Editable only for Admin) */}
      {isAdmin && (
        <div className="mb-4">
          <label htmlFor="nocStatus" className="block text-lg text-gray-800">NOC Status</label>
          <select
            id="nocStatus"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register('nocStatus')}
          >
            <option value="Pending">Pending</option>
            <option value="Applied">Applied</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
        </div>
      )}

      {/* Display message for non-admin users indicating the status cannot be changed */}
      {!isAdmin && (
        <div className="mb-4">
          <label htmlFor="nocStatus" className="block text-lg text-gray-800">NOC Status</label>
          <p className="p-3 text-gray-500">You cannot edit the NOC status.</p>
        </div>
      )}

      {/* Toggle for Current Location */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="useCurrentLocation"
          className="mr-2"
          checked={useCurrentLocation}
          onChange={handleLocationToggle}
        />
        <label htmlFor="useCurrentLocation" className="text-lg text-gray-800">Use Current Location</label>
      </div>

      {/* Button to fetch location */}
      {useCurrentLocation && (
        <div className="mb-4">
          <button
            type="button"
            onClick={fetchCurrentLocation}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Use My Current Location
          </button>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Add Building
      </button>
    </form>
  );
};

export default AddBuildingForm;
