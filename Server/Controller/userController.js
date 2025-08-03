const { getDB } = require("../Config/db");
const { ObjectId } = require("mongodb");

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



exports.createParcels = async (req, res) => {
    try {
        const db = getDB()
        const parcelData = req.body;
        // Basic validation
        if (!parcelData.sender_name || !parcelData.receiver_name || !parcelData.tracking_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await db.collection("parcels").insertOne(parcelData);

        if (result.insertedId) {
            return res.status(201).json({
                insertedId: result.insertedId,
                message: "Parcel created successfully",
            });
        } else {
            return res.status(500).json({ message: "Parcel creation failed" });
        }
    } catch (error) {
        console.error("Error creating parcel:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Find parcels by sender email
exports.getParcelsByEmail = async (req, res) => {
    const db = getDB();

    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({ message: "Email query is required" });
        }

        const parcels = await db.collection("parcels").find({ sender_email: email }).toArray();

        if (parcels.length === 0) {
            return res.status(404).json({ message: "No parcels found for this email" });
        }

        res.status(200).json(parcels);
    } catch (error) {
        console.error("Error finding parcels by email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// DELETE: Remove a parcel by ID
exports.deleteParcel = async (req, res) => {
    try {
        const db = getDB()
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid parcel ID" });
        }

        const result = await db.collection("parcels").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Parcel not found" });
        }

        res.status(200).json({ message: "Parcel deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error deleting parcel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
