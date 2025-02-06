import ShipEngine from "shipengine";

export const Shipengine = new ShipEngine({
    apiKey: process.env.SHIPENGINE_API_KEY as string,
  });

  