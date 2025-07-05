import { connect } from "@/DBConfig/DBConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/itemModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req); // Extract user ID from JWT
    const items = await Item.find({ createdBy_user_id: userId });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
