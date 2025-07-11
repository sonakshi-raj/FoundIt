"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
type FoundItemType = {
  title: string;
  location: string;
  createdAt: string;
  itemPicture?: string;
};
const LostItem = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", username: "" });
    const [foundItems, setFoundItems] = useState<FoundItemType[]>([]);
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
  const OnReport = async () => {
    router.push("/reportForm");
  };
    const logout = async () => {
    await axios.get("/api/logout");
    toast.success("Logged out successfully");
    router.push("/login");
  };
    useEffect(() => {
  getUserDetails();
  
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/lostItems");
      setFoundItems(res.data.items);
    } catch (err) {
      toast.error("Failed to load found items");
    }
  };

  fetchItems();
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
    <div className="flex justify-between items-center w-full px-[157px] py-6">
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search by keyword"
          className="w-full max-w-2xl py-3 px-6 bg-gray-300 text-center placeholder-gray-700 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-[#003a6a] text-white px-4 py-2 rounded-r-full">
          🔍
        </button>
      </div>
      <button 
      onClick={OnReport}
      className="bg-[#003a6a] text-white px-6 py-2 rounded-lg font-semibold cursor-pointer">
        Report Lost Item
      </button>
    </div>

<div className="flex justify-center flex-wrap gap-8 px-[157px] pb-12">
  {foundItems.map((item, index) => (
    <div key={index} className="w-[250px] bg-white shadow-md rounded-md overflow-hidden">
      
      {item.itemPicture && (
        <img
          src={item.itemPicture}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="bg-[#003a6a] text-white text-center py-2 font-semibold text-lg relative">
        {item.title}
        <span className="absolute right-2 top-2 text-red-500 font-bold">!</span>
      </div>

      <div className="px-4 py-2 text-center">
        <p className="text-sm font-semibold text-gray-500">Location: {item.location}</p>
        <p className="text-sm text-gray-500">
          Date: {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-center py-2">
        <button className="bg-[#003a6a] text-white px-6 py-1 rounded-full hover:bg-[#002a4d]">
          Claim
        </button>
      </div>
    </div>
  ))}
</div>
  </main>

  <footer className="bg-[#003a6a] h-[68px] py-2 flex items-center justify-center">
    <p className="text-white text-sm text-center">
      Copyright 2025 © NITJ Jalandhar
    </p>
  </footer>
</div>

    )
}
export default LostItem;