// ✅ BACKEND ROUTE: app/api/reportForm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/DBConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Item from "@/models/itemModel";
import User from "@/models/userModels";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const itemData: any = {
      title: formData.get("title"),
      description: formData.get("description"),
      keywords: (formData.get("keywords") as string)?.split(",").map((k) => k.trim()).filter(Boolean),
      priority: formData.get("priority"),
      location: formData.get("location"),
      uniqueQuestion: formData.get("uniqueQuestion"),
      is_lost: formData.get("is_lost") === "true",
      createdBy_user_id: userId,
    };

    const file = formData.get("itemPicture") as File;
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Ensure the directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, file.name);
      await writeFile(uploadPath, buffer);
      itemData.itemPicture = `/uploads/${file.name}`;
    }

    const newItem = await Item.create(itemData);
    return NextResponse.json({ message: "Item reported successfully", item: newItem }, { status: 200 });
  } catch (error: any) {
    console.error("Report item error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
