"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ItemType = {
  _id: string;
  title: string;
  location: string;
  createdAt: string;
  is_lost: boolean;
  itemPicture?: string;
  responses?: {
  fromUser: string;
  message: string;
  date: string;
  }[];
};

const MyPosts = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", username: "" });
  const [items, setItems] = useState<ItemType[]>([]);

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/lostItems");
      const userData = res.data.data;
      setUser({ name: userData.name, username: userData.username });
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleDelete = async (id: string) => {
  try {
    await axios.delete("/api/myposts/delete", {
      data: { id }, 
    });
    toast.success("Post deleted successfully");
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to delete post");
  }
};


  const fetchUserItems = async () => {
    try {
      const res = await axios.get("/api/myposts/create");
      console.log("Fetched Items:", res.data.items);
      setItems(res.data.items);
      
    } catch {
      toast.error("Failed to load your posts");
    }
  };

  const logout = async () => {
    await axios.get("/api/logout");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  useEffect(() => {
    getUserDetails();
    fetchUserItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
          <button onClick={() => router.push("/profile")} className="hover:text-white text-gray-300 cursor-pointer">
            Home
          </button>
        </div>
        <div className="flex items-center space-x-6 text-gray-300">
          <span className="text-[#ffd700]">
            Welcome <span className="text-white">{user.username}, {user.name}</span>
          </span>
          <button onClick={logout} className="hover:text-white pr-[157px] cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      <main className="flex-grow px-[157px] py-10">
  <h1 className="text-3xl font-bold mb-8 text-gray-800">My Posted Items</h1>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {items.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between"
      >
        {item.itemPicture ? (
          <img
            src={item.itemPicture}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 italic">
            No Image
          </div>
        )}

        <div className="p-4 space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
          <p className="text-sm text-gray-600">Posted on: {new Date(item.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">{item.location}</p>
        </div>

        <div className="flex items-center justify-between px-4 pb-4 mt-2">
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-300 text-sm text-gray-700 rounded hover:bg-gray-400" disabled>
              Edit
            </button>
            <button 
            onClick={() => handleDelete(item._id)}
            className="px-3 py-1 bg-black text-sm text-white rounded hover:bg-gray-800">
              Delete
            </button>
          </div>
          <span
        className={`px-3 py-1 text-sm font-semibold rounded-full ${
          item.is_lost ? "bg-yellow-400 text-black" : "bg-green-500 text-white"
        }`}
        >
        {item.is_lost ? "Lost" : "Found"}
        </span>
        </div>

        {item.responses && item.responses.length > 0 && (
          <div className="px-4 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1 mt-2">Responses:</h4>
            <ul className="space-y-2 max-h-28 overflow-y-auto text-sm text-gray-700">
              {item.responses.map((res, idx) => (
                <li key={idx} className="bg-gray-100 rounded-md px-2 py-1">
                  <strong>{res.fromUser}:</strong> {res.message}
                  <div className="text-xs text-gray-400">{new Date(res.date).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
</main>


      <footer className="bg-[#003a6a] h-[68px] py-2 flex items-center justify-center mt-6">
        <p className="text-white text-sm text-center">Copyright 2025 © FoundIt</p>
      </footer>
    </div>
  );
};

export default MyPosts;
