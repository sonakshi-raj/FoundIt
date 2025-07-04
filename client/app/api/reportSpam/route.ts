import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { connect } from "@/DBConfig/DBConfig";
import Report from "@/models/reportModel";
import Item from "@/models/itemModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const body = await req.json();
    const { itemId, toUserId, reportReason, description, priority } = body;

    const item = await Item.findById(itemId);
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    item.is_spam = true;
    await item.save();

    const report = await Report.create({
      fromUserId: userId,
      toUserId,
      itemId,
      reportReason,
    });

    return NextResponse.json({ message: "Reported successfully", report });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
