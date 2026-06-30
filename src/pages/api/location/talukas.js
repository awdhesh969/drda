// pages/api/talukas.js

export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Read the httpOnly cookie
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: Missing session token.",
      });
    }

    // Forward query parameters
    const queryString = new URLSearchParams(req.query).toString();

    const targetUrl = `${process.env.DRDA_API_URL}/talukas${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Failed to fetch talukas.",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}