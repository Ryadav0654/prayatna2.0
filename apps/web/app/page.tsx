"use client";
import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
// import FireNOCForm from "../components/FireNocForm";
import BigCard from "../components/BigCard";
import { useRouter } from "next/navigation";
import apiClient from "../utils/apiclient";
import EmergencyAlertPopup from "../components/TriggeredPopup";
import TypeAnimationComp from "../components/TypeAnimationComp";
import Logo from "../components/icons/Logo";
import Link from "next/link";
// import 

export default function Home() {
  const router = useRouter();
  const [triggered, setTriggered] = useState(false);
  const [building, setBuilding] = useState(false);
  const triggerAlert = async () => {
    try {
      
      const res = await apiClient.post("http://localhost:8080/alarm/trigger", {
        buildingId: "5013d178-62dd-4f02-aa0d-7c34d4228cd0"});
      console.log("res in trigger", res);
      // console.log("res in trigger", res);
      if(res.status === 201){
        setTriggered(true);
      }
    } catch (error) {
      console.error("error occured while trigger: ", error);
    }
  }

  const getCurrentLocation = async () => {
    try {
      console.log("getCurrentLocation");
  
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        console.log(position);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
  
        return position; // Now this returns the position asynchronously
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error occurred while getting current location: ", error);
    }
  };
  
  const createBuilding = async () => {
    try {
      const location = await getCurrentLocation();
      const longitude = (location?.coords.longitude)?.toString();
      const latitude = (location?.coords.latitude)?.toString();
      console.log("location in trigger", location);
      const res = await apiClient.post("http://localhost:8080/building/create", {
        address: "indore",
        latitude: latitude,
        longitude: longitude
      });
      console.log("res in createBuilding");
      console.log("res in createBuilding", res);
      if(res.status === 201){
        setBuilding(true);
      }
    } catch (error) {
      console.error("error occured while add building: ", error);
    }
  }
  return (

    <div className=" w-full">
      {triggered && <EmergencyAlertPopup isOpen={triggered} onClose={() => setTriggered(false)} type="alarm" />}
      {building && <EmergencyAlertPopup isOpen={building} onClose={() => setBuilding(false)} type="building" />}
      <Navbar />
      <section className="flex h-[50vh]">
        <div className="w-full h-full bg-transparent text-white flex flex-col justify-center items-center">
          <div className="text-6xl text-center font-extrabold w-[55%] leading-tight">
            SMART FIRE SAFETY, FASTER APPROVALS,{" "}
            <span className="text-red-600">SAFER CITIES</span>
          </div>
          {/* <TypeAnimationComp /> */}
          <p className="w-[40%] text-xl mt-4 text-center">
            An online system to apply for fire NOCs, track approvals in real
            time and ensure fire safety with smart automation.
          </p>
          <div className="flex justify-center items-center gap-x-12">
          <Button
            name="Apply for NOC"
            onclick={() => router.push("/noc-form")}
            styles="bg-red-600 text-white py-2 px-4 rounded-2xl font-bold mt-6"
          />
          <Button
            name="Trigger Emergency Alert"
            onclick={() => createBuilding()}
            styles="bg-red-600 text-white py-2 px-4 rounded-2xl font-bold mt-6"
          />
          </div>
        </div>
        {/* <div className="w-1/2 bg-red-600">  */}

        {/* </div> */}
      </section>
      <section className="flex h-[60vh] justify-center items-center">
        <BigCard />
      </section>
      <section>
        <div className="flex h-[50vh] w-full justify-center items-center gap-6">
         <Card />
         <Card />
         <Card />
         <Card />
         </div>
      </section>
      {/* <FireNOCForm /> */}
      <footer className="mt-16">
        <div className="flex h-[30vh] bg-white/10 text-white w-full justify-around items-center gap-6">
          <div>
            <Link href="/" className="flex justify-center gap-2 items-center">
            <Logo/> <span className="text-xl lg:text-2xl font-extrabold">SmartFireNet</span>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ul className="font-semibold text-lg">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ul className="font-semibold text-lg">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ul className="font-semibold text-lg">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          </div>
      </footer>
      {/* <div>
        <h1 className="text-3xl text-red-600"> Home</h1>
      </div> */}
      {/* <div className="flex flex-col gap-4 bg-gray-600 w-full h-screen">
    </div> */}
    </div>
  );
}
