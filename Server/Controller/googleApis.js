const { default: axios } = require("axios");

exports.getDistance = async (req, res) => {
    const { origin, destination } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json`, {
            params: {
                origins: origin,
                destinations: destination,
                key: apiKey,
            },
        }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Google API error:", error.message);
        res.status(500).json({ error: "Failed to fetch distance" });
    }
};
