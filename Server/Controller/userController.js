const { getDB } = require("../Config/db");

exports.createUser = async (req, res) => {
    const db = getDB();
    const usersCollection = db.collection("users");

    try {
        const { name, email, image, phone } = req.body;


        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        // ✅ Check for existing user
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // ✅ Insert new user
        const result = await usersCollection.insertOne({
            name,
            email,
            photoURL: image || null,
            phone: phone || null,
            role: "user",
            createdAt: new Date(),
        });

        res.status(201).json(result);
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getUserRole = async (req, res) => {
    const { email } = req.query;

    try {
        const db = getDB()
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user role", error });
    }
};