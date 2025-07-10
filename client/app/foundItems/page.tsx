//to do make search bar work according to keyword and in lost also and make name changes 
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
type FoundItemType = {
  _id: string;
  title: string;
  location: string;
  createdAt: string;
  itemPicture?: string;
  createdBy_user_id: string;
  uniqueQuestion: string;
};
const FoundItem = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", username: "" });
    const [foundItems, setFoundItems] = useState<FoundItemType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [userClaims, setUserClaims] = useState<{ [key: string]: string }>({});
    const [reportReason, setReportReason] = useState("");
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [claimAnswer, setClaimAnswer] = useState("");
    const [claimQuestion, setClaimQuestion] = useState("");
    const [claimItemId, setClaimItemId] = useState<string | null>(null);
    const getUserDetails = async () => {
        try{
            const response = await axios.post("/api/foundItems");
            const userData = response.data.data;
            setUser({ name: userData.name, username: userData.username });
        } catch (error: any){
            toast.error(error.message);
        }
    };
    const fetchMyClaims = async () => {
  try {
    const res = await axios.get("/api/claims/myclaims");
    const claims = res.data.claims;

    const claimMap: { [key: string]: string } = {};
    claims.forEach((claim: any) => {
      claimMap[claim.itemId] = claim.status;
    });

    setUserClaims(claimMap);
  } catch (err) {
    toast.error("Failed to load your claims");
  }
};
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
  const handleReportSpam = async (itemId: string, toUserId: string) => {
  try {
    const res = await axios.post("/api/reportSpam", {
      itemId,
      toUserId,
      reportReason,
    });

    if (res.status === 200) {
      toast.success("Item reported as spam!");
      fetchItems();
    }
  } catch (err: any) {
    toast.error("Failed to report spam");
    console.error(err);
  }
};

const handleClaimSubmit = async () => {
    if (!claimItemId || !claimAnswer.trim()) {
      toast.error("Answer cannot be empty");
      return;
    }

    try {
      const res = await axios.post("/api/claims/create", {
        itemId: claimItemId,
        uniqueAnswer: claimAnswer.trim(),
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Claim submitted successfully!");
        setShowClaimModal(false);
        setClaimAnswer("");
        setClaimItemId(null);
        setClaimQuestion("");
        fetchMyClaims();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to submit claim");
    }
  };

  useEffect(() => {
    getUserDetails();
    fetchItems();
    fetchMyClaims();
  }, []);


const fetchItems = async () => {
    try {
      const res = await axios.get("/api/foundItems");
      setFoundItems(res.data.items);
    } catch (err) {
      toast.error("Failed to load found items");
    }
  };
    useEffect(() => {
  getUserDetails();
  fetchItems();
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
        Report Found Item
      </button>
    </div>
            {showClaimModal && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-lg font-bold mb-4 text-center text-blue-700">Claim This Item</h2>
              <p className="mb-2 font-medium text-gray-700">{claimQuestion}</p>
              <textarea
                value={claimAnswer}
                onChange={(e) => setClaimAnswer(e.target.value)}
                placeholder="Enter your answer here"
                className="w-full border border-gray-300 p-2 rounded-md mb-4 text-gray-600"
                rows={4}
              />
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  onClick={() => {
                    setShowClaimModal(false);
                    setClaimAnswer("");
                    setClaimItemId(null);
                    setClaimQuestion("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={handleClaimSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

    {showModal && (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
     <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
       <h2 className="text-lg font-bold mb-4 text-center text-red-600">Report Item as Spam</h2>
      
       <textarea
         value={reportReason}
         onChange={(e) => setReportReason(e.target.value)}
         placeholder="Write reason (e.g. fake item, inappropriate, etc)"
         className="w-full border border-gray-300 p-2 rounded-md mb-4 text-gray-500"
         rows={4}
       />

        <div className="flex justify-end gap-4">
          <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          onClick={() => {
            setShowModal(false);
            setReportReason("");
            }}
          >
          Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={() => {
              if (selectedItemId && selectedUserId) {
                handleReportSpam(selectedItemId, selectedUserId);
                setShowModal(false);
                setReportReason("");
              }
            }}
          >
            Submit
          </button>
        </div>
        </div>
      </div>
  )}

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

      <div className="flex items-center justify-between bg-[#003a6a] text-white px-4 py-2">
        <h3 className="text-lg font-semibold truncate">{item.title}</h3>
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md shadow-sm cursor-pointer"
          onClick={() => {
          setSelectedItemId(item._id);
          setSelectedUserId(item.createdBy_user_id);
          setShowModal(true);
        }}
          title="Report this item as spam"
        >
        SPAM?
          </button>

      </div>

      <div className="px-4 py-2 text-center">
        <p className="text-sm font-semibold text-gray-600">
          Location: {item.location}
        </p>
        <p className="text-sm text-gray-500">
          Date: {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>

              <div className="flex justify-center py-3">
  {userClaims[item._id] ? (
  <div className={`text-xs text-center ${
    userClaims[item._id] === "pending" ? "text-yellow-600" :
    userClaims[item._id] === "accepted" ? "text-green-600" :
    "text-red-600"
  }`}>
    Claim Status: <span className="font-semibold">{userClaims[item._id]}</span>
  </div>
) : (
  <button
    onClick={() => {
      setClaimItemId(item._id);
      setClaimQuestion(item.uniqueQuestion);
      setShowClaimModal(true);
    }}
    className="bg-[#003a6a] text-white px-6 py-1 rounded-full hover:bg-[#002a4d]"
  >
    Claim
  </button>
)}

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

    )
}
export default FoundItem;