import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { connect } from "@/DBConfig/DBConfig";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist." },
        { status: 400 }
      );
    }
    if (user.isBlocked) {
      console.log("Blocked user tried to log in:", username);
      return NextResponse.json(
        { error: "This account has been blocked." },
        { status: 403 }
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }
// Add reset password feature 
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Logged In successfully.",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  }
     catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}