import { NextApiRequest, NextApiResponse } from "next";

interface TamaraOrderResponse {
  url: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TamaraOrderResponse | ErrorResponse>
) {
  try {
    const backendResponse = await fetch(
      "http://localhost:3000/tamara/create-order", // Changed to 3001 based on your previous message
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    if (!backendResponse.ok) {
      throw new Error(
        `Backend responded with status ${backendResponse.status}`
      );
    }

    const data = (await backendResponse.json()) as TamaraOrderResponse;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to create Tamara order",
    });
  }
}
