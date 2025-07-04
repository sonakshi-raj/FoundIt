import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import Item from "@/models/itemModel";
import Report from "@/models/reportModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const { itemId } = await req.json();

    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    item.is_spam = false;
    await item.save();
    await Report.updateMany({ itemId }, { resolved: true });

    return NextResponse.json({ message: "Item approved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

