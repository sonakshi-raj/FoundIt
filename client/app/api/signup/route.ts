import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { connect } from "@/DBConfig/DBConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, username, email, password } = reqBody;
    console.log({ name, username, email, password });

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" }, 
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log({ savedUser });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}