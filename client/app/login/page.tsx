"use client"
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        password: "",
        username: "",
    });
    const [isValidData, setIsValidData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/login", user);
            console.log("Sign Up successful", response.data);
            router.push("/profile");
        } 
        catch (error: any) {
            console.log("Failed to login");
            toast.error(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
    setIsValidData(
        user.password.length > 0 &&
        user.username.length > 0
    );
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f1f5f9] px-4">
        <div className="w-full max-w-md p-8 space-y-5 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-2xl font-bold text-[#003a6a] text-center">
                    {loading ? "Processing..." : "Login"}
                </h1>
            </div>

        <div className="space-y-4">

            <div>
                <label className="text-sm font-semibold text-[#003a6a]">Username:</label>
                <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter Username"
                    className="w-full p-2 mt-1 border border-[#cbd5e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#347ab6] bg-[#f8fafc] text-black"
                />
            </div>
            <div>
                <label className="text-sm font-semibold text-[#003a6a]">Password:</label>
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={user.password}
                    onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter Password"
                    className="w-full p-2 mt-1 border border-[#cbd5e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#347ab6] bg-[#f8fafc] text-black"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-[#347ab6]"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
                </div>
            </div>
        </div>

        <button
            disabled={!isValidData}
            onClick={onLogin}
            className={`w-full p-2 text-white rounded-lg font-medium text-sm ${
            isValidData
            ? "bg-[#347ab6] hover:bg-[#003a6a]"
            : "bg-[#347ab6] opacity-50 cursor-not-allowed"
        } focus:outline-none`}
        >
        Log In
        </button>

        <div className="text-center">
        <Link href="/signup" className="text-sm text-[#347ab6] hover:underline font-medium">
            Visit Sign Up 
        </Link>
        </div>
    </div>
    <Toaster />
    {/* Add forget password feature */}
</div>

  );
};
export default Login;
