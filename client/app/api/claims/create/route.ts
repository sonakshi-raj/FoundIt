import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import Claim from "@/models/claimModel";
import { getDataFromToken } from "@/helper/getDataFromToken";
import "@/models/userModels"; 


connect();

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req); 
    const { itemId, uniqueAnswer } = await req.json();

    if (!itemId || !uniqueAnswer) {
      return NextResponse.json(
        { error: "Missing itemId or answer." },
        { status: 400 }
      );
    }

    const newClaim = await Claim.create({
      itemId,
      fromUserId: userId,
      uniqueAnswer,
    });

    return NextResponse.json({ message: "Claim submitted", claim: newClaim }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
