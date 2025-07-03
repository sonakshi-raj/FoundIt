import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/itemModel"; 
import User from "@/models/userModels";
import { connect } from "@/DBConfig/DBConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      data: user,
      status: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  try {
    const items = await Item.find({ is_lost: false }).sort({ createdDate: -1 });
    return NextResponse.json({ items, status: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}