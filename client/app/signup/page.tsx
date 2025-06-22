"use client"
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        rollNumber: "",
    });
    const [loading, setLoading] = useState(false);
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/signup", user);
            console.log("Sign Up successful", response.data);
            router.push("/login");
        } 
        catch (error: any) {
            console.log("Sign up failed");
            toast.error(error.message);
            setLoading(false);
        }
    };
}
