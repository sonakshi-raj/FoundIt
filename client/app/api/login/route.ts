import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { connect } from "@/DBConfig/DBConfig";

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

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }
// Add reset password feature 
    return NextResponse.json({
      message: "Logged In successfully.",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
     catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}