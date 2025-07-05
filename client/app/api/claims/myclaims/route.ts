import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { connect } from "@/DBConfig/DBConfig";
import Claim from "@/models/claimModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const claims = await Claim.find({ fromUserId: userId });

    return NextResponse.json({ claims }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
