export default async function handler(req, res) {
  try {
    const backendRes = await fetch(
      `${process.env.DRDA_API_URL}/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.cookies.authToken || ""}`,
        },
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return res.status(backendRes.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}