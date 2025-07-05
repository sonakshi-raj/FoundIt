import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Item from "@/models/itemModel";

connect();

export async function DELETE(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const { id } = await req.json(); // ✅ get `id` from request body

    const deletedItem = await Item.findOneAndDelete({
      _id: id,
      createdBy_user_id: userId,
    });

    if (!deletedItem) {
      return NextResponse.json({ message: "Item not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


