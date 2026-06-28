import cookies from "js-cookie";

const API_BASE = process.env.DRDA_API_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { action } = req.query; // e.g. /api/auth?action=login

  // ─── LOGIN ────────────────────────────────────────────────────────────────
 if (action === "login") {
  try {
    const { mobile, password } = req.body;

    // ─── INPUT VALIDATION (VAPT CRITICAL) ─────────────────────────────
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        status: false,
        message: "Invalid mobile number",
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Invalid password",
      });
    }

    // ─── BACKEND CALL ────────────────────────────────────────────────
    const apiRes = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, password }),
    });

    const data = await apiRes.json();

    // ─── COOKIE SECURITY (HARDENED) ───────────────────────────────────
    if (apiRes.ok && data.token) {
      const isProd = process.env.NODE_ENV === "production";

      const cookie = [
        `authToken=${encodeURIComponent(data.token)}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Lax",
        `Max-Age=${60 * 60 * 24}`,
        isProd ? "Secure" : "",
      ]
        .filter(Boolean)
        .join("; ");

      res.setHeader("Set-Cookie", cookie);
    }

    return res.status(apiRes.status).json({
      status: apiRes.ok,
      message: data.message || "Login processed",
      data,
    });

  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return res.status(502).json({
      status: false,
      message: "Authentication server unreachable",
    });
  }
}

  // ─── LOGOUT ───────────────────────────────────────────────────────────────
if (action === "logout") {
    try {
      let token = (req.headers["authorization"] || "").replace("Bearer ", "");
      if (!token && req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken;
      }
      console.log("[Server/API] 🚪 Calling real API: POST", `${API_BASE}/logout`);
      const apiRes = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear the authToken cookie
      const isProd = process.env.NODE_ENV === "production";
      res.setHeader(
        "Set-Cookie",
        `authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax${isProd ? "; Secure" : ""}`
      );

      // Treat any response (even errors) as a successful local logout
      const data = await apiRes.json().catch(() => ({}));
      return res.status(200).json({ status: true, ...data });
    } catch (err) {
      console.error("[proxy/logout] error:", err);
      // Clear cookie even if proxy API fetch fails
      const isProd = process.env.NODE_ENV === "production";
      res.setHeader(
        "Set-Cookie",
        `authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax${isProd ? "; Secure" : ""}`
      );
      // Even if the API call fails, we still allow local logout
      return res.status(200).json({ status: true, message: "Logged out locally." });
    }
  }

  return res.status(400).json({ message: "Unknown action" });
}
