import Comms from "@/models/communities";
import connectDb from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  await connectDb();

  const searchParams = request.nextUrl.searchParams;
  const namePattern = searchParams.get("name");

  console.log(`Search pattern: ${namePattern}`);

  try {
    // Create a regular expression to match the name pattern
    const regex = new RegExp(namePattern, 'i'); // 'i' makes the search case-insensitive
    const query = { name: { $regex: regex } };

    // Fetch communities with matching names
    const comms = await Comms.find(query).limit(10); // Limit to 10 results
    console.log(`Found communities: ${comms.length}`);

    return NextResponse.json(comms, { status: 200 });
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json({ error: 'Error fetching communities' }, { status: 400 });
  }
}