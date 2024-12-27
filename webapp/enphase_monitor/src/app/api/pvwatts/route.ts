import { NextRequest, NextResponse } from "next/server";
import { getPvWattsData } from "@/service/pvwatts";

export async function GET(request: NextRequest) {
    const date = new Date(request.nextUrl.searchParams.get("date") ?? new Date());
    const data = await getPvWattsData(date);
    return NextResponse.json(data);
}