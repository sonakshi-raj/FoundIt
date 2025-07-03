"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ReportForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [user, setUser] = useState({ name: "", username: "", _id: "" });

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/lostItems");
      const userData = response.data.data;
      setUser({
        name: userData.name,
        username: userData.username,
        _id: userData._id,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const OnProfile = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const payload = new FormData();

      const isLostRaw = formData.get("is_lost");
      const is_lost = isLostRaw === "true";

      payload.append("is_lost", String(is_lost));
      payload.append("title", formData.get("title") as string);
      payload.append("description", formData.get("description") as string);
      payload.append("keywords", formData.get("keywords") as string);
      payload.append("priority", formData.get("priority") as string);
      payload.append("location", formData.get("location") as string);
      payload.append("uniqueQuestion", formData.get("uniqueQuestion") as string);
      payload.append("createdBy_user_id", user._id);

      const imageFile = formData.get("itemPicture") as File;
      if (imageFile && imageFile.name) {
        payload.append("itemPicture", imageFile);
      }

      const res = await axios.post("/api/reportForm", payload);
      if (res.status === 200) {
        toast.success("Item reported successfully!");
        formRef.current?.reset();
        router.push("/reportForm");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#e8ecf1]">
      <div className="h-1 w-full bg-[#ffd700]" />

      <header className="bg-[#003a6a] h-[132px] flex items-center">
        <div className="pl-[157px]">
          <h2 className="text-white font-semibold text-4xl leading-snug">FoundIt</h2>
        </div>
      </header>

      <div className="bg-[#1f1f1f] text-[#ffd700] h-[51px] flex items-center justify-between px-6 font-semibold text-base pl-[157px]">
        <div className="flex items-center space-x-6">
          <span className="text-[#ffd700] font-bold text-lg">| ERP |</span>
          <button onClick={OnProfile} className="hover:text-white cursor-pointer text-gray-300 font-normal">
            Home
          </button>
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

      <main className="flex-grow px-[157px] py-8 bg-[#e8ecf1]">
        <div className="max-w-4xl mx-auto bg-white border rounded shadow">
          <div className="bg-[#003a6a] text-white px-6 py-3 rounded-t">
            <h3 className="text-xl font-semibold">Report Lost or Found Item</h3>
          </div>

          <form ref={formRef} className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#003a6a]">
                  Title<span className="text-red-600">*</span>
                </label>
                <input type="text" name="title" required className="w-full p-2 border rounded text-gray-500" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003a6a]">
                  Location<span className="text-red-600">*</span>
                </label>
                <input type="text" name="location" required className="w-full p-2 border rounded text-gray-500" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#003a6a] mb-1">
                  Is the item lost or found? <span className="text-red-600">*</span>
                </label>
                <div className="flex space-x-6 text-[#003a6a] font-medium">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="is_lost" value="true" required />
                    <span>Lost</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="is_lost" value="false" />
                    <span>Found</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003a6a]">
                  Priority<span className="text-red-600">*</span>
                </label>
                <select name="priority" defaultValue="medium" className="w-full p-2 border rounded text-gray-500">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003a6a] mb-1">Item Picture (optional)</label>
                <div className="w-full border rounded p-2 bg-white text-gray-500">
                  <input
                    type="file"
                    name="itemPicture"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 
                      file:rounded file:border-0 
                      file:text-sm file:font-semibold 
                      file:bg-[#003a6a] file:text-white 
                      hover:file:bg-[#002a50]"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#003a6a]">
                  Unique Question<span className="text-red-600">*</span>
                </label>
                <input type="text" name="uniqueQuestion" required className="w-full p-2 border rounded text-gray-500" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#003a6a]">
                  Description<span className="text-red-600">*</span>
                </label>
                <textarea name="description" required rows={3} className="w-full p-2 border rounded text-gray-500" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#003a6a]">Keywords (comma-separated)</label>
                <input type="text" name="keywords" className="w-full p-2 border rounded text-gray-500" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-[#003a6a] h-[68px] py-2 flex items-center justify-center">
        <p className="text-white text-sm text-center">
          Copyright 2025 © FoundIt
        </p>
      </footer>
    </div>
  );
};

export default ReportForm;
