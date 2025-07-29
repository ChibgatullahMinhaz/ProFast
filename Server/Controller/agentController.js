const { getDB } = require("../Config/db");

exports.applyGents = async (req, res) => {
    const data = req.body;

    try {
        const db = getDB();
        const agentData = {
            ...data,
            application_status: 'pending',
            create_At: new Date()
        }
        const applicationCollection = db.collection("agentApplication");
        const result = await applicationCollection.insertOne(agentData);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error applying agent:", error.message);
        res.status(500).json({
            error: "Something went wrong while applying. Please try again later.",
        });
    }
};



exports.getAgentByEmail = async (req, res) => {
  const email = req.query.email;
  const db = getDB();

  try {
    const collection = db.collection("agentApplication");
    const agent = await collection.findOne({ email: email });

    if (!agent) {
      return res.status(404).json({ message: "No application found" });
    }

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch", error });
  }
};
