import { Shipengine } from "@/helper/shipEngine";
import { Address, Package } from "@/type";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const {
      shipeToAddress,
      packages,
    }: { shipeToAddress: Address; packages: Package[] } = await req.json();

    // Validate required fields
    if (!shipeToAddress || !packages) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: shipeToAddress and packages",
        }),
        { status: 400 }
      );
    }

    // Define the "ship from" address (e.g., your warehouse or business address)
    const shipFromAddress: Address = {
      name: "Michael Smith",
      phone: "+1 555 987 6543",
      addressLine1: "456 Oak Avenue",
      addressLine2: "Suite 200",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no", // Indicates a commercial address
    };

    // Fetch shipping rates from ShipEngine
    const shipmentDetails = await Shipengine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipeToAddress,
        shipFrom: shipFromAddress,
        packages: packages,
      },
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER || "",
          process.env.SHIPENGINE_SECOND_COURIER || "",
          process.env.SHIPENGINE_THIRD_COURIER || "",
          process.env.SHIPENGINE_FOURTH_COURIER || "",
        ].filter(Boolean), // Remove empty strings
      },
    });

    // Log important details for debugging
    console.log("=== Debugging Details ===");
    console.log("Ship To Address:", JSON.stringify(shipeToAddress, null, 2));
    console.log("Packages:", JSON.stringify(packages, null, 2));
    console.log("Shipment Details:", JSON.stringify(shipmentDetails, null, 2));

    // Return successful response with shipment details
    return new Response(
      JSON.stringify({
        success: true,
        shipeToAddress,
        packages,
        shipmentDetails,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error:unknown) {
    console.error("Error fetching shipping rates:", error);

    // Provide detailed error messages if available
    const errorMessage =
      error|| error || "An unexpected error occurred";
     
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}