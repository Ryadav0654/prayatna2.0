"use client";
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
// import FireNOCForm from "../components/FireNocForm";
import BigCard from "../components/BigCard";
import { useRouter } from "next/navigation";
// import 

export default function Home() {
  const router = useRouter();
  return (
    <div className=" w-full">
      <Navbar />
      <section className="flex h-[50vh]">
        <div className="w-full h-full bg-transparent text-white flex flex-col justify-center items-center">
          <div className="text-6xl text-center font-extrabold w-[55%] leading-tight">
            SMART FIRE SAFETY, FASTER APPROVALS{" "}
            <span className="text-red-600">SAFER CITIES</span>
          </div>
          <p className="w-[55%] text-xl mt-4 text-center">
            An online system to apply for fire NOCs, track approvals in real
            time and ensure fire safety with smart automation.
          </p>
          <Button
            name="Apply for NOC"
            onclick={() => router.push("/noc-form")}
            styles="bg-red-600 text-white py-2 px-4 rounded-2xl font-bold mt-6"
          />
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
        <div className="flex h-[30vh] bg-black/60 text-white w-full justify-around items-center gap-6">
          <div>Logo</div>
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
