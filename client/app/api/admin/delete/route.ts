import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import Item from "@/models/itemModel";
import User from "@/models/userModels";
import Report from "@/models/reportModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const { itemId, userId } = await req.json();

    await Item.findByIdAndDelete(itemId);
    await User.findByIdAndUpdate(userId, { isBlocked: true });
    await Report.updateMany({ itemId }, { resolved: true });

    return NextResponse.json({ message: "Item deleted and user blocked" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
