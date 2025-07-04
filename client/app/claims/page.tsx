"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

const Claims = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", username: "" });
    const getUserDetails = async () => {
        try{
            const response = await axios.post("/api/lostItems");
            const userData = response.data.data;
            setUser({ name: userData.name, username: userData.username });
        } catch (error: any){
            toast.error(error.message);
        }
    }
    const OnProfile = async () => {
    router.push("/profile");
  };
    const logout = async () => {
    await axios.get("/api/logout");
    toast.success("Logged out successfully");
    router.push("/login");
  };
    useEffect(() => {
  getUserDetails();
}, []);
return (
<div className="flex flex-col min-h-screen bg-[#e8ecf1]">
  <div className="h-1 w-full bg-[#ffd700]" />
  <header className="bg-[#003a6a] h-[132px] flex items-center">
    <div className="pl-[157px]">
      <h2 className="text-white font-semibold text-4xl leading-snug">
        FoundIt
      </h2>
    </div>
  </header>

  <div className="bg-[#1f1f1f] text-[#ffd700] h-[51px] flex items-center justify-between px-6 font-semibold text-base pl-[157px]">
    <div className="flex items-center space-x-6">
      <span className="text-[#ffd700] font-bold text-lg">| ERP |</span>
      <div className="flex items-center space-x-4 text-gray-300 font-normal">
        <button onClick={OnProfile} className="hover:text-white cursor-pointer">
          Home
        </button>
      </div>
    </div>
    <div className="flex items-center space-x-6 text-gray-300 font-normal">
      <span className="text-[#ffd700]">
        Welcome <span className="text-white">{user.username}, {user.name}</span>
      </span>
      <button onClick={logout} className="hover:text-white cursor-pointer pr-[157px]">
        Logout
      </button>
    </div>
  </div>

  <main className="flex-grow">
    
  </main>

  <footer className="bg-[#003a6a] h-[68px] py-2 flex items-center justify-center">
    <p className="text-white text-sm text-center">
      Copyright 2025 © FoundIt
    </p>
  </footer>
</div>

    )
}
export default Claims;