"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", username: "" });
    const getUserDetails = async () => {
        try{
            const response = await axios.post("/api/profile");
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
        National Institute of Technology Jalandhar
      </h2>
    </div>
  </header>

  <div className="bg-[#1f1f1f] text-[#ffd700] h-[51px] flex items-center justify-between px-6 font-semibold text-base pl-[157px]">
    <div className="flex items-center space-x-6">
      <span className="text-[#ffd700] font-bold text-lg">| ERP - NITJ |</span>
      <div className="flex items-center space-x-4 text-gray-300 font-normal">
        <button
          onClick={OnProfile}
          className="flex items-center space-x-1 hover:text-white cursor-pointer"
        >
          <span>Home</span>
        </button>
      </div>
    </div>

    <div className="flex items-center space-x-6 text-gray-300 font-normal">
      <span className="text-[#ffd700]">
        Welcome <span className="text-white">{user.username}, {user.name}</span>
      </span>
      <button
        onClick={logout}
        className="flex items-center hover:text-white cursor-pointer space-x-1 pr-[157px]"
      >
        <span>Logout</span>
      </button>
    </div>
  </div>


  <main className="flex-grow px-4 pt-8 bg-[#f1f5f9]">
    <div className="flex flex-col items-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        <button className="bg-[#f3f3f3] hover:bg-[#003a6a] text-black font-bold py-10 px-10 rounded-3xl shadow text-2xl flex items-center space-x-3">
          <span>REPORT (LOST & FOUND)</span>
        </button>

        <button className="bg-[#f3f3f3] hover:bg-[#003a6a] text-black font-bold py-10 px-10 rounded-3xl shadow text-2xl flex items-center space-x-3">
          <span>LOST ITEMS</span>
        </button>

        <button className="bg-[#f3f3f3] hover:bg-[#003a6a] text-black font-bold py-10 px-10 rounded-3xl shadow text-2xl flex items-center space-x-3">
          <span>FOUND ITEMS</span>
        </button>

        <button className="bg-[#f3f3f3] hover:bg-[#003a6a] text-black font-bold py-10 px-10 rounded-3xl shadow text-2xl flex items-center space-x-3 md:col-span-2 lg:col-span-1">
          <span>My Posts</span>
        </button>

        <button className="bg-[#f3f3f3] hover:bg-[#003a6a] text-black font-bold py-10 px-10 rounded-3xl shadow text-2xl flex items-center space-x-3 md:col-span-2 lg:col-span-1">
          <span>CLAIMS</span>
        </button>
      </div>
    </div>
  </main>

  <footer className="bg-[#003a6a] h-[68px] py-2 flex items-center justify-center">
    <p className="text-white text-sm text-center">
      Copyright 2025 © NITJ Jalandhar
    </p>
  </footer>
</div>


  );
 };
export default Profile;