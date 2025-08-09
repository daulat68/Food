import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/api/restaurants", async (req, res) => {
    const { lat, lng } = req.query;

    // Validate query parameters
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // Construct Swiggy API URL with lat/lng
    const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    try {
        const response = await fetch(swiggyURL, {
            headers: {
                // Use real browser headers to reduce risk of being blocked
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
            },
        });

        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            const html = await response.text();
            console.error("Swiggy API returned non-JSON response:");
            console.error(html);
            return res.status(502).json({
                error: "Swiggy blocked the request or returned HTML.",
            });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching Swiggy data:", error);
        res.status(500).json({
            error: "Failed to fetch data from Swiggy.",
        });
    }
});

app.get("/api/restaurantData", async (req, res) => {
    const { lat, lng, restaurantId } = req.query;

    if (!lat || !lng || !restaurantId) {
        return res.status(400).json({ error: "Latitude, longitude, and restaurantId are required" });
    }

    const swiggyMenuURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

    try {
        const response = await fetch(swiggyMenuURL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
            },
        });

        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            const html = await response.text();
            console.error("Swiggy API returned non-JSON response:");
            console.error(html);
            return res.status(502).json({ error: "Swiggy blocked the request or returned HTML." });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching Swiggy menu data:", error);
        res.status(500).json({ error: "Failed to fetch menu data from Swiggy." });
    }
});
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
