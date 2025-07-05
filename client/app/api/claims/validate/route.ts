import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import Claim from "@/models/claimModel";
import Item from "@/models/itemModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const { claimId, isAccepted } = await req.json();

    if (!claimId || typeof isAccepted !== "boolean") {
      return NextResponse.json({ error: "Missing claimId or isAccepted" }, { status: 400 });
    }

    const claim = await Claim.findById(claimId);
    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const item = await Item.findById(claim.itemId);
    if (!item || item.createdBy_user_id.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized or item not found" }, { status: 403 });
    }

    claim.status = isAccepted ? "accepted" : "rejected";
    await claim.save();

    return NextResponse.json({ message: "Claim updated successfully", claim }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
