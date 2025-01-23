import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    console.log("🚀 ~ GET ~ users:", users)
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in /api/users GET:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { email, rol, visit } = body;
        const newUser = new User({ email, rol, visit });
        await newUser.save();
        return NextResponse.json(newUser, { status: 201 });
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
      }
}