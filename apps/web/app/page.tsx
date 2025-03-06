"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import BigCard from "../components/BigCard";
import { useRouter } from "next/navigation";
import apiClient from "../utils/apiclient";
import EmergencyAlertPopup from "../components/TriggeredPopup";
import Footer from "../components/Footer";
import KeyFeatures from "../components/KeyFeatures";
import Chatbot from "../components/Chatbot";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import ChatBoard from "../components/ChatBoard";
import FireSafetyFAQ from "../components/FAQ";
import NocAnalytics from "../components/NOCAnalytic";
export default function Home() {
  const router = useRouter();
  const [triggered, setTriggered] = useState(false);
  const [building, setBuilding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const triggerAlert = async () => {
    try {
      setError({ isError: false, message: "" });
      setLoading(true);
      const res = await apiClient.post("http://localhost:8080/alarm/trigger", {
        buildingId: "5013d178-62dd-4f02-aa0d-7c34d4228cd0",
      });
      console.log("res in trigger", res);
      // console.log("res in trigger", res);
      if (res.status === 201) {
        setTriggered(true);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError({ isError: true, message: error.response.data.message });
      console.error("error occured while trigger: ", error);
    }
  };
  const totalApplicants = 1523;
  const nocPassed = 875;
  const certificatesIssued = 850;

  if (loading) {
    return <Loading text="Your request is being processed..." />;
  }

  if (error.isError) {
    return <Error text={error.message} />;
  }
  return (
    <div className="w-full relative">
      <ChatBoard/>
      {/* <Chatbot /> */}
      {triggered && (
        <EmergencyAlertPopup
          isOpen={triggered}
          onClose={() => setTriggered(false)}
          type="alarm"
        />
      )}
      {building && (
        <EmergencyAlertPopup
          isOpen={building}
          onClose={() => setBuilding(false)}
          type="building"
        />
      )}
      <Navbar />
      <section className="flex h-[80vh] lg:h-[50vh] px-3 py-2">
        <div className="w-full h-full bg-transparent text-white flex flex-col justify-center items-center">
          <div className="text-5xl lg:text-6xl text-center font-extrabold w-full lg:w-[55%] leading-tight">
            SMART FIRE SAFETY, FASTER APPROVALS,{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
              SAFER CITIES
            </span>
          </div>

          <p className="w-full lg:w-[40%] text-xl mt-4 text-center leading-relaxed">
            An online system to apply for fire NOCs, track approvals in real
            time and ensure fire safety with smart automation.
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-center  lg:gap-x-12">
            <Button
              name="Add Building"
              onclick={() => router.push("/add-building")}
              styles="bg-red-600 text-white  py-3 px-4 rounded-xl font-bold mt-6"
            />
            <Button
              name="Trigger Emergency Alert"
              onclick={() => triggerAlert()}
              styles="bg-red-600 text-white py-3 px-4 rounded-xl font-bold mt-6"
            />
          </div>
        </div>
      </section>
      <KeyFeatures />
      <section className="flex lg:flex-row h-[70vh] lg:h-[60vh] justify-center items-center">
        <BigCard />
      </section>
      <NocAnalytics
            totalApplicants={totalApplicants}
            nocPassed={nocPassed}
            certificatesIssued={certificatesIssued}
        />
      <FireSafetyFAQ/>
      
      {/* <section>
        <div className="flex h-[50vh] w-full justify-center items-center gap-6">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section> */}
      <Footer />
      {/* <FireNOCForm /> */}
      {/* <footer className="mt-16">
        <div className="flex h-[30vh] bg-white/10 text-white w-full justify-around items-center gap-6">
          <div>
            <Link href="/" className="flex justify-center gap-2 items-center">
            <Logo/> <span className="text-xl lg:text-2xl font-extrabold">SmartFireNet</span>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ul className="font-semibold text-lg text-center">
              <p className="text-xl font-extrabold">Quick Links</p>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <ul className="font-semibold text-lg text-center">
              <p className="text-xl font-extrabold">Our Services</p>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Terms and Conditions</li>
             
            </ul>
          </div>
        
          </div>
      </footer> */}
      {/* <div>
        <h1 className="text-3xl text-red-600"> Home</h1>
      </div> */}
      {/* <div className="flex flex-col gap-4 bg-gray-600 w-full h-screen">
    </div> */}
    </div>
  );
}
