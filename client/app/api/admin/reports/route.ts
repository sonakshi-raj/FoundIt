import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import Item from "@/models/itemModel";
import Report from "@/models/reportModel";


connect();

export async function GET(req: NextRequest) {
  try {
    const reports = await Report.find({ resolved: false })
      .populate("fromUserId", "username email")
      .populate("toUserId", "username email")
      .populate("itemId");

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error: any) {
     console.error("Error in GET /api/admin/reports:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
