import { Shipengine } from "@/helper/shipEngine";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse request
    const { rateId } = await req.json();
    console.log("🛠️ Received rateId:", rateId);

    if (!rateId) {
      return NextResponse.json({ error: "rateId is required" }, { status: 400 });
    }

    // Call ShipEngine API
    const label = await Shipengine.createLabelFromRate({ rateId });

    console.log("✅ ShipEngine Label Response:", JSON.stringify(label, null, 2));

    // Extra debugging: Check if multiple packages exist
    if (label.packages?.length > 1) {
      console.warn("⚠️ Multiple packages detected! Check trackingNumber consistency.");
    }

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    console.error("❌ Error creating label:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the label" },
      { status: 500 }
    );
  }
}