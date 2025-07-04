"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ReportType = {
  _id: string;
  reportReason: string;
  itemId: {
    _id: string;
    title: string;
    location: string;
    itemPicture?: string;
    createdAt: string;
  };
  fromUserId: {
    username: string;
  };
  toUserId: {
    _id: string;
  };
};

const AdminPage = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const router = useRouter();

  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/admin/reports");
      console.log("Fetched reports: ", res.data.reports);
      setReports(res.data.reports);
    } catch (err) {
      toast.error("Failed to fetch reports");
    }
  };

  const handleApprove = async (itemId: string) => {
    try {
      await axios.post("/api/admin/approve", { itemId });
      toast.success("Item approved and restored");
      fetchReports();
    } catch {
      toast.error("Failed to approve item");
    }
  };

  const handleDelete = async (itemId: string, userId: string) => {
    try {
      await axios.post("/api/admin/delete", { itemId, userId });
      toast.success("Item deleted and user blocked");
      fetchReports();
    } catch {
      toast.error("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchReports();
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
            <button
              onClick={() => router.push("/profile")}
              className="hover:text-white cursor-pointer"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#003a6a]">
          Admin Dashboard – Reported Items
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
            >
              {report.itemId.itemPicture && (
                <img
                  src={report.itemId.itemPicture}
                  alt={report.itemId.title}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {report.itemId.title}
                </h3>
                <p className="text-gray-600">
                  Reported by: {report.fromUserId.username}
                </p>
                <p className="text-gray-500 text-sm">
                  Reason: {report.reportReason}
                </p>
                <p className="text-gray-500 text-sm">
                  Location: {report.itemId.location}
                </p>
                <p className="text-gray-500 text-sm">
                  Date:{" "}
                  {new Date(report.itemId.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-around pb-4 px-4 gap-2">
                <button
                  onClick={() => handleApprove(report.itemId._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleDelete(report.itemId._id, report.toUserId._id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Delete & Block
                </button>
              </div>
            </div>
          ))}
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

export default AdminPage;
