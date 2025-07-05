import { connect } from "@/DBConfig/DBConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/itemModel";
import Claim from "@/models/claimModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req); 
    const items = await Item.find({ createdBy_user_id: userId }).lean();

    const itemsWithClaims = await Promise.all(
      items.map(async (item) => {
        const claims = await Claim.find({ itemId: item._id }).populate("fromUserId", "username name");
        console.log("item:", item.title);
        console.log("claims:", claims);

        return { ...item, claims };
      })
    );

    return NextResponse.json({ items: itemsWithClaims }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/myposts/create:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
